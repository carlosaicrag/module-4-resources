# Hello Database

### RDMS

- program that allows you to create, update, and administer a relational database
- can contain any number of databases
- ex: PostgreSQL

### Database

- collection of interrelated tables with relevant data for a given application / service
- ex: twitter_lite_dev

### Table

- Made up of a specific set of columns which specify the type of data, and rows which hold the actual data
- ex: users

bring up an example database in postbird to look at tables and different types of columns

## creating database entities

1. create a new user using psql
2. create a new database
3. create users table
4. create posts table

create user with superuser permissions and password

```sql
create user app_academy with superuser password 'password';
```

drop user

```sql
drop user app_academy;
```

create database

```sql
create database app_academy_test;
```

helpful psql commands:

- \l - list out all databases
- \du - list out all users
- \dt -list tables for current database
- \d *tableName -* list table columns

create table

```sql
create table people (
	id serial primary key,
	first_name varchar(30),
	last_name varchar(30),
	age smallint
);
```

table with foreign key

```sql
create table pets (
	id serial primary key,
	name varchar(255),
	age smallint,
	person_id integer references people (id)
);
```

foreign keys are the relational database way of connecting a number of related tables together, while avoiding duplicate data in individual tables