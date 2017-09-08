const express = require('express');
const next = require('next');
const graphqlHTTP = require('express-graphql');
const passport = require('passport');
const bodyParser = require('body-parser');
const multer  = require('multer');
const schema = require('./gq/schema');
const HttpBearer = require('./lib/http_bearer');
const { login, getToken } = require('./lib/login');
const register = require('./lib/register');
const ga = require('./lib/ga');
const gaStorageEngine = require('./lib/ga_storage_engine');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const models = require('./models');
const upload = multer({ storage: gaStorageEngine() });

passport.use(HttpBearer);

app.prepare()
.then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(express.static(__dirname + '/node_modules'));

  server.post('/login', (req, res) => {
    login(req)
      .then(({ token }) => res.json({ token }));
  });

  server.post('/register/:type', register);

  server.get('/verify', (req, res) => {
    const { id, token } = req.query;
    models.User.findOne({where: {id: id, verify_token: token}})
      .then(user => {
        if(user) {
          return models.User.emailVerified(user);
        }
      })
      .then((user) => {
        return models.User.generateVerifyToken(user);
      })
      .then(user => {
          return res.redirect('/login?verified=1');
      })
      .catch(err => res.status(401).redirect('/login?verified=0'));
  });

  server.get('/profile/:id', (req, res) => {
    const params = Object.assign({}, req.query, req.params);
    return app.render(req, res, '/profile', params)
  });

  server.post('/gaoauth-url',
    passport.authenticate('bearer', { session: false }),
    (req, res) => {
    const { state } = req.body;
    const { user } = req.user;
    return res.json({ url: ga.getUrl(state) });
  });

  server.get('/gaoauth', (req, res) => {
    const { code, state } = req.query;
    const user = JSON.parse(decodeURIComponent(state));
    ga.setToken(code, user.id);
    return res.redirect('/');
  });

  server.post('/upload',
    passport.authenticate('bearer', { session: false }),
    upload.single('file'),
    (req, res) => {
      const { body, user, file } = req;
      ga.uploadFile(body, user, file)
        .then(attachment => res.json(attachment));
  });

  server.use('/graphql',
    passport.authenticate('bearer', { session: false }),
    graphqlHTTP({
      schema: schema,
      graphiql: true
    })
  );

  server.use('/graphiql',
  graphqlHTTP({
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
