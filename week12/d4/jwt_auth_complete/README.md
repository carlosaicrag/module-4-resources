## JWT Demo Setup Instructions
1. `npm install`
2. in `psql` run `create user jwt_test with password 'password' createdb;`
3. `npx sequelize db:create`
4. `npx sequelize db:migrate`
5. `npm start`