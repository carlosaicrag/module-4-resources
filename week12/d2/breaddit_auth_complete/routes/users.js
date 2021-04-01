const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const {asyncHandler} = require('./utils')
const {User} = require('../models')

router.get('/register', asyncHandler(async (req, res) => {
  res.render('register')
}))

router.post('/', asyncHandler(async (req, res) => {
  const {username, email, password} = req.body
  // hash the user's password before saving it to the db
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({username, email, hashedPassword})
  // we effectively log the user in by setting property on req.session
  req.session.user = {id: user.id, username: user.username}
  res.redirect('/')
}))

router.get('/login', asyncHandler(async (req, res) => {
  res.render('login')
}))

router.post('/login', asyncHandler(async (req, res) => {
  const {email, password} = req.body
  // attempt to validate user's password
  const user = await User.findOne({where: { email }})
  const isPassword = await bcrypt.compare(password, user.hashedPassword)
  // if valid password, we log the user in
  if (isPassword) {
    req.session.user = {id: user.id, username: user.username}
    res.redirect('/')
  } else {
    // otherwise we re-render the login form with errors
    res.render('login', {errors: 'Invalid login credentials'})
  }
}))

router.post('/logout', asyncHandler(async (req, res) => {
  // log user out by deleting user property on req.session object
  delete req.session.user
  res.redirect('/users/login')
}))

module.exports = router