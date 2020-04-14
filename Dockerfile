FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Copy source
COPY ./app/package.json package.json
COPY ./app/yarn.lock yarn.lock

RUN yarn

EXPOSE 8080
EXPOSE 443
