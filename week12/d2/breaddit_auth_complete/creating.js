const { User, Post, Subbreaddit } = require('./models/index');

const addUser = async (userObj) => {
  const user = await User.create(userObj);
  console.log(user.toJSON());
};

addUser({ username: 'bart2', password: 'whoo', email: 'bart2@bart.com' });


// const usersArr = [{username, ...}]

// usersArr.forEach(user => {
//   addUser(user)
// })