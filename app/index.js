const express = require('express')
const config = require('./config')
const app = express()
const db = require('./db.js').connect()
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')

// config
app.use(function (req, res, next) {
  res.locals.req = req
  next()
})
app.use(cookieParser())
app.use(session({
  secret: 'they were like northern stars',
  resave: true,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({ extended: true }))

require('./controllers/csrf')(app)

// passport
require('./controllers/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// views
app.set('views', `${__dirname}/views`)
app.set('view engine', 'jade')

// static files
app.use('/static', express.static(`${__dirname}/static`))

// routes
require('./controllers/route')(app)

;[
  { route: '/configuration', path: './routes/configuration' },
  { route: '/settings', path: './routes/settings' }
].forEach(function(module) {
  app.use(module.route, require(module.path))
})

;[
  './routes/main',
  './routes/user',
  './routes/clients'
].forEach(function(routePath) {
  require(routePath)(app, passport)
})

// let's do this
app.listen(config.express.port, config.express.ip, function (error) {
  if (error)
    console.error(error)
  else
    console.log(`Payplox listening on localhost:${config.express.port}`)
})
