FROM node:24

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# Development backend URL (proxied through Nginx in the combined setup)
ARG VITE_BACKEND_URL=http://localhost:8080/api
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]
