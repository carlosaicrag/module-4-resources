# subqueries

- a select statement nested inside an outer select statement
- can return a single value or multiple rows

> In JOINs RDBMS can create an execution plan that is better for your query and can predict what data should be loaded to be processed and save time, unlike the sub-query where it will run all the queries and load all their data to do the processing.
The good thing in sub-queries is that they are more readable than JOINs: that's why most new SQL people prefer them; it is the easy way; but when it comes to performance, JOINS are better in most cases

* use subqueries
  * returning a single value 
  * checking when a value is in a list of values
* use joins
  * getting data from multiple tables on a match condition

```sql
select * from actors
join castings on castings.actor_id = actors.id
where castings.movie_id IN (
  select id
  from movies
  where title = 'Casablanca');
  
  
select actors.* from actors
join castings on castings.actor_id = actors.id
join movies on movies.id = castings.movie_id
where movies.title = 'Casablanca';


```
# Deeper into Data

- after the relational database design video, I usually pull up a schema design tool (quickdatabasediagrams.com) and have the students help me design a schema that we'll use for the breaddit project

# stages of relational database design

1. define the purpose/entities of the relational DB
2. identify primary keys
3. establish table relationships
4. apply normalization rules

# normalization

Normalization is the process of optimizing the database structure so that redundancy and confusion are eliminated.

# types of relationships

- one-to-one
- one-to-many
- many-to-many

* set expectations that we will not be talking about associations today but if they got far enough in the project they will see it. 
# let's design our backend

## users
| Column Name | Data Type |
|-------------|-----------|
| id          | integer   |
| username    | string    |
| email       | string    |
| avatar_url  | string    |
## posts 
| Column Name | Data Type |
|-------------|-----------|
| id          | integer   |
| userId      | integer   |
| subId       | integer   |
| title       | string    |
| body        | string    |
| image_url   | string    |

## subbreaddit 
| Column Name | Data Type |
|-------------|-----------|
| id          | integer   |
| name        | string    |
| sidebar     | text      |
# starting the breaddit app

* npm install sequelize@^5.0.0
* npm install sequelize-cli@^5.0.0
* npm install pg@^8.0.0

---

# Initializing Sequelize 
* npx sequelize init
  * will make the folder structure that you see below 
  * the npx tool allows you to easily run scripts provided by packages like sequelize-cli
  * install it with npm install npx --global

``` 
├── config
│   └── config.json
├── migrations
├── models
│   └── index.js
├── node_modules
├── package-lock.json
├── package.json
└── seeders
```
---

# Review postgres commands 
* \l - show all databases 
* psql -W -U <user> <database>
  * connect to a database with a certain user
* \du list all user accounts
* SELECT FROM... queries

---

# Let's create a user in our database that will be allowed to access our database 
1. let's go into postgres database by typing psql postgres
  * this allowed us to go into the postgres database
  * If you dont type something after psql then it will try to go into a database with the same name as your user. if there isn't a database is postgres that has the same name as your user then you will receive an error.
2. type in the command below and remember to use  single quotes!

```sql

CREATE USER breaddit_user
WITH
PASSWORD 'strong_password'
SUPERUSER;

```
* when you are a super user you can do whatever you want! YOU HAVE THE POWER
* by default on mac your user might be set to be a super user already
---

# sequelize-cli 
* what the heck is it?
* draw picture showing what sequlize-cli is
# Let's create a database that our breaddit app will use using sequelize-cli
npx sequelize-cli db:create
* This should create a database named with what you put in the config file

---

# Verifying that Sequelize connected to database

* create index.js at the top level
* will verify if sequelize connected to databasee
├── index.js
├── config
│   └── config.json
├── migrations
├── models
│   └── index.js
├── node_modules
├── package-lock.json
├── package.json
└── seeders

```js
const { sequelize } = require("./models");

async function main() {
  try {
    await sequelize.authenticate();
  } catch (e) {
    console.log("Database connection failure.");
    console.log(e);
    return;
  }

  console.log("Database connection success!");
  console.log("Sequelize is ready to use!");

  // Close database connection when done with it.
  await sequelize.close();
}

main();
```
---

# Creating our first model
* notice in psql that the Users table is not there.  What we are about to do is create a model and then create Users table after we migrate

```js

npx sequelize model:generate --name User --attributes "username:string, email:string,age:integer"

```
* You should now see a new file within the models folder that looks like the code below 

```js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar_url: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
```
# migrations
* a log of the way you're database has changed over time.  
* You can type the command `npx sequelize-cli db:migrate` and it will create a new table in the breaddit database called `Users`.

# Examine migration file that was created up/down
* up method has code that updates things attributes about our database.
  * for example you can create tables, update columns, remove columns etc...
* down method undos what the up method did

# adding some seed data to the Users table with sequelize-cli

* command 
  * `npx sequelize-cli seed:generate --name AddUserSeeds`

* after running the above command you should see that a new file was created within the seeder folder.  You can now insert data into your Users table
```js
// code...
return queryInterface.bulkInsert("Users",[{
        email:"banana@gmail.com",
        username:"bananasAreGreat"
      }])
// code...
```
* you also have to make sure that you write corresponding down function 
```js
return queryInterfaceBulkDelete("Users", null, {})
```
# Let's fetch some data using the user model
in index.js update the code to fetch a user

```js
const { sequelize , User } = require("./models");

async function main() {
  try {
    await sequelize.authenticate();
  } catch (e) {
    console.log("Database connection failure.");
    console.log(e);
    return;
  }

  console.log("Database connection success!");
  console.log("Sequelize is ready to use!");

  const user = await User.findByPk(1);
  console.log(user.toJSON());

  // you can also access the attributes of a user using dot notation
  const user = await User.findByPk(1);
  console.log(`${user.firstName} has been assigned id #${user.id}.`);
  console.log(`They are ${user.age} years old.`)
  console.log(`Their special skill is ${user.specialSkill}.`);

  // You can change the attributes of a user. You just have to make sure that you use the .save api
  user.firstName = "Curie";
  user.specialSkill = "jumping";
  user.age = 123;

  await user.save()
  await sequelize.close();
}

main();

```


