#!/bin/bash
# script for deployment of web application

# port for the node web server to use
web_port="80"
# password for the postgreSQL database server to use
db_password="devPass"
# port for the database to listen on
db_port="5432"
# name of the built node web application image on dockerhub
node_app_image="michaelt23/web_app:node"
# name of the postgreSQL database image on dockerhub
postgres_image="postgres:13"

# function to deploy the database container
function deploy_database {
    # explanation of docker daemon output of the following commands in terminal
    echo 'starting database container, docker daemon UUID->:'
    # start postgres container on defined port, run in detached mode and remove container after exiting, ...
    # ... execute command within it to set it's env variable host authorization method to trust, and name it database
    docker run --rm -d -p ${db_port}:${db_port} -e POSTGRES_HOST_AUTH_METHOD=trust --name database ${postgres_image}
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
}
# function to deploy the web server container
function deploy_web_server {
    # explanation of docker daemon output of following command in terminal
    echo 'starting web_server container, docker daemon UUID->:'
    # start node web server container on defined port, run in detached mode, remove container after exiting, and name server
    docker run --rm -d -p ${web_port}:${web_port} --name web_server ${node_app_image}
    # delay to allow web server container to start
    echo 'allowing web server container to initialize...'
    sleep 3
    echo 'web application listening on port 80...'
}

# command line options
# if production mode
if [ $1 == "-prod" ]; then
    deploy_database
    deploy_web_server
# if development mode
elif [ $1 == "-dev" ]; then
    deploy_database
    # run node locally for convenience when developing server side
    cd ..
    echo 'root privelege required to listen on port 80...'
    sudo node main.js
# invalid option
else
    echo "invalid option: $1"
fi