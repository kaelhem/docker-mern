require('dotenv').config()

const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const compress = require('compression')
const config = require('./config')
const database = require('./database')

// log to console
app.use(morgan('dev'))

// Apply gzip compression
app.use(compress())

// get our request parameters
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }))
app.use(bodyParser.json({limit: '5mb'}))

// defines APIs
app.use('/api/todo', require('./api/todo'))

// while in development the webpack dev-server will serve the static files of our app,
// in production we need to includes them
if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')))  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
  })
}

// connect to mongo database
database.connect().then(() => {
  var server = app.listen(config.port, function () {
    var port = server.address().port
    console.log('App now running on port', port)
    process.env.NODE_ENV && console.log('Detected environment is:', process.env.NODE_ENV)
  })
})
.catch(err => {
  console.error('could not connect to mongo DB', err)
  process.exit(1)
})