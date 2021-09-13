#!/bin/bash

# ask what mode the web application is running in
read -p "what mode was the web application started in, production or development?(enter p or d): " mode
# following code is executed for both modes
# stop and remove postgreSQL container
echo 'stopping and removing the following container...'
docker stop database
# if production mode
if [ "$mode" == "p" ]; then
    # stop and remove node web server container
    echo 'stopping and removing the following container...'
    docker stop web_server
    # remove node web server image
    docker rmi michaelt23/web:server
    echo 'web application reset complete'
# if development mode (just input validation currently)
elif [ "$mode" == "d" ]; then
    echo 'web application reset complete'
# invalid mode
else
    echo 'invalid input'
fi