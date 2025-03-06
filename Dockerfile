FROM node:20-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm install --omit=dev

# Copia o restante do código da aplicação
COPY . .

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Expõe a porta em que a API será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "app.js"]



--docker build -t api-chamados .
--docker run -d -p 3000:4000 api-chamados
