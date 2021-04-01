const { User, sequelize } = require('./models/index');

const updateEmail = async (newEmail) => {
  // update property directly, then call .save
  // findByPk queries for specific user based on their ID
  // const user = await User.findByPk(3);
  // console.log(user.toJSON());
  // user.email = newEmail;
  // await user.save();
  // call the update class method
  await User.update({ email: newEmail }, { where: { username: 'justLoafin' } });
  // update instance method
  const user = await User.findByPk(3);
  await user.update({ email: newEmail, username: 'justLance' });
};

updateEmail('lancebakesbread@hotmail.com');
