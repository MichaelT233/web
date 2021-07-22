# execute in directory with dockerfile, builds image
sudo docker build . -t michaelt23/web:server
# starts container on port 3000, named server
sudo docker run -d -p 3000:3000 --name server michaelt23/web:server