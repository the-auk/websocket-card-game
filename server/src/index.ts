// {
// // import { ApolloServer } from "@apollo/server";
// // import { startStandaloneServer } from "@apollo/server/standalone";
// // import { resolvers, typeDefs } from "./CardDealerServer";

// // const server = new ApolloServer({
// //   typeDefs,
// //   resolvers,
// // });

// // const app = async () => {
// //   const { url } = await startStandaloneServer(server, {
// //     listen: { port: 4000 },
// //   });

// //   console.log(`🚀  Server ready at: ${url}`);
// // };

// // app().catch((err) => console.error(err));
// }
import { ApolloServer } from '@apollo/server';
import { createServer } from 'http';
import express from 'express';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { typeDefs, resolvers } from './CardDealerServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { expressMiddleware } from "@apollo/server/express4"
import cors from 'cors';
import bodyParser from 'body-parser';

(async function(){
  
// create express and HTTP server
const app = express();
const httpServer = createServer(app);
 
// create websocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const schema = makeExecutableSchema({typeDefs, resolvers});
// Save the returned server's info so we can shut down this server later
const serverCleanup = useServer({ schema }, wsServer);
 
// create apollo server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),
 
    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});
 
await apolloServer.start();
app.use(cors());
app.use('/', bodyParser.json(), expressMiddleware(apolloServer));
 
httpServer.listen(4000);
})();
