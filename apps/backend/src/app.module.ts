// app.module.ts
import { Module } from '@nestjs/common';
import { OpenRouterModule } from './ai/ai.module';  // Já está correto
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';  // Adicionando o controlador
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), OpenRouterModule],  // Módulos já estão corretos
  controllers: [AppController],  // Incluindo o AppController
  providers: [AppService],  // Providers corretos
})
export class AppModule {}
