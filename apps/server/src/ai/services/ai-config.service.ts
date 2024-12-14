import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Replicate from 'replicate';
import OpenAI from 'openai';

@Injectable()
export class AiConfigService {
  private replicate: Replicate;
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.replicate = new Replicate({
      auth: this.configService.get('REPLICATE_API_TOKEN'),
    });

    this.openai = new OpenAI({
      apiKey: this.configService.get('OPENAI_API_KEY'),
    });
  }

  getReplicate() {
    return this.replicate;
  }

  getOpenAI() {
    return this.openai;
  }
}
