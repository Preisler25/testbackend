//express server
const express = require('express');
const app = express();
app.listen(3000, () => {console.log('Server listening on port 3000');});

//cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//com
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));

//pg
const { Client } = require('pg');
const client = new Client({host: 'localhost',port: 5432,database: 'test',user: 'postgres',password: 'admin'});
client.connect();

//ws
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

//game
const game = require('./game');
const { json } = require('express');
const { clearInterval } = require('timers');

//users
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

//HTTP GET
app.get('/', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'game.html'));});
app.get('/math', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'index.html'));});
app.get('/css', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'style.css'));});
app.get('/cssG', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'game.css'));});
app.get('/js', (req, res) => {res.sendFile(path.join(__dirname, 'public', 'app.js'));});
app.get('/users', async(req, res) => {rows = await getUsers();res.send(rows);});

//HTTP POST
app.post('/reg', (req, res) => {
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
  let ingame = false;
  let map = game.startGame();
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    if (message == 'ready') {
      ws.send('game ' + JSON.stringify(map));
      ingame = true;
      let enemys_pos = game.getEnemyCord(map)
      let users_pos = game.getUserCord(map)

      //pg seveing
      const query1 = 'INSERT INTO rounds (userid, userspos, enemyspos) VALUES ($1, $2, $3)';
      const values = [1, users_pos, enemys_pos];
      client.query(query1, values, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }});
    } 

    else if (String(message).split(' ')[0] == 'move') {
      let move = String(message).split(' ')[1];
      switch(move){
        case 'up':
          map = game.moveUp(map);
          break;
        case 'down':
          map = game.moveDown(map);
          break;
        case 'left':
          map = game.moveLeft(map);
          break;
        case 'right':
          map = game.moveRight(map);
          break;
      }
    }
    if (ingame) {
      setInterval(() =>{
        game.moveEnemys(map);
        ws.send('game ' + JSON.stringify(map));
      }, 200);
    ingame = false;
    }
  });
});


//func test