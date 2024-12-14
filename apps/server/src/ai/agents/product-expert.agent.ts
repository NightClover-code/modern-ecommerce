import { Injectable } from '@nestjs/common';
import { BaseAgent } from './base.agent';
import { AgentAction, AgentState, ValidationError } from '../interfaces/agents';
import { Product } from '@/products/schemas/product.schema';

@Injectable()
export class ProductExpertAgent extends BaseAgent {
  name = 'product_expert';
  systemPrompt = `You are a product expert helping create product listings through conversation.
  Analyze user input for inconsistencies and missing information.
  When you find issues:
  1. Point out conflicts (e.g. brand mismatches)
  2. Ask for clarification
  3. Provide specific options when possible
  
  Always return JSON with these fields:
  - message: string (your response to the user)
  - type: "ASK_CLARIFICATION" | "PROVIDE_SUGGESTIONS" | "UPDATE_PRODUCT" | "COMPLETE"
  - validationErrors?: array of {field, message, suggestion}
  - choices?: array of strings (when providing options)
  - productUpdate?: object with any valid product fields`;

  async execute(state: AgentState): Promise<AgentAction> {
    if (state.productDraft) {
      const errors = this.validateProduct(state.productDraft);
      if (errors.length > 0) {
        return {
          type: 'ASK_CLARIFICATION',
          message: 'There are some issues with the product details.',
          payload: {
            validationErrors: errors,
            currentStep: state.context.currentStep,
          },
        };
      }
    }

    const action = await this.think(state.messages);

    switch (action.type) {
      case 'ASK_CLARIFICATION':
        return {
          type: 'ASK_CLARIFICATION',
          message: action.message,
          payload: {
            validationErrors: action.validationErrors,
            currentStep: state.context.currentStep,
          },
        };

      case 'PROVIDE_SUGGESTIONS':
        return {
          type: 'PROVIDE_SUGGESTIONS',
          message: action.message,
          choices: action.choices,
          payload: {
            currentStep: state.context.currentStep,
          },
        };

      case 'UPDATE_PRODUCT':
        const updatedProduct = {
          ...state.productDraft,
          ...action.productUpdate,
        };

        return {
          type: 'UPDATE_PRODUCT',
          message: action.message,
          payload: updatedProduct,
        };

      case 'COMPLETE':
        return {
          type: 'COMPLETE',
          message: 'Product details are complete and valid.',
          payload: state.productDraft,
        };
    }
  }

  private validateProduct(product: Partial<Product>): ValidationError[] {
    const errors: ValidationError[] = [];

    if (
      product.brand &&
      !['Apple', 'Samsung', 'Sony', 'LG', 'Canon', 'Nikon'].includes(
        product.brand,
      )
    ) {
      errors.push({
        field: 'brand',
        message: 'Invalid brand selected',
        suggestion:
          'Please choose from: Apple, Samsung, Sony, LG, Canon, Nikon',
      });
    }

    if (
      product.category &&
      ![
        'Electronics',
        'Computers',
        'Smart Home',
        'Phones',
        'Cameras',
        'Gaming',
      ].includes(product.category)
    ) {
      errors.push({
        field: 'category',
        message: 'Invalid category selected',
        suggestion:
          'Please choose from: Electronics, Computers, Smart Home, Phones, Cameras, Gaming',
      });
    }

    if (product.price) {
      if (product.price < 0) {
        errors.push({
          field: 'price',
          message: 'Price cannot be negative',
          suggestion: 'Please provide a positive price',
        });
      }

      if (product.brand === 'Apple' && product.price < 299) {
        errors.push({
          field: 'price',
          message: 'Price too low for Apple product',
          suggestion: 'Apple products typically start at $299',
        });
      }
    }

    if (product.name && product.name.length < 3) {
      errors.push({
        field: 'name',
        message: 'Product name too short',
        suggestion: 'Please provide a more descriptive name',
      });
    }

    return errors;
  }
}
