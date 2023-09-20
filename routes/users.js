const express = require('express')
const router = express.Router()

const db = require('../models')
const User = db.User

router.post('/users',(req, res, next) => {
  const {name, email, password, confirmPassword} = req.body
  if (!email || !password) {
    req.flash('error', 'email或password為必填')
    return res.redirect('back')
  }
  if  (password !== confirmPassword) {
    req.flash('error', '驗證密碼與密碼不符')
    return res.redirect('back')
  }
  return User.count({where: {email}})
    .then((rowCount) => {
      if (rowCount > 0) {
        req.flash('error', 'email已註冊')
        return 
      }      
      return User.create({ email, password, name })
    })
    .then((user) => {
      if (!user) {return res,redirect('back')}
      req.flash('success', '註冊成功')
      return res.redirect('/Login')
    })
    .catch((error) => {
      error.errorMessage = '註冊失敗'
      next(error)
    })



})

module.exports = router