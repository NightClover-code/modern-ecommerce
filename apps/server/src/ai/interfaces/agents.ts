import { Product } from '@/products/schemas/product.schema';

export interface ValidationError {
  field: string;
  message: string;
  suggestion?: string;
}

export interface AgentMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
}

export interface AgentState {
  messages: AgentMessage[];
  productDraft?: Partial<Product>;
  status: 'idle' | 'thinking' | 'validating' | 'clarifying' | 'complete';
  context: {
    currentStep: 'brand' | 'name' | 'price' | 'features' | 'review';
    validationErrors?: ValidationError[];
  };
}

export interface AgentAction {
  type:
    | 'ASK_CLARIFICATION'
    | 'PROVIDE_SUGGESTIONS'
    | 'UPDATE_PRODUCT'
    | 'COMPLETE';
  message: string;
  payload: any;
  validationErrors?: ValidationError[];
  choices?: string[];
  productUpdate?: Partial<Product>;
}
