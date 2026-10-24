# Build stage
FROM node:24 AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run test

ARG VITE_BACKEND_URL=http://localhost:8080/api
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

# Production stage
FROM nginx:1.29-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html