const express = require('express')
const router = express.Router()

const passport = require('passport')
const LocalStrategy = require('passport-local')

const db = require('../models')
const User = db.User

passport.use(new LocalStrategy({usernameField: 'email'},(username, password, done) => {
  return User.findOne({
    attributes: ['id', 'name', 'password', 'email'],
    where: { email: username },
    raw: true 
  })
  .then((user) => {
    if (!user || password !== user.password) {
      return done(null, false, { message:'email或密碼錯誤'})
    }
    return done(null, user)
  })
  .catch((error) => {
    error.errorMessage = '登入失敗'
    done(error)
  })
}))

passport.serializeUser((user, done) => {
  const {id, name, email} = user
  return done(null ,{ id, name, email })
})

passport.deserializeUser((user, done) => {
	done(null, { id: user.id })
})



const restaurants = require('./restaurants')
const users = require('./users')


router.use(restaurants)
router.use(users)

router.get('/', (req, res) => {
  res.redirect('/Restaurants')
})


router.get('/register',(req, res) => res.render('register'))

router.get('/login',(req, res) => res.render('login'))

router.post('/login', passport.authenticate('local', {
  successRedirect: '/Restaurants',
  failureRedirect: '/login',
  failureFlash: true
}))

router.post('logout',(req, res) => {
  return res.send('logout')
})


module.exports = router