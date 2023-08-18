const express = require('express')
const {engine} =require('express-handlebars')
const app = express()
const port = 3000
const restaurants = require('./public/jsons/restaurant.json').results



app.engine('.hbs',engine({extname:'.hbs'}))
app.set('view engine', '.hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/Restaurants')
})

app.get('/Restaurants', (req, res) => {
  res.render('index',{restaurants: restaurants})
})

app.get('/Restaurant/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((rt) => rt.id.toString() === id)
  res.render('show',{restaurant})
})

app.listen(port, () =>{
  console.log(`Express server is on localhost:${port}`)
})