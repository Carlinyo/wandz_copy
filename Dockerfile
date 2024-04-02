# build stage.
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY .npmrc ./
RUN npm install

WORKDIR /app/src/design-library
COPY src/design-library/package*.json ./
RUN npm install

WORKDIR /app

COPY . .
RUN npm run build-no-type-check

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
