# ================ BASE ================
FROM node:18-alpine AS base
WORKDIR /app

# Copia APENAS os arquivos de dependência primeiro (para melhor cache)
COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/
COPY apps/backend/package*.json ./apps/backend/

# ================ DEPENDÊNCIAS ================
FROM base AS dependencies
# Instala dependências do frontend
WORKDIR /app/apps/frontend
RUN npm install
# Instala dependências do backend
WORKDIR /app/apps/backend
RUN npm install

# ================ BACKEND BUILD ================
FROM dependencies AS backend-builder
# Copia TUDO do backend incluindo configurações
COPY apps/backend /app/apps/backend
# Garante que todos os arquivos de configuração sejam copiados
COPY apps/backend/tsconfig*.json /app/apps/backend/
COPY apps/backend/nest-cli.json /app/apps/backend/
WORKDIR /app/apps/backend
RUN npm run build

# ================ FRONTEND BUILD ================
FROM dependencies AS frontend-builder
COPY apps/frontend /app/apps/frontend
WORKDIR /app/apps/frontend
RUN npm run build

# ================ PRODUÇÃO ================
# Backend
FROM node:18-alpine AS backend
WORKDIR /app
COPY --from=backend-builder /app/apps/backend .
EXPOSE 3001
CMD ["npm", "run", "start:prod"]

# Frontend
FROM node:18-alpine AS frontend
WORKDIR /app
COPY --from=frontend-builder /app/apps/frontend .
EXPOSE 3000
CMD ["npm", "start"]