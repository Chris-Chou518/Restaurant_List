const express = require('express')
const {engine} =require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results
const db = require('./models')
const Restaurant = db.Restaurant

app.engine('.hbs',engine({extname:'.hbs'}))
app.set('view engine', '.hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  // res.redirect('/Restaurants')
  return Restaurant.findAll()
    .then((restaurants) => res.send({restaurants}))
    .catch((err) => res.status(422).json(err))
})

app.get('/Restaurants', (req, res) => {
  const keywords = req.query.keyword
  const restaurant = keywords ? restaurants.filter(rt => 
    rt.name.includes(keywords) || rt.category.includes(keywords)
    ) : restaurants
  res.render('index',{restaurants: restaurant, keywords})
})

app.get('/Restaurant/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((rt) => rt.id.toString() === id)
  res.render('show',{restaurant})
})

app.listen(port, () =>{
  console.log(`Express server is on localhost:${port}`)
})