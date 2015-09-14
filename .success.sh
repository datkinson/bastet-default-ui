#!/bin/bash
mkdir -p ~/.ssh
echo "$key" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null index.html $user@$host:.
rm -rf ~/.ssh
