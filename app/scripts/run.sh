#!/bin/bash

CONTAINER_NAME=flags-web-fe

docker rm -f $CONTAINER_NAME
docker run -d --name $CONTAINER_NAME -p 80:80 $CONTAINER_NAME:latest
docker network connect flags $CONTAINER_NAME