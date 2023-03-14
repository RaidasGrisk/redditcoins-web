# to redeploy
build locally  
push to repo  
pull in server and move dist to nginx serving location

```
// this is really bad devops, but oh. Will refactor all of this someday.
rm -r /home/mrraidas/nginx-certbot/data/nginx/www/*
cp -r dist/* /home/mrraidas/nginx-certbot/data/nginx/www/
```
