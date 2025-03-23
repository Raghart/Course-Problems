FROM node:20

WORKDIR /usr/src/app

COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]

# docker build --build-arg VITE_BACKEND_URL=http://localhost:3000/todos -t dev-frontend -f dev.Dockerfile .