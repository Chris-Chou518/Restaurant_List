const express = require('express')
const {engine} =require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const port = 3000
// const restaurants = require('./public/jsons/restaurant.json').results

const db = require('./models')
// const { raw } = require('mysql2')
const Restaurant = db.Restaurant

app.engine('.hbs',engine({extname:'.hbs'}))
app.set('view engine', '.hbs')
app.set('views','./views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.redirect('/Restaurants')
  //測試與mysql連線與seeder匯入
  // return Restaurant.findAll()                          
  //   .then((restaurants) => res.send({restaurants}))
  //   .catch((err) => res.status(422).json(err))
})
//Read
app.get('/Restaurants', (req, res) => {
  // const keywords = req.query.keyword
  // const restaurant = keywords ? restaurants.filter(rt => 
  //   rt.name.includes(keywords) || rt.category.includes(keywords)
  //   ) : restaurants
  // res.render('index',{restaurants: restaurant, keywords})
  //從json資料導入改成由資料庫導入資料
  const keywords = req.query.keyword
  return Restaurant.findAll(
    {raw:true}
  )
  .then((restaurants) => {
    return keywords ? restaurants.filter(rt => rt.name.includes(keywords) || rt.category.includes(keywords) ) : restaurants
  })
  .then((restaurant) => {
    res.render('index',{restaurants: restaurant, keywords})
  })
})
app.get('/Restaurants/:id', (req, res) => {
  // const id = req.params.id
  // const restaurant = restaurants.find((rt) => rt.id.toString() === id)
  // res.render('show',{restaurant})
  //從json資料導入改成由資料庫操作
  const id = req.params.id
  return Restaurant.findByPk(id,{
    raw:true
  })
  .then((restaurant) => {
    res.render('show', {restaurant}) 
  })
})

//Create
app.get('/Restaurants/one/new', (req, res) => {
 return res.render('new')
})
app.post('/Restaurants', (req, res) => {
  const body =req.body
  return Restaurant.create({
    name: body.name,
    name_en: body.name_en,
    category:body.category,
    image:body.image,
    location:body.location,
    phone: body.phone,
    google_map: body.google_map,
    rating: body.rating,
    description:body.description
  })
  .then(() => {res.redirect('/Restaurants')})   
})

//Update
app.get('/Restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id,{
    raw:true
  })
  .then((restaurant) => res.render('edit',{restaurant}))
})
app.put('/Restaurants/:id', (req, res) => {
  const body = req.body
  const id = req.params.id
  return Restaurant.update({
    name: body.name,
    name_en: body.name_en,
    category:body.category,
    image:body.image,
    location:body.location,
    phone: body.phone,
    google_map: body.google_map,
    rating: body.rating,
    description:body.description
},{where:{id:id}})
  .then(() => res.redirect(`/Restaurants/${id}`))
})

//Delete
app.delete('/Restaurants/:id', (req,res) => {

})


app.listen(port, () =>{
  console.log(`Express server is on localhost:${port}`)
})