const { User, Post, Subbreaddit } = require('./models/index');

const getUserAndPosts = async (userId) => {
  // lazy-loading
  const user = await User.findByPk(userId);
  // getPosts method provided by sequelize due to association we set up
  // const userPosts = await user.getPosts();
  // console.log('user', user.toJSON());
  // console.log(
  //   'posts',
  //   userPosts.map((post) => post.toJSON())
  // );

  // eager-loading -- querying for a user and all of their posts
  const userAndPosts = await User.findByPk(userId, { include: Post });
  // { id: 1, username: ..., email: ..., createdAt: ... Posts: [{id: 2, body: ...}]}
  console.log('user object', userAndPosts.toJSON());
  console.log('user posts', userAndPosts.Posts);

  // eager-loading, multi-level include...query for user, their posts, and the posts subbreaddit
  const userPostsSubs = await User.findAll({
    where: {
      username: 'bob_the_baker',
    },
    include: { model: Post, include: Subbreaddit },
  });
  // { id: 1, username: ..., email: ..., createdAt: ... Posts: [{id: 2, body: ..., Subbreaddit: {id: ...} }]}
  console.log(userPostsSubs[0].toJSON());
  const userPosts = userPostsSubs[0].Posts;
  const postSub = userPosts[0].Subbreaddit;
  console.log('subbreaddit', postSub);
};

getUserAndPosts(1);
