#!/bin/bash
npx tsc
npx webpack
cd ../server/gateway
docker build . -t michaelt23/web:gateway
cd ../
docker-compose up -d