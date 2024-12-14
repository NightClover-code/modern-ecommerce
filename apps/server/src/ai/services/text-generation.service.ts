import { Injectable } from '@nestjs/common';
import { AiConfigService } from './ai-config.service';

@Injectable()
export class TextGenerationService {
  constructor(private aiConfig: AiConfigService) {}

  async generateProductInfo(userPrompt: string) {
    const openai = this.aiConfig.getOpenAI();

    const prompt = `Generate a realistic product based on this prompt: "${userPrompt}"
    
    Return as JSON with these fields:
    - name (realistic product name)
    - brand (choose from: Apple, Samsung, Sony, LG, Canon, Nikon)
    - category (choose from: Electronics, Computers, Smart Home, Phones, Cameras, Gaming)
    - price (realistic market price)
    - description (compelling product description)
    - countInStock (random number between 5-50)`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      response_format: { type: 'json_object' },
    });

    console.log('Successfully generated product info', {
      prompt,
      completion: completion.choices[0].message.content,
    });

    return JSON.parse(completion.choices[0].message.content || '');
  }
}
