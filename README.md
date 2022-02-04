# EdNotes

## Development

### Live

```
docker compose -f docker-compose.dev.yml up
```
(http://localhost:8080)

### Build

Scratch image with static files in `/ednotes`.
```
docker build --tag stzups/ednotes:latest .
```

Convenience image which serves the static files via an HTTP server on port 80.
```
docker build --tag stzups/ednotes:nginx -f nginx.Dockerfile .
```

## Production

Example `Dockerfile` which uses an `nginx` server to serve the static files in `/ednotes`.
```
FROM nginx

COPY --from=stzups/ednotes /ednotes /usr/share/nginx/html 
```

Example `docker-compose.yml` which uses the convenience `stzups/ednotes:nginx` image.
```
services:
    ednotes:
        image: stzups/ednotes:nginx
        ports:
            - 8080:80
```
