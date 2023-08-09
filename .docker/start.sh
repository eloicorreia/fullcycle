#!/bin/bash

if [ ! -f "./src/@core/.env.test"]; then
    cp ./src/@core/.env.test.example ./src/@core/.env.test
fi

npm install npm

tail -f /dev/null