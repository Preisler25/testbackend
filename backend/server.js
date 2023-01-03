const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const path = require('path');
const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'test',
  user: 'postgres',
  password: 'admin'
});

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

client.connect();

const query = 'SELECT * FROM users';

client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res);
    const users = res.rows;
    console.log(users);
  }
});

app.get('/math', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'index.html'));});
app.get('/css', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'style.css'));});

app.post('/math', (req, res) => {
  user = createUser(req.body);
  res.redirect('/math');

  const query1 = 'INSERT INTO users (username, password) VALUES ($1, $2)';
  const values = [user.username, user.password];
  client.query(query1, values, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
});

  
});


app.listen(3000, () => {console.log('Server listening on port 3000');});

let createUser = (data) => {return new User(data.num1, data.num2);};
