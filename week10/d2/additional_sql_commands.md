# Data! Data! Data!

- Alec has been handling this lecture the past couple times through, but here's a list of all the commands we usually cover

### inserting

```sql
INSERT INTO users (username, email)
VALUES
('alec','alec@alec.com'),
('chris', 'chris@chris.com');
```

```sql
INSERT INTO tweets (body, user_id)
VALUES
('first tweet!', 1);
```

### updating

```sql
UPDATE users
SET username = 'alec123'
WHERE username = 'alec';
```

### deleting

```sql
DELETE FROM tweets
WHERE id = 1;
```

```sql
DELETE FROM users
WHERE id = 1;
```

### altering tables

```sql
ALTER TABLE users
ADD COLUMN likes_cheese boolean DEFAULT true;
```

### querying

```sql
SELECT *
FROM users
WHERE email = 'bakari@bakari.com';
```

### joining tables

```sql
SELECT *
FROM users
JOIN tweets on tweets.user_id = users.id;
```

```sql
SELECT *
FROM users
JOIN likes ON likes.user_id = users.id
JOIN tweets ON likes.tweet_id = tweets.id;
```