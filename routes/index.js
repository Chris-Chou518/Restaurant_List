const express = require('express')
const router = express.Router()

const restaurants = require('./restaurants')
const users = require('./users')

router.use(restaurants)
router.use(users)

router.get('/', (req, res) => {
  res.redirect('/Restaurants')
})

router.get('/Register',(req, res) => res.render('register'))

router.get('/Login',(req, res) => res.render('login'))

router.post('Login',(req, res) => {
  return res.send(req.body)
})

router.post('Logout',(req, res) => {
  return res.send(req.body)
})


module.exports = router