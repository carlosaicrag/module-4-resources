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
  
├── config
│   └── config.json
├── migrations
├── models
│   └── index.js
├── node_modules
├── package-lock.json
├── package.json
└── seeders

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

```psql

CREATE USER breaddit_user
WITH
PASSWORD 'strong_password'
SUPERUSER;

```
* when you are a super user you can do whatever you want! YOU HAVE THE POWER
* by default on mac your user might be set to be a super user already
---

# Let's create a database that our breaddit app will use



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

