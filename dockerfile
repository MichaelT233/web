FROM node:14
WORKDIR /home/wallace/web_server
COPY package*.json ./
RUN npm install && apt update && apt install -y nmap && apt install -y traceroute
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]