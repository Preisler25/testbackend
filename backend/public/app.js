const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function () {
  ws.send('Hello Server!');
};

ws.onmessage = function (event) {
  console.log(event.data);
};

ws.onclose = function (event) {
    if (event.wasClean) {
        console.log('Connection closed cleanly');
    } else {
        console.log('Connection died');
    }
    console.log('Code: ' + event.code + ' reason: ' + event.reason);
};
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