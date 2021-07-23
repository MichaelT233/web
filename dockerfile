FROM node:14
WORKDIR /home/wallace/web_server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]