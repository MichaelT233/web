#!/bin/bash
# comment/uncomment lines as needed
# execute from /infra directory
# port for the node web server to use
web_port="3000"
# password for the postgreSQL database server to use
db_password="devPass"
# port for the database to listen on
db_port="5432"

# pull node image curruent version 14
#sudo docker pull node:14
# build node web server image from source code and dockerfile spec
#sudo docker build .. -t michaelt23/web:server

# start node web server container on defined port, named server
#sudo docker run -d -p ${web_port}:${web_port} --name server michaelt23/web:server
# delay to allow server to start
#echo 'allowing web server to initialize...'
#sleep 3

# pull postgreSQL image, current version 13
#sudo docker pull postgres:13
# docker execute commainds inside postgreSQL container are to be as user postgres
# start postgres container on defined port, execute command within it to set it's env variable host authorization method to trust, and name it db
sudo docker run -d -p ${db_port}:${db_port} -e POSTGRES_HOST_AUTH_METHOD=trust --name db postgres:13
# delay to allow database to start
echo 'allowing database server to initialize...'
sleep 3
# make default password and user for the postgreSQL database (change for produdction, user: postgres, password: devPass)
sudo docker exec -u postgres db psql -U postgres -c "ALTER USER postgres PASSWORD '${db_password}'"
# populates products table with test data
# reference of SQL file as a string
sql=$(<DB_Populate.sql)
# execute the SQL within the database
sudo docker exec -u postgres db psql -c "${sql}"