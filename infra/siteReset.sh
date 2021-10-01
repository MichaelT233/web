#!/bin/bash
# script for resetting the docker containers and images

# command line options
# if production mode
if [ $1 == "-prod" ]; then
    # stop and remove postgreSQL container
    echo 'stopping and removing the following container...'
    docker stop database
    # stop and remove node web server container
    echo 'stopping and removing the following container...'
    docker stop webServer
    echo 'web application reset complete'
# if development mode (just input validation currently)
elif [ $1 == "-dev" ]; then
    # stop and remove postgreSQL container
    echo 'stopping and removing the following container...'
    docker stop database
    echo 'web application reset complete'
# invalid option
else
    echo "invalid option: $1"
fi