# docker build -t vuejs-cookbook/dockerize-vuejs-app .
# docker run -it -d -p 80:80 --rm --name dockerize-vuejs-app-1 vuejs-cookbook/dockerize-vuejs-app

# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
