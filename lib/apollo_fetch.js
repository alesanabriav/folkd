import { createApolloFetch } from 'apollo-fetch';
const endpoint = 'http://localhost:3000/graphql';
const apolloFetch = createApolloFetch({ endpoint });
const logout = () => {
  localStorage.removeItem('folk-token');
  setTimeout(() => {
    window.location = '/login';
  })
};

apolloFetch.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {};  // Create the headers object if needed.
  }
  const token = localStorage.getItem('folk-token');
  console.log(token);
  if(token === null || token === '') {
    setTimeout(() => {
      window.location = '/login';
    })
  }

  options.headers['authorization'] = `Bearer ${token}`;
  next();


});

apolloFetch.useAfter(({ response }, next) => {

  if (response.status === 401) {
    logout();
  }
  next();
});


export default apolloFetch;
