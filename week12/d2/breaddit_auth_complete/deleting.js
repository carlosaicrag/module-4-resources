const { User, Post } = require('./models/index');

const deleteUserById = async (id) => {
  // class destroy method
  // await User.destroy({ where: { id } });

  // instance destroy method
  const user = await User.findByPk(id);
  await user.destroy();
};

deleteUserById(3);
