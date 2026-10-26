# Use nodemon (via npm run dev) so the backend restarts on source changes
FROM node:24

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
