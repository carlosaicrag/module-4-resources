# Hello Database

# RDMS

- program that allows you to create, update, and administer a relational database
- can contain any number of databases
- ex: PostgreSQL (what we will be using)

# Database

- collection of interrelated tables with relevant data for a given application / service
- ex: twitter_lite_dev

# Table

- Made up of a specific set of columns which specify the type of data, and rows which hold the actual data
- ex: users


# creating database entities

1. create a new user using psql
2. create a new database

# helpful psql commands:

- \l - list out all databases
- \du - list out all users
- \dt -list tables for current database
- \d *tableName -* list table columns

# Let's create a user in our database that will be allowed to access our database 
1. let's go into postgres database by typing psql postgres
  * this allowed us to go into the postgres database
  * If you dont type something after psql then it will try to go into a database with the same name as your user. if there isn't a database is postgres that has the same name as your user then you will receive an error.
2. type in the command below and remember to use  single quotes!

```sql
CREATE USER app_academy
WITH
PASSWORD 'strong_password'
SUPERUSER;

```
* when you are a super user you can do whatever you want! YOU HAVE THE POWER
* by default on mac your user might be set to be a super user already

# drop user

```sql
drop user app_academy;
```

create database

```sql
create database app_academy_test;
```

# create database with an owner 
* First create a new user 
* now create a new database with an owner

```sql
create database banana with owner banana
```
* If you dont put an owner then you then it will default to whoever you're signed in as

# creating a table

```sql
create table people (
	id serial primary key,
	first_name varchar(30),
	last_name varchar(30),
	age smallint
);
```

# creating a table with a foreign key

```sql
create table pets (
	id serial primary key,
	name varchar(255),
	age smallint,
	person_id integer references people (id)
);
```

foreign keys are the relational database way of connecting a number of related tables together, while avoiding duplicate data in individual tables

* Show case postbird