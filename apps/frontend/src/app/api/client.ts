// apps/frontend/src/app/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});