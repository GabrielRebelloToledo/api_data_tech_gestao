FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /home/node/app

# Copia o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY --chown=node:node . .

# Expõe a porta em que a API será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "app.js"]




