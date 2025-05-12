FROM node:18-slim

# Instala dependências do sistema para Prisma e OpenSSL 1.1.x
RUN apt-get update && apt-get install -y \
  openssl \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Define diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala dependências do Node.js
RUN npm install

# Copia o restante da aplicação
COPY . .

# Gera o Prisma Client com o binaryTarget correto
RUN npx prisma generate

# Expõe a porta do app
EXPOSE 3333

# Comando para iniciar o app
# CMD ["npm", "start"]
