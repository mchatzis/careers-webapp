FROM node:18-alpine

WORKDIR /home/app

COPY ./package.json ./package.json
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "prod"]