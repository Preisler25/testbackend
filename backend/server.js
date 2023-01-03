const express = require('express');
const app = express();
const path = require('path');
const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'test',
  user: 'postgres',
  password: 'admin'
});

client.connect();


client.query('SELECT * FROM users', (err, res) => {
    console.log(err, res);
    client.end();
  });
  

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});