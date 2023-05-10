#!/bin/bash

# Clean project
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Clean npm cache
yarn cache clean --force

# Install packages
yarn install
