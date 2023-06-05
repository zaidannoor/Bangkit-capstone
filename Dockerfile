FROM node:16.16.0-alpine

WORKDIR /application

COPY . ./
RUN npm install bcrypt
RUN npm install --omit=dev
# RUN npm install


CMD ["npm", "run", "start"]

EXPOSE 3005