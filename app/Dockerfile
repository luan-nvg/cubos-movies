# Configurando dependências do projeto.
FROM node:18.20.3-alpine AS deps
RUN apk add --no-cache libc6-compat git openssh
WORKDIR /app
COPY package.json ./
RUN npm install -g npm@10.8.0 
RUN npm install
COPY . .
EXPOSE 5173

# executa o vite server
CMD [ "npm", "run", "dev", "--host"]