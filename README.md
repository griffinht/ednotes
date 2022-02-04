# EdNotes

## Development

### Live

```
docker compose -f docker-compose.dev.yml up
```
(http://localhost:8080)

### Build

```
docker build --tag stzups/ednotes:latest .
```
Static files can be found at `/ednotes`

## Production

Example `Dockerfile`
```
FROM nginx

COPY --from=stzups/ednotes /ednotes /usr/share/nginx/html 
```
