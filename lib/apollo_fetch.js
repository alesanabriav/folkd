import { createApolloFetch } from 'apollo-fetch';

const endpoint = 'http://localhost:3000/graphql';
const apolloFetch = createApolloFetch({ endpoint });

apolloFetch.use(({ options }, next) => {
  const opts = options;

  if (!opts.headers) {
    opts.headers = {};// Create the headers object if needed.
  }

  const token = localStorage.getItem('folk-token');

  if (token === null || token === '') {
    setTimeout(() => {
      window.location = '/login';
    });
  }

  opts.headers.authorization = `Bearer ${token}`;
  next();
});

apolloFetch.useAfter(({ response }, next) => {

  if (response.status === 401) {
    setTimeout(() => {
      window.location = '/login';
    });
  }
  next();
});

export default apolloFetch;
