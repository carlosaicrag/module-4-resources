# Crud Operations with sequelize

- before the start of this lecture, make sure that you create seeds for the post and subb termianreaddit tables

- make sure that you unmigrate, remigrate, unseed, reseed
---

# Creating a new record

- in main.js file

```js
const { sequelize, User } = require("./models");

async function main() {
  // Constructs an instance of the JavaScript `User` class. **Does not
  // save anything to the database yet**. Attributes are passed in as a
  // POJO.
  const user = User.build({
    username: "carlosaicrah",
    email: "carlos@banana.com",
    age: 5,
  });

  // This actually creates a new `Users` record in the database. We must
  // wait for this asynchronous operation to succeed.
  await user.save();

  console.log(user.toJSON());

  await sequelize.close();
}

main();
```

- When creating a record, you can avoid the two step process of (1) creating a Cat instance and (2) calling the save instance method. You can do a one step process of calling the create class

```js
const { sequelize, User } = require("./models");

async function main() {
  const user = await User.create({
    username: "carlosaicrag",
    email: "carlos@gmail.com",
    age: 10
  });

  console.log(user.toJSON());

  await sequelize.close();
}

main();
```

---

# Reading A Record By Primary Key

```js
const { sequelize, User } = require("./models");

async function main() {
  // Fetch the user with id #1.
  const User = await User.findByPk(1);
  console.log(user.toJSON());

  await sequelize.close();
}

main();
```

---

# Updating A Record

```js
const { sequelize, User } = require("./models");

async function main() {
  const user = await User.findByPk(1);

  console.log(user.toJSON());

  // The Cat object is modified, but the corresponding record in the
  // database is *not* yet changed at all.
  user.username = "banana";
  // Only by calling `save` will the data be saved.
  await user.save();

  console.log(user.toJSON());

  await sequelize.close();
}

main();
```

---

# Destroying A Record

```js
const process = require("process");

const { sequelize, User } = require("./models");

async function main() {
  const user = await User.findByPk(1);
  // Remove the user record.
  await user.destroy();

  await sequelize.close();
}

main();
```

```js
const { sequelize, User } = require("./models");

async function main() {
  // Destroy the User record with id #3.
  await User.destroy({ where: { id: 3 } });

  await sequelize.close();
}

main();
```

---
# findAll()

```js
const { sequelize, User } = require("./models");

async function main() {
  // `findAll` asks to retrieve _ALL_ THE CATS!!  An array of `Cat`
  // objects will be returned.
  const users = await User.findAll();

  // Log the fetched cats.
  // giving a 3rd argument to JSON.stringify will pretty-print the result with the specified spacing. (We pass null as the 2nd argument to skip it.)
  console.log(JSON.stringify(users, null, 2));

  await sequelize.close();
}

main();
```

# findAll({where: {}})

```js
const { sequelize, User } = require("./models");

async function main() {
  // Fetch all cats named Markov.
  const users = await User.findAll({
    where: {
      username: "carlos",
    },
  });
  console.log(JSON.stringify(users, null, 2));

  await sequelize.close();
}

main();
```

---

# findAll({where: {}}) OR

```js
const { sequelize, User } = require("./models");

async function main() {
  // Fetch all cats named Markov or Curie.
  const users = await User.findAll({
    where: {
      username: ["carlos", "alec"], // if I wanted to get all users who have usernames Markov OR Curie
    },
  });
  console.log(JSON.stringify(users, null, 2));

  await sequelize.close();
}

main();
```

---

# Using findAll To Find Objects Not Matching A Criterion

