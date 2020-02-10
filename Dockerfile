FROM mike1pol/nginx-spa
EXPOSE 80

COPY dist /usr/share/nginx/html
