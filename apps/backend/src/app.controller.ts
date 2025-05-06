// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { appendFile } from 'fs';

@Controller()  // Isso vai para a rota raiz '/'
export class AppController {
  [x: string]: any;
  constructor(private readonly appService: AppService) {}

  @Get()  // Aqui é a rota GET para '/'
  getStatus() {
    return this.appService.getStatus();
  }
}
