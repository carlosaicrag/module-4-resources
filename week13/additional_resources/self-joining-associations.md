# Self-Joining Association
When you have a table that joins to itself through a joins table, IE a follower feature where the Users table joins to itself to track followers, the User model will need a belongsToMany association from itself to itself.  We use two such associations so that we can query from both "directions", IE all the users following one user, or all of the users one other user is following.

## Associations

```
const columnMappingOne = { // User -> User, through Follow as follower
      through: 'Follow',
      otherKey: 'followingId',
      foreignKey: 'followerId',
      as: 'followings'
    }
const columnMappingTwo = { // User -> User, through Follow as following
      through: 'Follow',
      otherKey: 'followerId',
      foreignKey: 'followingId',
      as: 'followers'
    }
User.belongsToMany(models.User, columnMappingOne);
User.belongsToMany(models.User, columnMappingTwo);
```

## Queries
This should get all of the users following the user whose userId you pass in
```
const user = await User.findByPk(userId, {
    include: [{
        model: User,
        as: 'followers'
    }]
}
```

This should get all users that the user with an id of userId is following
```
const user = await User.findByPk(userId, {
    include: [{
        model: User,
        as: 'followings'
    }]
}
```

Both queries result in a User object with a nested array of relevant users.