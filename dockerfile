# dockerfile config for building node web server image
FROM node:14
WORKDIR /home/wallace/webServer
COPY package*.json ./
RUN npm install
COPY . .
# tie the container to port 80
EXPOSE 80
CMD ["node", "webServer.js"]