FROM node

WORKDIR /usr/app
COPY package.json .
COPY tsconfig.json .
RUN npm install

VOLUME /usr/app/src
VOLUME /usr/app/build

ENTRYPOINT ["npx", "tsc", "--watch"]
