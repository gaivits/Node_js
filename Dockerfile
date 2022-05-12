FROM node:16-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Building app
EXPOSE 3000

# Running the app
CMD [ "npm", "start" ]