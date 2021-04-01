const {
  User,
  Post,
  Sequelize: { Op },
  sequelize,
} = require('./models/index');
// { User: userModel, Post: postModel, Sequelize: { Op: {...}}}

// findByPk
const findUserById = async (id) => {
  const user = await User.findByPk(id);
  console.log(user.toJSON());
};

// findUserById(2);
// findAll

const findPostsWithTitle = async (title) => {
  // querying for every post in our db
  // const posts = await Post.findAll();
  // console.log(posts.map((post) => post.toJSON()));
  // query for posts with specific title
  const posts = await Post.findAll({
    where: {
      title: {
        [Op.substring]: 'bread',
      },
    },
  });
  // const posts = await Post.findAll({
  //   where: {
  //     [Op.or]: [{ title: 'bread romance' }, { title: 'my best bread joke' }],
  //   },
  // });
  // clean up our output by converting post instances to POJOs
  console.log(posts.map((post) => post.toJSON()));
};

// findPostsWithTitle('bread romance');
// findOne
const findUserByEmail = async (email) => {
  const user = await User.findOne({ where: { email: { [Op.substring]: 'gmail' } }, order: [['id', 'DESC']] });
  console.log(user.toJSON());
};

findUserByEmail('gina@gmail.com');
