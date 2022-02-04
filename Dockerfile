FROM node

COPY package.json
RUN npm install

VOLUME /src
VOLUME /build
WORKDIR /src

ENTRYPOINT ["sleep 10000"]
