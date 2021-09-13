#!/bin/bash
# script for deployment of web application

# port for the node web server to use
web_port="80"
# password for the postgreSQL database server to use
db_password="devPass"
# port for the database to listen on
db_port="5432"

# ask if this is a first time setup
read -p "is this a first time setup?(enter y or n): " response
# if yes
if [ "$response" == "y" ]; then
    # following block for first time setup only
    # create docker group
    echo 'creating docker group and adding current user...' 
    sudo groupadd docker
    # add current user to docker group for privilege level, so docker commands can be run without sudo
    sudo usermod -aG docker $USER
    # update group status
    newgrp docker 
    # pull node image curruent version 14
    echo 'pulling node image...'
    docker pull node:14
    # pull postgreSQL image, current version 13
    echo 'pulling postgreSQL image...'
    docker pull postgres:13
    # if not first time
    elif [ "$response" == "n" ]; then
        # ask what mode the web application is to be run in
        read -p "run web application in production or development mode?(enter p or d): " mode
        # following code is executed for both modes
        # explanation of docker daemon output of the following commands in terminal
        echo 'starting database container, docker daemon UUID->:'
        # start postgres container on defined port, run in detached mode and remove container after exiting, ...
        # ... execute command within it to set it's env variable host authorization method to trust, and name it database
        docker run --rm -d -p ${db_port}:${db_port} -e POSTGRES_HOST_AUTH_METHOD=trust --name database postgres:13
        # delay to allow database server container to start
        echo 'allowing database container to initialize...'
        sleep 3
        echo "database listening on port ${db_port}..."
        # begin configuration and population of the database container
        echo 'populating database->:'
        # make default password and user for the postgreSQL database (change for produdction, user: postgres, password: devPass)
        docker exec -u postgres database psql -U postgres -c "ALTER USER postgres PASSWORD '${db_password}'"
        # populates products table with test data
        # reference of SQL file as a string
        sql=$(<DB_Populate.sql)
        # execute the SQL within the database
        docker exec -u postgres database psql -c "${sql}"
    # if production mode
    if [ "$mode" == "p" ]; then
        # build node web server image from source code according to dockerfile configuration, name is michaelt23/web:server
        echo 'building web server image...'
        docker build .. -t michaelt23/web:server
        # explanation of docker daemon output of following command in terminal
        echo 'starting web_server container, docker daemon UUID->:'
        # start node web server container on defined port, run in detached mode, remove container after exiting, and name server
        docker run --rm -d -p ${web_port}:${web_port} --name web_server michaelt23/web:server
        # delay to allow web server container to start
        echo 'allowing web server container to initialize...'
        sleep 3
        echo 'web application listening on port 80...'
    # if development mode
    elif [ "$mode" == "d" ]; then
        # if developing server-side run node locally for convenience
        cd ..
        echo 'root privelege required to listen on port 80...'
        sudo node main.js
    # invalid mode
    else
        echo "invalid input"
    fi
# invalid response
else
    echo "invalid input"
fi