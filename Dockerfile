# ================ BASE ================
FROM node:18-alpine AS base
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/
COPY apps/backend/package*.json ./apps/backend/

# ================ DEPENDÊNCIAS ================
FROM base AS dependencies

# Instala dependências do frontend e backend
RUN npm install --workspace=apps/frontend
RUN npm install --workspace=apps/backend

# ================ FRONTEND BUILD ================
FROM dependencies AS frontend-builder
COPY apps/frontend ./apps/frontend
WORKDIR /app/apps/frontend
RUN npm run build

# ================ BACKEND BUILD ================
FROM dependencies AS backend-builder
COPY apps/backend ./apps/backend
WORKDIR /app/apps/backend
RUN npm run build

# ================ PRODUÇÃO ================
# Frontend
FROM base AS frontend
COPY --from=frontend-builder /app/apps/frontend ./
EXPOSE 3000
CMD ["npm", "run", "start"]

# Backend
FROM base AS backend
COPY --from=backend-builder /app/apps/backend ./
EXPOSE 3001
CMD ["npm", "run", "start:prod"]