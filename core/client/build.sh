#!/bin/bash
npx tsc
npx webpack
cd ../server
docker build . -t web-server:latest
docker-compose up -d