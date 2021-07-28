#!/bin/bash

# starts container on port 3000, named server
sudo docker run -d -p 3000:3000 --name server michaelt23/web:server
# delay to allow web server to start
echo 'initiazling web server...'
sleep 3

# pull postgres image
#sudo docker pull postgres:13
# start postgres container on port 5432, named db
sudo docker run -d -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust --name db postgres:13
# delay to allow database to start
echo 'initializing databse...'
sleep 3
# make default password for web server to use (change for produdction)
sudo docker exec -u postgres db psql -U postgres -c "ALTER USER postgres PASSWORD 'devPass'"
# populates products table with test data
value=$(<DB_Populate.sql)
sudo docker exec -u postgres db psql -c "$value"