[sequelize operators](https://sequelize.org/v5/manual/querying.html#operators)

- sequelize operators are used to make more complex operations

```js
const { sequelize, User } = require("./models");

async function main() {
  // fina all users whos username is not "Markov"
  const users = await User.findAll({
    where: {
      firstname: {
        // Op.ne means the "not equal" operator.
        [Op.ne]: "banana",
      },
    },
  });
  console.log(JSON.stringify(users, null, 2));

  await sequelize.close();
}

main();
```

---

# Combining Criteria with Op.and

```js
const { Op } = require("sequelize");
const { sequelize, User } = require("./models");

async function main() {
  const users = await db.User.findAll({
    where: {
      // here we are grouping an array of queries to say that all these criteria must be satified in order for us to grab a certain user from our database
      [Op.and]: [
        { firstName: { [Op.ne]: "banana" } },
        { email: "carlos@gmail.com" },
      ],
    },
  });
  console.log(JSON.stringify(users, null, 2));

  await sequelize.close();
}

main();
```

---

# Combining Criteria with Op.or

```js
const { Op } = require("sequelize");
const { sequelize, User } = require("./models");

async function main() {
  // fetch users with username == Markov OR age = 4.
  const users = await User.findAll({
    where: {
      [Op.or]: [{ userName: "Markov" }, { age: 10000 }],
    },
  });
  console.log(JSON.stringify(users, null, 2));

  await sequelize.close();
}

main();
```

---

# Querying With Comparisons

```js
const { Op } = require("sequelize");
const { sequelize, User } = require("./models");

async function main() {
  // Fetch all users whose age is > 4.
  const users = await User.findAll({
    where: {
      age: { [Op.gt]: 4 },
    },
  });
  console.log(JSON.stringify(users, null, 2));

  await sequelize.close();
}

main();
```

# Ordering Results

```js
const { sequelize, User } db = require("./models");

async function main() {
  const users = await User.findAll({
    order: [["age", "DESC"]],
  });
  console.log(JSON.stringify(users, null, 2));

  await sequelize.close();
}

main();
```

# Limiting Results and findOne

## limiting results

```js
const { sequelize, User } = require("./models");

async function main() {
  const users = await User.findAll({
    order: [["age", "DESC"]],
    limit: 1,
  });
  console.log(JSON.stringify(users, null, 2));

  await sequelize.close();
}

main();
```

## findOne

```js
const { Op } = require("sequelize");
const { sequelize, User } = require("./models");

async function main() {
  const user = await User.findOne({
    where: {
      age: { [Op.gt]: 4 },
    },
  });
  console.log(JSON.stringify(user, null, 2));

  await sequelize.close();
}

main();
```

---

# Validations

---

# Validating That An Attribute Is Not NULL

- we don't want to save a user that doesnt have a username or an email
- we're going to change our model for user a little
- right now it should like the code below

```js
"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      age: DataTypes.Integer,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
```

- we're going to change it up so that we can add some validations to the user model

```js
"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        //makes sure that the type of anything in this column is a string
        type: DataTypes.STRING,
        //makes sure that there are never any null values
        allowNull: false,
        validate: {
          //if the validation is ever not fulfilled than i will display a custom message
          notNull: {
            msg: "firstName must not be null",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "firstName must not be null",
          },
        },
      },
      age: {
        type: DataTypes.Integer,
        allowNull: false,
      },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
```

- let's try it out

```js
const { sequelize, User } = require("./models");

async function main() {
  const user = User.build({
    // Empty cat. All fields set to `null`.
  });

  try {
    // Try to save cat to the database.
    await user.save();

    console.log("Save success!");
    console.log(JSON.stringify(user, null, 2));
  } catch (err) {
    console.log("Save failed!");

    // Print list of errors.
    for (const validationError of err.errors) {
      console.log("*", validationError.message);
    }
  }

  await sequelize.close();
}

main();
```

- let's fix it

```js
// index.js
const { sequelize, User } = require("./models");

async function main() {
  const user = User.build({
    // Empty cat. All fields set to `null`.
  });

  try {
    await user.save();
  } catch (err) {
    // The save will not succeed!
    console.log("We will fix and try again!");
  }

  // Fix the various validation problems.
  user.username = "Markov";
  user.age = 4;

  try {
    // Trying to save a second time!
    await user.save();

    console.log("Success!");
  } catch (err) {
    // The save *should* succeed!
    console.log(err);
  }

  await sequelize.close();
}

main();
```

---

# The notEmpty Validation

- right now we can't save null as an attribute but we can save an empty string
- let's fix that by adding to our model

```js
"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        //makes sure that the type of anything in this column is a string
        type: DataTypes.STRING,
        //makes sure that there are never any null values
        allowNull: false,
        validate: {
          //if the validation is ever not fulfilled than i will display a custom message
          notNull: {
            msg: "firstName must not be null",
          },
          notEmpty: {
            msg: "username cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "firstName must not be null",
          },
          notEmpty: {
            msg: "email cannot be empty",
          },
        },
      },
      age: {
        type: DataTypes.Integer,
        allowNull: false,
      },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
```

- go ahead and test it like we did in the previous example

---

# Forbidding Long String Values

```js
"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        //makes sure that the type of anything in this column is a string
        type: DataTypes.STRING,
        //makes sure that there are never any null values
        allowNull: false,
        validate: {
          //if the validation is ever not fulfilled than i will display a custom message
          notNull: {
            msg: "firstName must not be null",
          },
          notEmpty: {
            msg: "username cannot be empty",
          },
          len: {
            args: [0, 8],
            msg: "firstName must not be more than eight letters long",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "firstName must not be null",
          },
          notEmpty: {
            msg: "email cannot be empty",
          },
          len: {
            args: [0, 25],
            msg: "firstName must not be more than eight letters long",
          },
        },
      },
      age: {
        type: DataTypes.Integer,
        allowNull: false,
      },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
```

- go ahead and test like before

---

# Validating That A Numeric Value Is Within A Specified Range

```js
"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        //makes sure that the type of anything in this column is a string
        type: DataTypes.STRING,
        //makes sure that there are never any null values
        allowNull: false,
        validate: {
          //if the validation is ever not fulfilled than i will display a custom message
          notNull: {
            msg: "firstName must not be null",
          },
          notEmpty: {
            msg: "username cannot be empty",
          },
          len: {
            args: [0, 8],
            msg: "firstName must not be more than eight letters long",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "firstName must not be null",
          },
          notEmpty: {
            msg: "email cannot be empty",
          },
          len: {
            args: [0, 25],
            msg: "firstName must not be more than eight letters long",
          },
        },
      },
      age: {
        type: DataTypes.Integer,
        allowNull: false,
        validate: {
          notNull: {
            msg: "age must not be null",
          },
          min: {
            args: [0],
            msg: "age must not be less than zero",
          },
          max: {
            args: [99],
            msg: "age must not be greater than 99",
          },
        },
      },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
```

- test like before

---

# Validating That An Attribute Is Among A Finite Set Of Values

- we've added a validation to the username column

```js
"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        //makes sure that the type of anything in this column is a string
        type: DataTypes.STRING,
        //makes sure that there are never any null values
        allowNull: false,
        validate: {
          //if the validation is ever not fulfilled than I will display a custom message
          notNull: {
            msg: "firstName must not be null",
          },
          notEmpty: {
            msg: "username cannot be empty",
          },
          len: {
            args: [0, 8],
            msg: "firstName must not be more than eight letters long",
          },
          isIn: {
            args: [["carlosaicrag", "banana", "papaya"]],
            msg: "username must be either carlosaicrag, banana or papaya",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "firstName must not be null",
          },
          notEmpty: {
            msg: "email cannot be empty",
          },
          len: {
            args: [0, 25],
            msg: "firstName must not be more than eight letters long",
          },
        },
      },
      age: {
        type: DataTypes.Integer,
        allowNull: false,
        validate: {
          notNull: {
            msg: "age must not be null",
          },
          min: {
            args: [0],
            msg: "age must not be less than zero",
          },
          max: {
            args: [99],
            msg: "age must not be greater than 99",
          },
        },
      },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
```

# Associations

- post model

```js
"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      userId: DataTypes.INTEGER,
      subId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {}
  );
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: "userId" });
    Post.belongsTo(models.Subbreaddit, { foreignKey: "subId" });
  };
  return Post;
};
```

- user model

```js
"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      age: DataTypes.INTEGER,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here

    User.hasMany(models.Post, { foreignKey: "userId" });

    const columnMapping = {
      through: "Post",
      otherKey: "subId",
      foreignKey: "userId",
    };

    User.belongsToMany(models.Subbreaddit, columnMapping);
  };
  return User;
};
```

- associations file

```js
const { Post, Subbreaddit, User, sequelize } = require("./models");

async function queryPetsTypesAndOwners() {
  const post = await Post.findByPk(1, { include: [User, Subbreaddit] });
  console.log(
    post.userId,
    post.subId,
    post.title,
    post.body,
    post.imageUrl,
    post.User,
    post.Subbreaddit
  );

  const user = await User.findByPk(1, { include: [Post] });

  console.log(user.Posts);
}

queryPetsTypesAndOwners();
```
