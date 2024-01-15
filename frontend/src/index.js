import { createRoot } from 'react-dom/client';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import GlobalQueries from './GlobalQueries.jsx';

const { HOST_NAME, HOST_PORT } = env;

const client = new ApolloClient({
    uri: `https://${HOST_NAME}:${HOST_PORT}/api`,
    cache: new InMemoryCache()
  });

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <GlobalQueries>
        <App />
      </GlobalQueries>
    </ApolloProvider>
  </BrowserRouter>
);