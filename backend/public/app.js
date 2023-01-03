fetch('/users')
.then(response => response.json())
.then(data => {
    console.log(data);
    const userListElement = document.getElementById('history');
    userListElement.innerHTML = '';

    data.forEach(user => {
    const userElement = document.createElement('div');
    userElement.innerHTML = `${user.name}`;
    userListElement.appendChild(userElement);
});
});