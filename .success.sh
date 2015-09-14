#!/bin/bash

if [ -z "$url" ]; then
    echo "Need to set target url"
    exit 1
fi

if [ -z "$secret" ]; then
    echo "Need to set secret"
    exit 1
fi 

echo 'curl --data "secret=secret&repo=$TRAVIS_REPO_SLUG&branch=$TRAVIS_BRANCH" http://$url:$port'
curl --data "secret=$secret&repo=$TRAVIS_REPO_SLUG&branch=$TRAVIS_BRANCH" http://$url:$port
