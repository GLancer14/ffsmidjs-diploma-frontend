FROM node:22.17-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY *.js ./
COPY ./src ./src
COPY *.json ./
COPY *.ts ./
COPY *.html ./

EXPOSE 5173

CMD ["npm", "run", "dev", "-L"]
