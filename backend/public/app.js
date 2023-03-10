//ws
const ws = new WebSocket('ws://192.168.1.199:8080');

//socket
    let socket = io();

//ws connection
ws.onopen = function () {
  ws.send('ready');
};

//activ ws
ws.onmessage = function (event) {
  switch (event.data.split(' ')[0]) {
    case "game":
        map = JSON.parse(event.data = event.data.split(' ')[1]);
        drawMap(map);
      break;
    case "over":
        console.log(event.data);
  
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
    for (let j = 7; -1 < j; j--) {
        for (let i = 0; i < 8; i++) {
            ij = String(i) + String(j);
            const tileElement = document.createElement('div');
            if (map[ij] == 0) {
                tileElement.innerHTML = '';       
            }
            else{
                const newimg = `<img src="${map[ij].src}" alt style="width: 100px; height: 100px;">`;
                tileElement.innerHTML = newimg;
            }
            mapElement.appendChild(tileElement);
            
        }
    }
}


addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            ws.send('move up');
            break;
        case 'ArrowDown':
            ws.send('move down');
            break;
        case 'ArrowLeft':
            ws.send('move left');
            break;
        case 'ArrowRight':
            ws.send('move right');
            break;
        case 'w':
            ws.send('fire up');
            break;
        case 's':
            ws.send('fire down');
            break;
        case 'a':
            ws.send('fire left');
            break;
        case 'd':
            ws.send('fire right');
            break;
        default:
            break;
    }
});