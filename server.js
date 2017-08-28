const path = require('path');
const express = require('express');
const next = require('next');
const graphqlHTTP = require('express-graphql');
const passport = require('passport');
const bodyParser = require('body-parser');
const multer  = require('multer')
const uid = require('uid');
const schema = require('./gq/schema');
const HttpBearer = require('./lib/http_bearer');
const { login, getToken } = require('./lib/login');
const ga = require('./lib/ga');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const models = require('./models');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/uploads`)
  },
  filename: function (req, file, cb) {
    cb(null, `${uid(10)}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({ storage: storage });

passport.use(HttpBearer);

app.prepare()
.then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(express.static(__dirname + '/node_modules'));

  server.post('/login', (req, res) => {
    login(req).then(({ token }) => res.json({ token }));
  });

  function findOrCreateTeam(data) {
    return models.Company
    .findOne({where: { team_name: data.team_name }})
    .then(company => {
      if(company) return company;
      return models.Company.create(data);
    })
  }

  server.post('/register/:type', (req, res) => {
    const { body, params } = req;
    console.log(params, body);

    if(params.type === 'team') {
      return findOrCreateTeam(body)
      .then(user => res.status(201).json(user))
      .catch(err => res.status(400).json(err));
    }

    if(params.type === 'company') {
      return models.Company.update(body, { where: { id: body.id } })
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).json(err));
    }

    if(params.type === 'user') {
      return models.User.create(body)
      .then(user => {
        delete user.password;
        return user;
      })
      .then(user => {
        const token = getToken(user);
        res.status(201).json({token, user});
      })
      .catch(err => res.status(400).json(err));
    }

  });

  server.get('/profile/:id', (req, res) => {
    const params = Object.assign({}, req.query, req.params);
    return app.render(req, res, '/profile', params)
  });

  server.post('/gaoauth-url', (req, res) => {
    const state = req.body;
    return res.json({ url: ga.getUrl(state) });
  });

  server.get('/gaoauth', (req, res) => {
    const { code } = req.query;
    console.log('query', req.query);
    ga.setToken(code, 1);
    return res.json({});
  })

  server.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.body);
    ga.uploadFile(req.body.id, req.file);
    return res.json(req.file);
  });

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
