// ai.module.ts
import { Module } from '@nestjs/common';
import { OpenRouterController } from './ai.controller';
import { OpenRouterService } from './ai.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [OpenRouterController],
  providers: [OpenRouterService],
})
export class OpenRouterModule {}
