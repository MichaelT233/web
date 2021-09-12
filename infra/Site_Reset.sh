#!/bin/bash
# comment/uncomment lines as needed
# stops and removes the site's containers (--rm flag during run command deletes container upon exiting)...
#... and erases the node web server image (if needed for development)
# stop and remove node web server container
#echo 'stopping and removing the following container...'
#docker stop web_server
# stop and remove postgreSQL container
echo 'stopping and removing the following container...'
docker stop database
# remove node web server image
#echo 'removing the following image...'
#docker rmi michaelt23/web:server