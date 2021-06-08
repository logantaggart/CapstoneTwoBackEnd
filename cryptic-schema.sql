CREATE TABLE users
(
    username VARCHAR(25),
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE watchlist
(
    username TEXT NOT NULL,
    name TEXT NOT NULL,
    price FLOAT NOT NULL,
    market_cap FLOAT NOT NULL,
    volume FLOAT NOT NULL,
    date TIMESTAMP NOT NULL,
    currency TEXT NOT NULL
)
