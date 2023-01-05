//express server
const express = require('express');
const app = express();
app.listen(3000, () => {console.log('Server listening on port 3000');});

//com
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const path = require('path');

//pg
const { Client } = require('pg');
const client = new Client({host: 'localhost',port: 5432,database: 'test',user: 'postgres',password: 'admin'});
client.connect();

//ws
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

//users
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

//HTTP GET
app.get('/math', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'index.html'));});
app.get('/css', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'style.css'));});
app.get('/js', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'app.js'));});
app.get('/users', async(req, res) => {rows = await getUsers();res.send(rows);});

//HTTP POST
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
  }});
});


//func test
let createUser = (data) => {return new User(data.num1, data.num2);};
async function getUsers() {res = await client.query('SELECT * FROM users'); return res.rows;}


//Game
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
  ws.send('Alma');
  ws.send('Korte');
});
