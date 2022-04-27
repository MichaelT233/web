#!/bin/bash
npx tsc
npx webpack
cd ../server/core/gateway
docker build . -t gateway:latest
cd ../../
docker-compose up -d
#docker-compose up -d