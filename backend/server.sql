CREATE TABLE users (id SERIAL PRIMARY KEY,username VARCHAR(50) NOT NULL,password VARCHAR(50) NOT NULL);
CREATE TABLE rounds (id SERIAL PRIMARY KEY, userid INT NOT NULL, userspos VARCHAR(50) NOT NULL, enemyspos VARCHAR(50) NOT NULL);
CREATE TABLE board (userid INT NOT NULL, maxpoint INT NOT NULL);