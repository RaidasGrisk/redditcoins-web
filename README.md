# to redeploy
build locally  
push to repo  
pull in server and move dist to nginx serving location

```
// this is really bad devops, but oh. Will refactor all of this someday.
rm -r /home/mrraidas/nginx-certbot/data/nginx/www/*
cp -r dist/* /home/mrraidas/nginx-certbot/data/nginx/www/
```

# reddit-coin-web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
