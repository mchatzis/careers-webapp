import { createRoot } from 'react-dom/client';
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import GlobalQueries from './GlobalQueries.jsx';

const { HOST_NAME, HOST_PORT } = env;

// const { HOST_NAME, HOST_PORT } = {
//   HOST_NAME:'localhost',
//   HOST_PORT:'3000'
// }

const client = new ApolloClient({
    uri: `http://${HOST_NAME}:${HOST_PORT}/api`,
    cache: new InMemoryCache({
      typePolicies:{
        Query:{
          fields:{
            jobs:{
              keyArgs:['title', 'location'],
              merge(existing, incoming, { args: { offset = 0 }}) {
                const merged = existing ? existing.slice(0) : [];
                for (let i = 0; i < incoming.length; ++i) {
                  merged[offset + i] = incoming[i];
                }
                return merged;
              },
            }
          }
        }
      }
    })
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