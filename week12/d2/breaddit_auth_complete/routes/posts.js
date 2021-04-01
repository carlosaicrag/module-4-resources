const express = require('express');
const router = express.Router();
const { Post, Subbreaddit } = require('../models');

router.use((req, res, next) => {
  console.log('in the posts router');
  next();
});

router.use((req, res, next) => {
  if (!res.locals.user) {
    return res.redirect('/users/login')
  }
  next()
})


router.get('/new', async (req, res) => {
  const subs = await Subbreaddit.findAll();
  res.render('new-post', { subs });
});

router.post('/', async (req, res) => {
  // create new post
  console.log(req.body);
  const { subId, title, body } = req.body;
  // here we use the currently logged in user's id when creating the new post
  const post = await Post.create({ subId, title, body, userId: res.locals.user.id });
  res.redirect('/');
});

module.exports = router;
