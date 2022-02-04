FROM node as build

WORKDIR /usr/app
COPY package.json .
RUN npm install

COPY tsconfig.json .
COPY src src
COPY src build
RUN rm -r build/scripts/ && npx tsc

FROM scratch

COPY --from=build /usr/app/build /ednotes
