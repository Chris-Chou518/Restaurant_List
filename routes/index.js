const express = require('express')
const router = express.Router()

const passport =require('passport')

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

//local登入
router.post('/login', passport.authenticate('local', {
  successRedirect: '/Restaurants',
  failureRedirect: '/login',
  failureFlash: true
}))

//fb登入
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