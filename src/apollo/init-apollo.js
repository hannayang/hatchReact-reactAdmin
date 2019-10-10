import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { split, from } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'isomorphic-unfetch';
import resolvers from 'apollo/resolvers';
import initialData from 'apollo/initialData';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState, { getToken }) {
  let token = getToken();

  const httpLink = createHttpLink({
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    uri: process.env.API_URL,
  });

  const authLink = setContext((_, { headers }) => {
    // removing getToken() from here causes problems when clearing the store on login/log out
    token = getToken();
    return {
      headers: {
        ...headers,
        ...(token
          ? {
              'x-authentication-token': token,
            }
          : {}),
      },
    };
  });

  let link = from([authLink, httpLink]);

  if (process.browser) {
    const wsLink = new WebSocketLink({
      uri: process.env.SUBSCRIPTION_URL,
      options: {
        reconnect: true,
        connectionParams: {
          'x-authentication-token': token,
        },
      },
    });

    link = split(
      // split based on operation type (this is very important)
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      link,
    );
  }

  const cache = new InMemoryCache().restore(initialState || {});

  cache.writeData({
    data: initialData,
  });

  return new ApolloClient({
    cache,
    connectToDevTools: process.browser,
    link,
    resolvers,
    ssrMode: !process.browser,
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'ignore',
      },
      query: {
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)

  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
