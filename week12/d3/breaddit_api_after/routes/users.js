const express = require("express")
const router = express.Router()
const csrf = require('csurf')
const {User} = require("../models")
const bcrypt = require("bcrypt")
const {asyncHandler} = require("./util")

const loginReq = (req,res,next) => {
  
  if (req.session.user){    
    res.redirect("/")    
  }else{
    next()
  }
  
}

router.get("/signup", async (req,res) => {
  res.render("signup")
})

router.post("/signup", asyncHandler( async (req,res) => {
  const {email, password, username} = req.body

  const hashedPW = await bcrypt.hash(password,10)
  const user = await User.create({email,hashedPW,username})

  req.session.user = {id: user.id, email: user.email, username:user.username}
  res.redirect("/")
}))

router.get("/login", async (req,res) => {
  res.render("login")
})

router.post("/login", asyncHandler( async (req,res) => {
  const {username, password} = req.body
  debugger
  const user = await User.findOne({where: {username}})
  const isPassword = await bcrypt.compare(password, user.hashedPW)

  if (isPassword){
    req.session.user = {id: user.id, username: user.username}
    res.redirect("/")
  }else{
    res.render("login")
  }

}))

module.exports = router