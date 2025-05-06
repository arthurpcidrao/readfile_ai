// ai.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenRouterService {
  private readonly apiUrl = 'https://openrouter.ai/api/v1/chat/completions'; // Altere o endpoint conforme necessário
  private readonly apiKey;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_KEY');
  }

  async getResponseFromAPI(prompt: string): Promise<any> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          prompt: prompt,
          model: 'gpt-3.5-turbo',  // ou qualquer outro modelo, conforme sua necessidade
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching data from OpenRouter:', error);
      throw new Error('Failed to fetch data from OpenRouter');
    }
  }
}
