#!/bin/bash
# uncomment lines as needed
# execute from /infra directory

# pull node image curruent version 14
#sudo docker pull node:14
# builds node web server image from source code and dockerfile spec
#sudo docker build .. -t michaelt23/web:server

# starts node web server container on port 3000, named server
#sudo docker run -d -p 3000:3000 --name server michaelt23/web:server
# delay to allow server to start
#echo 'allowing web server to initialize...'
#sleep 3

# pull postgreSQL image, current version 13
#sudo docker pull postgres:13
# docker execute commainds inside postgreSQL container are to be as user postgres
# start postgres container on port 5432, execute command within it to set it's env var host authorization method to trust and name it db
sudo docker run -d -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust --name db postgres:13
# delay to allow database to start
echo 'allowing database server to initialize...'
sleep 3
# make default password and user for the postgreSQL database (change for produdction, user: postgres, password: devPass)
sudo docker exec -u postgres db psql -U postgres -c "ALTER USER postgres PASSWORD 'devPass'"
# populates products table with test data
# reference of SQL file as a string
value=$(<DB_Populate.sql)
# execute the SQL within the database
sudo docker exec -u postgres db psql -c "$value"