const express = require('express')
const next = require('next')
const graphqlHTTP = require('express-graphql')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const schema = require('./gq/schema')

app.prepare()
.then(() => {
  const server = express()

  server.get('/profile/:id', (req, res) => {
    const params = Object.assign({}, req.query, req.params);
    return app.render(req, res, '/profile', params)
  })

  server.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
  }))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
