--NOTE: You must first create the user and database in psql, you can use these commands:
-- CREATE USER boardgame_app WITH CREATEDB;
-- CREATE DATABASE boardgame_db WITH OWNER boardgame_app;
--TO RUN THIS FILE, RUN THIS COMMAND IN YOUR TERMINAL (NOT IN PSQL):
-- psql -d boardgame_db < [path_to_file/file.sql]
-- EG for me it was psql -d boardgame_db < Desktop/sql_lecture.sql


--The order of these drops matters, we want to drop tables such that tables that
--rely on others are dropped first before the tables that are relied on.
DROP TABLE IF EXISTS lfg;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS boardgames;

--Create a boardgames table
create table boardgames
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    avg_rating NUMERIC(3, 2),
    max_players INTEGER,
    category VARCHAR(50)
);

--Create a players table
create table players
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    fave_category VARCHAR(255)
);
--This is a column we will add with a later command
-- prefers_video_games BOOLEAN DEFAULT false;

--Create a reviews table, two methods of declaring a foreign key are shown
CREATE TABLE reviews
(
    id SERIAL PRIMARY KEY,
    content TEXT,
    -- foreign key method 1
    boardgame_id INT REFERENCES boardgames(id)
    -- foreign key method 2
    -- boardgame_id INT,
    -- FOREIGN KEY (boardgame_id) REFERENCES boardgames
);


-- UPDATE table command
ALTER TABLE players ADD COLUMN prefers_video_games boolean default false;

--Add this looking-for-group table later in lecture when we begin talking about joins
-- create table lfg (
--     id SERIAL PRIMARY KEY,
--     game_id INTEGER,
--     player_id INTEGER,
--     FOREIGN KEY (game_id) REFERENCES boardgames,
--     FOREIGN KEY (player_id) REFERENCES players
-- );

--Seeds for the tables/Insert demo
INSERT INTO boardgames
    (name, avg_rating, max_players, category)
VALUES
    ('Gloomhaven', 8.8, 4, 'Adventure'),
    ('Pandemic Legacy: Season 1', 8.62, 4, 'Cooperative'),
    ('Brass: Birmingham', 8.66, 4, 'Economic'),
    ('Terraforming Mars', 8.43, 5, 'Economic'),
    ('Twilight Imperium: Fourth Edition', 8.7, 6, 'Strategy'),
    ('Spirit Island', 8.34, 4, 'Cooperative'),
    ('Mage Knight', 8.1, 4, 'Adventure'),
    ('Rising Sun', 7.88, 5, 'Strategy');

INSERT INTO players
    (name, fave_category, prefers_video_games)
VALUES
    ('Alec', 'Strategy', DEFAULT),
    ('Mitchell', 'Cooperative', DEFAULT),
    ('Chris', 'Adventure', DEFAULT),
    ('JM', 'Economic', DEFAULT),
    ('Tom', 'Strategy', DEFAULT),
    ('Bart', 'Economic', DEFAULT);

INSERT INTO reviews
    (content, boardgame_id)
VALUES
    ('There is nothing I love more than escaping one pandemic for another, 10/10', 2),
    ('This game is far too long!', 5),
    ('My friends and I really like this game, lots of replayability', 6),
    ('I can be a space pirate, favorite game hands down.', 5);

--Uncomment these seeds when the lfg table is added.  Discuss 'joins' tables.
-- INSERT INTO lfg (player_id, game_id)
-- VALUES
-- (1, 5),
-- (1, 2),
-- (3, 1),
-- (5, 5),
-- (2, 2),
-- (4, 4),
-- (6, 4),
-- (1, 4);

--ADDITIONAL TABLE ALTERING QUERY SAMPLES

--Update the players table to say Alec prefers video games (even though this is untrue)

-- UPDATE players
-- SET prefers_video_games = TRUE
-- WHERE name = 'Alec';

-- or 

