FROM node:16

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV PORT=5005

EXPOSE 5005

CMD ["npm", "start"]