const express = require('express');
const next = require('next');
const graphqlHTTP = require('express-graphql');
const passport = require('passport');
const bodyParser = require('body-parser');
const schema = require('./gq/schema');
const HttpBearer = require('./lib/http_bearer');
const login = require('./lib/login');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

passport.use(HttpBearer);

app.prepare()
.then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));

  server.post('/login', (req, res) => {
    login(req).then(({ token }) => res.json({ token }));
  });

  server.get('/profile/:id', (req, res) => {
    const params = Object.assign({}, req.query, req.params);
    return app.render(req, res, '/profile', params)
  })

  server.use('/graphql',
    passport.authenticate('bearer', { session: false }),
    graphqlHTTP({
      schema: schema,
      graphiql: true
    })
  );

  server.use('/graphiql', graphqlHTTP({
  	schema,
  	graphiql: true
  }));

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
