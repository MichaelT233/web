#!/bin/bash
# script to install docker, configure ubuntu, and pull necessary images
# meant for automated configuration of production environment only

# name of the built node web application image on dockerhub
webServerImage="michaelt23/web:webServer"
# name of the postgreSQL database image on dockerhub
dbImage="postgres:13"

# install docker and it's repository on ubuntu
# based on docs.docker.com, subject to change
sudo apt update
# install docker dependencies
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
# gpg key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
# add repository
echo \
    "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
# install docker system
sudo apt install -y docker-ce docker-ce-cli containerd.io

# create docker group
echo 'creating docker group and adding current user...' 
sudo groupadd docker
# add current user to docker group for privilege level, so docker commands can be run without sudo
sudo usermod -aG docker $USER
# update group status
newgrp docker

# login to dockerhub in order to pull images
docker login
# pull postgreSQL image, current version 13
echo 'pulling postgreSQL image...'
docker pull ${dbImage}
# pull built node dockerhub image
echo 'pulling custom node image...'
docker pull ${webServerImage}

# siteDeploy.sh can now be run to deploy the web application in production mode