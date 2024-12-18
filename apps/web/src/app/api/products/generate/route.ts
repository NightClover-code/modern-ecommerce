import { TextGeneration } from '@/modules/ai/services/text-generation';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const product = await TextGeneration.generateProductInfo(prompt);

    return Response.json({ success: true, product });
  } catch (error) {
    console.error('Product generation error:', error);
    return Response.json(
      { success: false, error: 'Failed to generate product' },
      { status: 500 },
    );
  }
}
