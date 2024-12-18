import { Product } from '.';
import { Message } from 'ai';

export interface ChatRequest {
  id: string;
  messages: Array<Message>;
}

export type ProductCreationStep =
  | 'basic-info' // Brand & Category
  | 'details' // Name, Price, Description
  // | 'features' // Technical specs & features
  | 'images' // Product images
  | 'review'; // Final review

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
    currentStep: ProductCreationStep;
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
  canProgress?: boolean; // Indicates if we can move to next step
}
