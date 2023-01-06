//ws
const ws = new WebSocket('ws://localhost:8080');

//ws connection
ws.onopen = function () {
  ws.send('Hello Server!');
};

//activ ws
ws.onmessage = function (event) {
  switch (event.data.split(' ')[0]) {
    case "game":
        map = JSON.parse(event.data = event.data.split(' ')[1]);
        console.log(map);
        drawMap(map);
      break;
  
    default:
      break;
  }
};

//server erro ws
ws.onclose = function (event) {
    if (event.wasClean) {
        console.log('Connection closed cleanly');
    } else {
        console.log('Connection died');
    }
    console.log('Code: ' + event.code + ' reason: ' + event.reason);
};

//geting data from server
/*
fetch('/users')
.then(response => response.json())
.then(data => {
   console.log(data);
    const userListElement = document.getElementById('history');
    userListElement.innerHTML = '';

    data.forEach(user => {
    const userElement = document.createElement('div');
    userElement.innerHTML = `${user.username}`;
    userListElement.appendChild(userElement);
});
});
*/

//draw map
function drawMap(map) {
    const mapElement = document.getElementById('cont');
    mapElement.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            ij = String(i) + String(j);
            const tileElement = document.createElement('div');
            tileElement.innerHTML = `${map[ij]}`;
            mapElement.appendChild(tileElement);
        }
    }
}