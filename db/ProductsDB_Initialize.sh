# pull postgres image
sudo docker pull postgres:13
# start postgres container on port 5432, named db
sudo docker run -d --name db -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust postgres:13
# make default password for web server to use
sudo docker exec -d -u postgres db psql -U postgres -c "USER ALTER postgres PASSWORD 'rose1123'"