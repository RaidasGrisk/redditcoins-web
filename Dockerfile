# docker build -t vuejs-cookbook/dockerize-vuejs-app .
# docker run -d -p 80:80 --rm --name dockerize-vuejs-app-1 vuejs-cookbook/dockerize-vuejs-app


FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 80
CMD [ "http-server", "dist" ]
