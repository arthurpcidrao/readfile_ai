import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return { 
      status: 'online',
      message: 'Readfile AI API',
      timestamp: new Date().toISOString()
    };
  }
}