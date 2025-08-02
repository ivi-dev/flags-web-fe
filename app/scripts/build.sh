#!/bin/bash

IMG_NAME=flags-web-fe:latest
CONTAINER_NAME=flags-web-fe

docker rm -f $CONTAINER_NAME
docker image rm -f $IMG_NAME
docker build -t $IMG_NAME $1