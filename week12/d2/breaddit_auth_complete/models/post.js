'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      userId: DataTypes.INTEGER,
      subId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      image_url: DataTypes.STRING,
    },
    {}
  );
  Post.associate = function (models) {
    // associations can be defined here

    // many side 
    Post.belongsTo(models.User, { foreignKey: 'userId' });
    Post.belongsTo(models.Subbreaddit, { foreignKey: 'subId' });
    //  const post = await Post.findByPk(2, {include: User})
    // {title: 'blah',..., User: {username: 'bart', ...}}
  };
  return Post;
};
