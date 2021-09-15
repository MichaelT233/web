#!/bin/bash
# script for resetting the docker containers and images

# ask what mode the web application is running in
read -p "was the web application started in production or development mode?(enter p or d): " mode
# if production mode
if [ "$mode" == "p" ]; then
    # stop and remove node web server container
    echo 'stopping and removing the following container...'
    docker stop web_server
    # stop and remove postgreSQL container
    echo 'stopping and removing the following container...'
    docker stop database
    echo 'web application reset complete'
# if development mode (just input validation currently)
elif [ "$mode" == "d" ]; then
    # stop and remove postgreSQL container
    echo 'stopping and removing the following container...'
    docker stop database
    echo 'web application reset complete'
# invalid mode
else
    echo 'invalid input'
fi