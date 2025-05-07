### Documentação da API

Acesse a documentação interativa em:
http://localhost:3001/api-docs

Para gerar um arquivo OpenAPI:
```bash

curl http://localhost:3001/api-docs-json > openapi.json

### Configuração do Ambiente


### Requisitos
- Docker 20+
- Node.js 18+

Modules e Dependencias:
\myviptv\server> npm cache clean --force
\myviptv\server> npm install --force

Subir Banco Postgres e testar o build + run local:
### Inicialização
```bash
docker-compose up -d
docker-compose down
npm run dev

### Comandos Docker
docker ps -a
docker logs myviptv-server-1 
docker build -t myviptv-server:latest ./server 
docker-compose down && docker-compose build

### Executando Migracao
cd server > npx typeorm-ts-node-commonjs migration:run -d C:\Users\Marcus\myviptv\server\src\config\data-source.ts