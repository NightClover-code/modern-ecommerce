import { v2 as cloudinary } from 'cloudinary';
import Replicate from 'replicate';
import { faker } from '@faker-js/faker';
import OpenAI from 'openai';
import { ProductGenerationService } from '@/ai/services/product-generation.service';
import { CloudinaryService } from '@/cloudinary/services/cloudinary.service';
import { ImageGenerationService } from '@/ai/services/image-generation.service';
import { AiConfigService } from '@/ai/services/ai-config.service';
import { ConfigService } from '@nestjs/config';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || '',
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BRANDS = ['Apple', 'Samsung', 'Sony', 'LG', 'Cannon', 'Nikon'];
const CATEGORIES = [
  'Electronics',
  'Computers',
  'Smart Home',
  'Phones',
  'Cameras',
  'Gaming',
];

const PRODUCT_TYPES = {
  Cameras: ['DSLR Camera', 'Mirrorless Camera', 'Digital Camera'],
  Phones: ['Smartphone', 'Mobile Phone', 'Foldable Phone'],
  Gaming: ['Console', 'Controller', 'Gaming Laptop'],
  Computers: ['Laptop', 'Desktop', 'Tablet'],
  'Smart Home': ['Smart Speaker', 'Smart Display', 'Security Camera'],
  Electronics: ['Headphones', 'Earbuds', 'Smartwatch'],
};

async function generateProductImages(
  name: string,
  category: string,
  brand: string,
) {
  const prompt = `Professional product photography of a ${brand} ${name}, ${category} device, 
    on pure white background, studio lighting, high resolution, commercial product photography, 8k`;

  const output = (await replicate.run('black-forest-labs/flux-schnell', {
    input: {
      prompt,
      negative_prompt: 'text, watermark, low quality, blurry, distorted',
      width: 1024,
      height: 1024,
      num_inference_steps: 4,
      num_outputs: 4,
    },
  })) as string[];

  // const images = await Promise.all(
  //   output.map(async (imageUrl, index) => {
  //     const imageResponse = await fetch(imageUrl);
  //     const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

  //     return cloudinary.uploader.upload(
  //       `data:image/jpeg;base64,${imageBuffer.toString('base64')}`,
  //       {
  //         folder: 'products',
  //         public_id: `product-${Date.now()}-view-${index + 1}`,
  //       },
  //     );
  //   }),
  // );

  return images.map(img => img.secure_url);
}

async function generateProductDetails(category: string, brand: string) {
  // const prompt = `Generate a realistic product for an electronics store.
  //   Category: ${category}
  //   Brand: ${brand}

  //   Return as JSON with these fields:
  //   - name (realistic product name)
  //   - description (compelling product description)
  //   - price (realistic market price)
  //   - features (array of key features)`;

  // const completion = await openai.chat.completions.create({
  //   messages: [{ role: 'user', content: prompt }],
  //   model: 'gpt-3.5-turbo',
  //   response_format: { type: 'json_object' },
  // });

  // const product = JSON.parse(completion.choices[0].message.content);

  const sampleProduct = {
    name: 'LG OLED C2 4K TV',
    description:
      'The LG OLED C2 4K TV is a high-end television with a 4K resolution and OLED technology. It features a sleek design and advanced picture quality.',
    price: 100,
    features: ['4K resolution', 'OLED technology', 'Smart TV features'],
  };

  // Generate AI image based on the generated details
  const images = await generateProductImages(
    sampleProduct.name,
    category,
    brand,
  );

  return {
    ...sampleProduct,
    images,
    brand,
    category,
    countInStock: Math.floor(Math.random() * 50),
    rating: 0,
    numReviews: 0,
    reviews: [],
  };
}

export async function generateProducts(count: number) {
  const products = [];

  for (let i = 0; i < count; i++) {
    const name = faker.commerce.productName();
    const brand = faker.helpers.arrayElement(BRANDS);
    const category = faker.helpers.arrayElement(CATEGORIES);
    const product = await generateProductDetails(category, brand);

    products.push(product);
  }

  return products;
}
