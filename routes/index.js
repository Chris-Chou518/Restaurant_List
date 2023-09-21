const express = require('express')
const router = express.Router()
const bcrypt =require('bcryptjs')

const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')

const db = require('../models')
const User = db.User

//local登入
passport.use(new LocalStrategy({usernameField: 'email'},(username, password, done) => {
  return User.findOne({
    attributes: ['id', 'name', 'password', 'email'],
    where: { email: username },
    raw: true 
  })
  .then((user) => {
    if (!user) {
      return done(null, false, { message:'email或密碼錯誤'})
    }
    return bcrypt.compare(password, user.password)
      .then((isMatched) => {
        if (!isMatched) {return done(null. false, {message: 'email或密碼錯誤'})}
        return done(null, user)
      })
  })
  .catch((error) => {
    error.errorMessage = '登入失敗'
    done(error)
  })
}))

//facebook登入
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ['email', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
  console.log('accessToken', accessToken)
  console.log('profile', profile)

  const email = profile.emails[0].value
  const name = profile.displayName
  return User.findOne({
    attributes:['id', 'name', 'email'],
    where: { email },
    raw: true
  })
  .then((user) => {
    if (user) {return done(null, user)}

    const randomPwd = Math.random().toString(36).slice(-8)
    return bcrypt.hash(randomPwd, 10)
      .then((hash) => User.create({ name, email, password: hash }))
      .then((user) => done(null, { id: user.id, name: user.name, email: user.email }))
  })
  .catch(() =>{
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

const authHandler = require('../middlewares/auth-handler')

const restaurants = require('./restaurants')
const users = require('./users')


router.use('/Restaurants', authHandler, restaurants)  //router.use( authHandler, restaurants)寫這樣無效
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

router.get('/login/facebook', passport.authenticate('facebook', {scope :['email']}))
router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', { 
    failureRedirect: '/login', 
    successRedirect: '/Restaurants',
    failureFlash: true }))

router.post('/logout',(req, res, next) => {
  req.logout((error) => {
    if (error) {
      next(error)
    }
    return res.redirect('/login')
  })
})


module.exports = router