# stops and removes the site's containers
sudo docker stop server
sudo docker rm server
sudo docker stop db
sudo docker rm db

# sometimes postgres process lingers?
# sudo lsof -i -P -n | grep LISTEN
# then kill by PID accordingly