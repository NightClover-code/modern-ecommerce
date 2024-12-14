import { Injectable } from '@nestjs/common';
import { AiConfigService } from '../services/ai-config.service';
import { AgentMessage, AgentState, AgentAction } from '../interfaces/agents';

@Injectable()
export abstract class BaseAgent {
  constructor(protected aiConfig: AiConfigService) {}

  abstract name: string;
  abstract systemPrompt: string;

  protected async think(messages: AgentMessage[]): Promise<AgentAction> {
    const openai = this.aiConfig.getOpenAI();

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: this.systemPrompt }, ...messages],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(completion.choices[0].message.content || '{}');
  }

  abstract execute(state: AgentState): Promise<AgentAction>;
}