-- UPDATE players
-- SET prefers_video_games = TRUE
-- WHERE name IN ('Alec', 'Chris');

--How to delete from tables

-- DELETE FROM boardgames
-- WHERE id = 3;

-- DELETE FROM boardgames
-- WHERE category IN ('Adventure', 'Economic');

--Adding a new entry to a table after our seed commands have been run

-- INSERT INTO boardgames (name, avg_rating, max_players, category)
-- VALUES
-- ('Scythe', 8.5, 5, 'Strategy');

-- BASIC QUERIES

--Getting all players and all information on the players table
-- SELECT * FROM players;

--Getting only the name of all boardgames in the Cooperative category
-- SELECT name FROM boardgames
-- WHERE category = 'Cooperative';

--Demonstrating doing mathematical operations on columns with a query to get the
--name and average rating as a percent (using aliasing for the column name) of
--boardgames with a rating > 8.5.  This query should be written and discussed in
--steps, not all in one go.
-- SELECT name, (avg_rating * 10) as percent_rating FROM boardgames
-- WHERE avg_rating > 8.5;

--Demonstrating the BETWEEN keyword
-- SELECT name FROM boardgames
-- WHERE avg_rating BETWEEN 8.3 AND 8.65;

--Demonstrating a query using a foreign key
-- SELECT content FROM reviews
-- WHERE boardgame_id = 5;

--Demonstrating a query using WHERE NOT and a second WHERE condition
-- SELECT name, category FROM boardgames
-- WHERE NOT category = 'Adventure'
-- AND avg_rating > 8.5;

--Demonstrating a more complex query using a NOT IN list and demonstrating the
--LIMIT operator
-- SELECT name, category FROM boardgames
-- WHERE category NOT IN ('Adventure', 'Economic')
-- AND avg_rating > 8.5
-- LIMIT 2;

--Demonstrating queries using the LIKE operator and the % match operator
-- SELECT name FROM boardgames
-- WHERE name LIKE 'T%';

-- SELECT content FROM reviews
-- WHERE content LIKE '%love%'
-- OR content LIKE '%like%';

--Demonstrating using the ORDER BY operator
-- SELECT name FROM players
-- ORDER BY name DESC;

-- SELECT name FROM boardgames
-- WHERE category = 'Strategic'
-- ORDER BY avg_rating DESC;


-- THESE QUERIES MUST BE RUN WITH THE LFG TABLE CREATED AND SEEDED

--Demonstrating an inner join, also showing the need to use tableName.columnName
-- SELECT name, boardgames.id, reviews.boardgame_id, reviews.content 
-- FROM boardgames
-- JOIN reviews ON (boardgames.id = reviews.boardgame_id);

--At this point also demonstrate what various outer joins look like using
--postbird/psql

--Demonstrating a join and adding more complexity.  At this point mention the 
--order of SQL operations (ie, it's not top to bottom!  Note with order at bottom)
-- SELECT boardgames.name, boardgames.id, reviews.boardgame_id, reviews.content 
-- FROM boardgames
-- JOIN reviews ON (boardgames.id = reviews.boardgame_id)
-- WHERE avg_rating > 8.5
-- ORDER BY name DESC;

--Demonstrating a more complex join using the lfg join table
-- SELECT players.name, players.id, lfg.player_id, lfg.game_id, boardgames.id, boardgames.name
-- FROM players
-- JOIN lfg ON (players.id = lfg.player_id)
-- JOIN boardgames ON (lfg.game_id = boardgames.id)
-- WHERE boardgames.name = 'Terraforming Mars'
-- ORDER BY players.name ASC;

--SQL QUERY ORDER OF OPERATIONS
-- 1 FROM
-- 2 WHERE
-- 3 GROUP BY
-- 4 HAVING
-- 5 SELECT
-- 6 ORDER BY
-- 7 LIMIT
-- Note students do not use GROUP BY or HAVING for any projects, so they are not covered