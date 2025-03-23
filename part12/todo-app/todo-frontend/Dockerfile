FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

FROM node:20 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN npm test

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# docker build --build-arg VITE_BACKEND_URL=http://localhost:3000/todos -t frontend .