FROM node:22.15.0


WORKDIR /server

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci

# Primeiro copia apenas os arquivos de dependências
COPY package.json package-lock.json ./ 

COPY  /dist ./dist

RUN npm install

RUN npm run build

# Depois copia o resto do código
COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev", "node", "dist/main"]