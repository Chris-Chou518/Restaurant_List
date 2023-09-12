const express = require('express')
const router = express.Router()

const db = require('../models')
const Restaurant = db.Restaurant

//Read
router.get('/Restaurants', (req, res) => {
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
router.get('/Restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id,{
    raw:true
  })
  .then((restaurant) => {
    res.render('show', {restaurant}) 
  })
})

//Create
router.get('/Restaurants/one/new', (req, res) => {
 return res.render('new')
})
router.post('/Restaurants', (req, res) => {
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
router.get('/Restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findByPk(id,{
    raw:true
  })
  .then((restaurant) => res.render('edit',{restaurant}))
})
router.put('/Restaurants/:id', (req, res) => {
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
router.delete('/Restaurants/:id', (req,res) => {
  const id =req.params.id
  return Restaurant.destroy({where:{id}})
  .then(() => res.redirect('/Restaurants'))
})

module.exports = router
