FROM node:16.16.0-alpine

WORKDIR /application

COPY . ./

RUN npm install --omit=dev


CMD ["npm", "run", "start"]

EXPOSE 3005