FROM node:18-alpine

WORKDIR /server

# Primeiro copia apenas os arquivos de dependências
COPY package.json package-lock.json ./

RUN npm install

# Depois copia o resto do código
COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]