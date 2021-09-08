#!/bin/bash
# comment/uncomment lines as needed
# stops and removes the site's containers, and erases the node web server image (if needed for development)
# stop and remove node web server container
#sudo docker stop server
#sudo docker rm server
# stop and remove postgreSQL container
sudo docker stop db
sudo docker rm db
# remove node web server image
#sudo docker rmi michaelt23/web:server