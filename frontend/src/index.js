import { createRoot } from 'react-dom/client';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import App from './App.jsx';

const client = new ApolloClient({
    uri: 'http://localhost:3000/api',
    cache: new InMemoryCache(), //caches locally previously fetched data
  });

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);