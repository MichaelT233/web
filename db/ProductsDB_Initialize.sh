sudo docker run -d --name db3 -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust postgres:13
sudo docker exec -d -u postgres db3 psql -U postgres -c "USER ALTER postgres PASSWORD 'rose1123'"