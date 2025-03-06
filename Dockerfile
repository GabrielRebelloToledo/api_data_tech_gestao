FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]




--docker build -t api-chamados .
--docker run -d -p 3000:4000 api-chamados
