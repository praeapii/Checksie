#!/bin/bash
docker run -it \
-v $(dirname ${PWD})/Backend/apollo-graphql-mongoDB:/app \
-v /app/node_modules \
-p 5000:5000 \
covid:dev
