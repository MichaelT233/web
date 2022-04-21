#!/bin/bash
npx tsc
npx webpack
cd ../server/core/gateway
docker build . -t gateway:latest
cd ../orchestration
docker-compose up -d
#docker-compose up -d