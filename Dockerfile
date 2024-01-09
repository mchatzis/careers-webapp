FROM node:18-alpine

WORKDIR /home/app

COPY ./package.json ./package.json
RUN npm install

COPY . .

CMD ["npm", "run", "prod"]