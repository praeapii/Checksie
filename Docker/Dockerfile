From ubuntu:18.04
#set time zone
ENV TZ=Asia/Bangkok
#install node and mongodb

WORKDIR /
#create directory for mongod
RUN mkdir -p data/db  

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone \
    && apt-get update && apt-get install -y \
    curl \
    gnupg \
    wget \
    && apt-get update \
    && wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add - \
    && echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb.list \
    && curl -sL https://deb.nodesource.com/setup_13.x | bash -\
    && apt-get update \
    && apt-get install -y mongodb-org=4.2.5 mongodb-org-server=4.2.5 mongodb-org-shell=4.2.5 mongodb-org-mongos=4.2.5 mongodb-org-tools=4.2.5 \
    nodejs \
    && apt auto-remove -y \
#install node packages
    && npm install -g --unsafe-perm apollo-server@2.12.0 \
    graphql@15.0.0 \
    graphql-import@1.0.1 \
    mongoose@5.9.7 \
    @babel/cli@7.8.4\
    @babel/core@7.9.0\
    @babel/node@7.8.7\
    @babel/preset-env@7.9.5\
    nodemon@2.0.2\
    apollo-server-express@2.12.0\
    bcrypt@4.0.1\
    cors@2.8.5\
    express@4.17.1\
    jsonwebtoken@8.5.1

WORKDIR /app
#ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install
COPY commands.sh /scripts/commands.sh
RUN ["chmod", "+x", "/scripts/commands.sh"]

#start mongod service on start and entry at bash
ENTRYPOINT ["/scripts/commands.sh"] 

