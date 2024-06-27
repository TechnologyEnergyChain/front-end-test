#!/bin/bash

cd ./dictionaries

# Start the Nitro server in the background
yarn nitro dev --host &

# Navigate to your Angular project directory (replace with your path)
cd ../angular-app

# Start the Angular application in the foreground
yarn ng serve
