import ReactDOM from 'react-dom/client';
import './index.css';
import App from './CardDealer';
import { split, HttpLink, ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// const gqlClient = new ApolloClient({
//   // This port must be the same as in server/src/index.ts
//   uri: "http://localhost:4000",
//   cache: new InMemoryCache(),
// });

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/'
});
const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
}));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const gqlClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

root.render(
  <ApolloProvider client={gqlClient}>
    <App />
  </ApolloProvider>
);
