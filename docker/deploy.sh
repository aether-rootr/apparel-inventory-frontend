#!/usr/bin/env bash

set -ex
VERSION="v0.0.3"

docker build --no-cache --network=host -t aethertaberu/bobo-chicke-apparel-inventory-frontend:${VERSION} .

docker tag aethertaberu/bobo-chicke-apparel-inventory-frontend:${VERSION} aethertaberu/bobo-chicke-apparel-inventory-frontend:latest

docker push aethertaberu/bobo-chicke-apparel-inventory-frontend:${VERSION}
docker push aethertaberu/bobo-chicke-apparel-inventory-frontend:latest