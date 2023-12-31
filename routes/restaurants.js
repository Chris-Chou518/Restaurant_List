const express = require('express')
const router = express.Router()

const db = require('../models')
const restaurant = require('../models/restaurant')
const Restaurant = db.Restaurant

//Read
router.get('/', (req, res, next) => {
  const keywords = req.query.keyword || req.query.category
  const userId =  req.user.id

  return Restaurant.findAll({
    where: { userId },
    raw:true
  }
  )
  .then((restaurants) => {
    return keywords ? restaurants.filter(rt => rt.name.includes(keywords) || rt.category.includes(keywords) ) : restaurants
  })
  .then((restaurant) => {
    res.render('index',{restaurants: restaurant, keywords})
  })
  .catch(() => {
    error.errorMessage = '資料取得失敗'
    next(error)
  })
})
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  const userId =req.user.id
  return Restaurant.findByPk(id,{
    raw:true
  })
  .then((restaurant) => {
    if (!restaurant) {
      req.flash('error', '找不到資料')
      return res.redirect('/Restaurants')
    }
    if (restaurant.userId !== userId) {
      req.flash('error', '權限不足')
      return res.redirect('/Restaurants')
    }
    res.render('show', {restaurant}) 
  })
  .catch((error) => {
    error.errorMessage = '資料取得失敗'
    next(error)
  })
})

//Create
router.get('/one/new', (req, res) => {
 return res.render('new')
})
router.post('/', (req, res, next) => {
  const body =req.body
  const userId = req.user.id
  return Restaurant.create({
    name: body.name,
    name_en: body.name_en,
    category:body.category,
    image:body.image,
    location:body.location,
    phone: body.phone,
    google_map: body.google_map,
    rating: body.rating,
    description:body.description,
    userId: userId
  })
  .then(() => {
    req.flash('success', '新增成功')
    return res.redirect('/Restaurants')
  })
  .catch((error) => {
    error.errorMessage = '新增失敗'
    next(error)
  })   
})

//Update
router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id
  const userId = req.user.id
  return Restaurant.findByPk(id,{
    raw:true
  })
  .then((restaurant) => {
    if (!restaurant) {
      req.flash('error', '找不到資料')
      return res.redirect('/Restaurants')
    }
    if (restaurant.userId !== userId) {
      req.flash('error', '權限不足')
      return res.redirect('/Restaurants')
    }    
    req.flash('success', '更新成功')
    return res.render('edit',{restaurant})
  })
  .catch((error) => {
    error.errorMessage = '更新失敗'
    next(error)
  })
})
router.put('/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id
  const userId = req.user.id
  return Restaurant.findByPk(id)
    .then((restaurant) => {
      if (!restaurant) {
        req.flash('error', '找不到資料')
        return res.redirect('/Restaurants')
      }
      if (restaurant.userId !== userId) {
        req.flash('error', '權限不足')
        return res.redirect('/Restaurants')        
      }
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
          .then(() => {
            req.flash('success', '更新成功')
            return res.redirect(`/Restaurants/${id}`)
           })
        })
    .catch((error) => {
      error.errorMessage = '更新失敗'
      next(error)
    })
})

//Delete
router.delete('/:id', (req, res, next) => {
  const id =req.params.id
  const userId = req.user.id 

  return Restaurant.findByPk(id)
    .then((restaurant) => {
      if (!restaurant) {
        req.flash('error', '找不到資料')
        return res.redirect('/Restaurants')
      }
      if (restaurant.userId !== userId) {
        req.flash('error', '權限不足')
        return res.redirect('/Restaurants')        
      }
      return Restaurant.destroy({where:{id}})
      .then(() => {
        req.flash('success', '刪除成功')
        res.redirect('/Restaurants')
      })
    })
    .catch((error) => {
      error.errorMessage = '刪除失敗'
      next(error)    
    })
})

module.exports = router
