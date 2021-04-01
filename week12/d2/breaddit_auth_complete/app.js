const express = require('express');
const app = express();
const session = require('express-session')
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users')
const { Post, User, Subbreaddit } = require('./models/index');
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));
app.use(session({secret: 'superSecret'}))


function logReqData(req, res, next) {
  console.log('METHOD ----', req.method);
  console.log('PATH -----', req.path);
  next();
}

// application-wide middleware
// app.use(logReqData);

app.use((req, res, next) => {
  req.likesBananas = true;
  console.log('in the bananas middleware');
  next();
});

// on every request, we set res.locals.user to make it easily accessible inside of our templates
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next()
})

app.use('/posts', postsRouter);
app.use('/users', usersRouter)


app.get('/', logReqData, async (req, res, next) => {
  // we should have access to likesBananas property from above middleware
  console.log('does like bananas?', req.likesBananas);
  // res.send('<h1>this is express, awesome!</h1>');
  try {
    let posts = await Post.findAll({ include: User });
    res.render('index', { posts, title: 'breaddit' });
  } catch (e) {
    next(e);
  }
});

app.get('/subbreaddits', async (req, res) => {
  try {
    const subs = await Subbreaddit.findAll();
    const likesBananas = true;
    res.render('subbreaddits', { subs, title: 'subbreaddits', likesBananas });
  } catch (e) {
    console.log(e);
  }
});

app.get('/subbreaddits/:id(\\d+)', async (req, res) => {
  console.log(req.params);
  const subId = req.params.id;
  // const subIdInt = parseInt(req, 10)
  const sub = await Subbreaddit.findByPk(subId, { include: Post });
  // sub = {name: 'jokes', sidebar: 'something', Posts: [{'title': ...}]}
  res.render('subbreaddit', { sub, title: sub.name });
  // res.send('testing sub route');
});

app.get('/bananas', (req, res) => {
  res.send('<h1>this is the banana route</h1>');
});

app.listen(8080, () => console.log('listening on 8080, nice!'));
