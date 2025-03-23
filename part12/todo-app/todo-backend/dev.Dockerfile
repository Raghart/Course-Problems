FROM node:20
  
WORKDIR /app

COPY --chown=node:node . .

RUN npm install

ENV DEBUG=playground:*

USER node

EXPOSE 3000

CMD ["npm", "run", "dev"]

# docker build -f dev.Dockerfile -t dev-backend .