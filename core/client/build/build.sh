#!/bin/bash
cd ..
npx tsc
cd build
npx webpack
cd ../../server/gateway
docker build . -t gateway:latest
docker-compose up -d