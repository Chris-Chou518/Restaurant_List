const express = require('express')
const {engine} =require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const port = 3000

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const passport = require('./config/passport')

const flash = require('connect-flash')
const session =require('express-session')

const router = require('./routes')

const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')
const { config } = require('dotenv')


app.engine('.hbs',engine({extname:'.hbs'}))
app.set('view engine', '.hbs')
app.set('views','./views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

app.use(messageHandler)

app.use(router)

app.use(errorHandler)

app.listen(port, () =>{
  console.log(`Express server is on localhost:${port}`)
})