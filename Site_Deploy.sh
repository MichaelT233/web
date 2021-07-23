#!/bin/bash
# requirments: git, docker

# pull source from github
#git pull https://github.com/MichaelT233/web

# inititalize docker container network
#sudo docker network create site

# pull node image
#sudo docker pull node:14
# execute in directory with dockerfile, builds image
sudo docker build . -t michaelt23/web:server
# starts container on port 3000, named server
sudo docker run -d -p 3000:3000 --name server michaelt23/web:server
# delay to allow web server to start
echo 'initiazling web server...'
sleep 10

# pull postgres image
#sudo docker pull postgres:13
# start postgres container on port 5432, named db
sudo docker run -d -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust --name db postgres:13
# delay to allow database to start
echo 'initializing databse...'
sleep 10
# make default password for web server to use
sudo docker exec -u postgres db psql -U postgres -c "ALTER USER postgres PASSWORD 'x56hDCn76dW3R4s'"
# initializes products table
sudo docker exec -u postgres db psql -c 'CREATE TABLE products (name varchar(50), description varchar(300), price varchar(10), image bytea);'
# db is now up and can now be populated via node api or otherwise

# populates products table with test data
sudo docker exec -u postgres db psql -c "INSERT INTO products (name, description, price) VALUES ('testA', 'test1', 'test2');"