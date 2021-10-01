# dockerfile config for building node web server
# all RUN, COPY, and ADD instructions create a new image layer in docker's layer cache
# use node v14 image
FROM node:14
# the working directory of the container
WORKDIR /home/wallace/webServer
# copy package.json and package-lock.json into the container's working directory (new layer)
COPY package*.json ./
# install all node packages included in package config files from above (new layer)
RUN npm install
# copy the entire contents of */web into the container's working directory (new layer)
COPY . .
# tie the container to port 80
EXPOSE 80
# the default command for executing the container, in this case executing the express javascript file in node
CMD ["node", "webServer.js"]