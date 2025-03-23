FROM node:20
  
WORKDIR /app

COPY --chown=node:node . .

RUN npm ci 

ENV DEBUG=playground:*

USER node

CMD npm start