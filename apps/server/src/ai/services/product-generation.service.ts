import { Injectable } from '@nestjs/common';
import { ImageGenerationService } from './image-generation.service';
import { TextGenerationService } from './text-generation.service';

@Injectable()
export class ProductGenerationService {
  constructor(
    private imageGeneration: ImageGenerationService,
    private textGeneration: TextGenerationService,
  ) {}

  async generateProduct(userPrompt: string) {
    const productInfo =
      await this.textGeneration.generateProductInfo(userPrompt);

    console.log('Successfully generated product info', {
      productInfo,
      userPrompt,
    });

    const imagePrompt = `Professional product photography of a ${productInfo.brand} ${productInfo.name}, ${productInfo.category}, 
      sleek modern design, premium build quality, minimalist aesthetic, 
      on light gray background (#F0F0F0), studio lighting setup, high-end commercial photography, 
      8k resolution, photorealistic, ultra detailed, product catalog style`;

    const [images, brandLogo] = await Promise.all([
      this.generateProductViews(imagePrompt),
      this.generateBrandLogo(productInfo.brand),
    ]);

    return {
      ...productInfo,
      images,
      brandLogo,
      rating: 0,
      numReviews: 0,
      reviews: [],
    };
  }

  async generateProductViews(prompt: string) {
    const seed = Math.floor(Math.random() * 1000000);

    const angles = [
      {
        name: 'front',
        prompt: `${prompt}, straight front view, minimalist composition, floating in space, background color: #F0F0F0, soft shadow beneath`,
      },
      {
        name: 'side',
        prompt: `${prompt}, perfect side profile view, minimalist composition, floating in space, background color: #F0F0F0, soft shadow beneath`,
      },
      {
        name: 'rear',
        prompt: `${prompt}, straight back view, minimalist composition, floating in space, background color: #F0F0F0, soft shadow beneath`,
      },
      {
        name: 'detail',
        prompt: `${prompt}, 45-degree angle view showing details, minimalist composition, floating in space, background color: #F0F0F0, soft shadow beneath`,
      },
    ];

    const allViews = await Promise.all(
      angles.map(angle =>
        this.imageGeneration.generateProductImage({
          prompt: angle.prompt,
          negativePrompt:
            'text, watermark, low quality, blurry, distorted, hands, people, accessories, busy background, pure white background',
          width: 1024,
          height: 1024,
          steps: 4,
          numOutputs: 1,
          seed: seed,
        }),
      ),
    );

    return allViews.flatMap(view => view.urls);
  }

  async generateBrandLogo(brand: string) {
    const prompt = `Minimalist modern logo for ${brand} brand, 
      tech company style, pure white logo on pure black background,
      icon only without any text, vector style, simple geometric shapes,
      centered composition, professional corporate identity`;

    const logoResponse = await this.imageGeneration.generateProductImage({
      prompt,
      negativePrompt:
        'text, letters, words, watermark, low quality, blurry, distorted, complex design, busy background, color, gradients',
      width: 256,
      height: 256,
      steps: 4,
      numOutputs: 1,
    });

    return logoResponse.urls[0];
  }
}
