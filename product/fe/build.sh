#!/bin/bash
npx tsc
cd ../../make
npx webpack
cd ../server
docker build . -t web-server:latest
docker-compose up -d