// ai.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { OpenRouterService } from './ai.service';

@Controller('open-router')
export class OpenRouterController {
  constructor(private readonly openRouterService: OpenRouterService) {}

  @Post('get-response')
  async getResponse(@Body() body: { prompt: string }) {
    const { prompt } = body;
    const result = await this.openRouterService.getResponseFromAPI(prompt);
    return result;
  }
}
