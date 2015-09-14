#!/bin/bash

if [ -z "$url" ]; then
    echo "Need to set target url"
    exit 1
fi

if [ -z "$secret" ]; then
    echo "Need to set secret"
    exit 1
fi 

curl --data "secret=$secret&branch=$TRAVIS_BRANCH" https://$url
