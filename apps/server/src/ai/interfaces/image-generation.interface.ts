export type SupportedImageModel =
  | 'black-forest-labs/flux-schnell'
  | 'stability-ai/stable-diffusion-img2img'
  | 'stability-ai/sdxl'
  | 'stability-ai/stable-diffusion-img2img:15a3689ee13b0d2616e98820eca31d4c3abcd36672df6afce5cb6feb1d66087d';

export interface ImageGenerationOptions {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  steps?: number;
  numOutputs?: number;
  model?: SupportedImageModel;
  imageStrength?: number;
  sourceImage?: string;
  seed?: number;
}

export interface ImageGenerationResponse {
  urls: string[];
  metadata?: {
    model: SupportedImageModel;
    prompt: string;
    generationTime?: number;
  };
}
