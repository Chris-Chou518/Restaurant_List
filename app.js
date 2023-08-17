const express = require('express')
const {engine} =require('express-handlebars')
const app = express()
const port = 3000

app.use(express.static('public'))

app.engine('hbs',engine({extname:'hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.redirect('/Restaurants')
})

app.get('/Restaurants', (req, res) => {
  res.render('index')
})

app.get('/Restaurant/:id', (req, res) => {
  const id = req.params.id
  res.send(`read restaurant: ${id}`)
})

app.listen(port, () =>{
  console.log(`Express server is on localhost:${port}`)
})