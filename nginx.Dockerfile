FROM nginx

COPY --from=stzups/ednotes /ednotes /usr/share/nginx/html
