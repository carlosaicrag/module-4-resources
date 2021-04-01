const express = require('express');
const bcrypt = require('bcryptjs');
const bearerToken = require('express-bearer-token');
const { User } = require('../models');
const { generateUserToken, requireAuth } = require('../auth');
const router = express.Router();

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.use(express.json());
router.use(bearerToken());

router.post(
  '/',
  asyncHandler(async (req, res) => {
    // create a new user
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, hashedPassword });
    // generate a token to send in our response
    const token = generateUserToken(user);
    res.json({ token, user: { id: user.id, username: user.username } });
  })
);

// create a protected route

router.get('/currentUser', requireAuth, (req, res) => {
  // send a json response with the current user

  res.json({ currentUser: res.locals.user });
});

// frontend js

const form = document.getElementById('some-form')

form.addEventListener('submit', (e) => {
  // do some things
  const formData = new FormData(form)
  const email = formData.get('email')
  const username = formData.get('username')
  const password = formData.get('password')
  const body = {email, username, password}
  const res = await fetch('/users', {
    method: 'POST',
    body: JSON.stringify(body)
  })
  const data = await res.json()
  localStorage.setItem('auth-token', data.token)
})

const res = await fetch('/users/currentUser', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
  }
})


module.exports = router;
