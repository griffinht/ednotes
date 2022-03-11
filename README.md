# EdNotes

## Development

### Live

```
docker compose up
```
http://localhost:8080

### Build

Build scratch image with static files in `/ednotes`.
```
docker build --tag stzups/ednotes:latest .
```

## Production

Example `Dockerfile` which uses an `nginx` server to serve the static files via HTTP in `/ednotes`.
```
FROM nginx

COPY --from=stzups/ednotes /ednotes /usr/share/nginx/html 
```

## Usage

### Keyboard shortcuts

