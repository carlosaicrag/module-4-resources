# Deeper into Data

- after the relational database design video, I usually pull up a schema design tool (quickdatabasediagrams.com) and have the students help me design a schema that we'll use for the breaddit project

### stages of relational database design

1. define the purpose/entities of the relational DB
2. identify primary keys
3. establish table relationships
4. apply normalization rules

### normalization

Normalization is the process of optimizing the database structure so that redundancy and confusion are eliminated.

### types of relationships

- one-to-one
- one-to-many
- many-to-many

### what is a transaction?

- single unit of work performed on a database
- can contain multiple operations
- an "all-or-nothing" operation

### transactional commands

- begin - begin transaction
- commit - commit / end transacation
- rollback - rollback to previous savepoint
- savepoint - creates savepoints
- set transaction - set characteristics of transaction

```sql
BEGIN;
INSERT INTO users(username, email)
VALUES (
```

### why use transactions?

- single "all-or-nothing" operations, no incomplete changes made to database
- users only see final result
- data is preserved through system crashes or failures
- savepoints/rollbacks let us revert to an earlier version if errors are made

## subqueries

- a select statement nested inside an outer select statement
- can return a single value or multiple rows

> In JOINs RDBMS can create an execution plan that is better for your query and can predict what data should be loaded to be processed and save time, unlike the sub-query where it will run all the queries and load all their data to do the processing.
The good thing in sub-queries is that they are more readable than JOINs: that's why most new SQL people prefer them; it is the easy way; but when it comes to performance, JOINS are better in most cases

```sql
select * from movies
where score > (
  select max(score)
  from movies
  where yr between 1980 and 1990)
  order by score desc;

select * from actors
join castings on castings.actor_id = actors.id
where castings.movie_id IN (
  select id
  from movies
  where title = 'Casablanca')
  
  
select actors.* from actors
join castings on castings.actor_id = actors.id
join movies on movies.id = castings.movie_id
where movies.title = 'Casablanca';
```

### EXPLAIN

- demonstrate the increased lookup efficiency after adding an index to one of the columns

```sql
explain analyze select * from actors where name = 'Nicolas Cage';

create index actor_name on actors (name);
drop index actor_name
```