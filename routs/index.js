const express = require('express')
const router = express.Router()

const restaurants = require('./restaurants')
router.use(restaurants)

router.get('/', (req, res) => {
  res.redirect('/Restaurants')
})

module.exports = router