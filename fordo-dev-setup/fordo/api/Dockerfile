# Dockerfile

FROM node:20.12.1-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev"]