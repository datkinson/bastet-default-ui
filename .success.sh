#!/bin/bash
branch_name="$(git symbolic-ref HEAD 2>/dev/null)" ||
branch_name="(unnamed branch)"     # detached HEAD

branch_name=${branch_name##refs/heads/}

echo "Current branch: $branch_name"
echo "Travis branch: $TRAVIS_BRANCH"
