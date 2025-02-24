import mongoose from 'mongoose'
mongoose.set('strictQuery', false)
import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import cors from 'cors'
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/use/ws';

import typeDefs from './typdefs.js'
import resolvers from './resolvers.js'
import jwt from 'jsonwebtoken'
import User from './Models/UserSchema.js'
import dotenv from 'dotenv'; dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error  connection to MongoDB', error.message)
})

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useServer({ schema }, wsServer)

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith('Bearer')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
          const currentUser = await User.findById(decodedToken.id).populate('friends');
          return { currentUser };
        }
      },
    })
  );

  const PORT = 4000
  httpServer.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
    console.log(`Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

start();
