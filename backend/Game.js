class Enemy{
    constructor(hp, dmg){
        this.hp = hp;
        this.dmg = dmg;
    }
}
class Player{
    constructor(hp, dmg){
        this.hp = hp;
        this.dmg = dmg;
    }
}

function moveUp(map) {
    let playerPos = getPlayerPos(map);
    let playerX = playerPos[0];
    let playerY = playerPos[1];
    let playerXY = playerPos[0] + playerPos[1];
    let newPlayerPos = String(playerX) + String(playerY + 1);
    if (map[newPlayerPos] == 0) {
        map[newPlayerPos] = map[playerXY];
        map[playerXY] = 0;
    }
    return map;
}

function moveDown(map) {
    let playerPos = getPlayerPos(map);
    let playerX = playerPos[0];
    let playerY = playerPos[1];
    let playerXY = playerPos[0] + playerPos[1];
    let newPlayerPos = String(playerX) + String(playerY - 1);
    if (map[newPlayerPos] == 0) {
        map[newPlayerPos] = map[playerXY];
        map[playerXY] = 0;
    }
    return map;
}

function moveLeft(map) {
    let playerPos = getPlayerPos(map);
    let playerX = playerPos[0];
    let playerY = playerPos[1];
    let playerXY = playerPos[0] + playerPos[1];
    let newPlayerPos = String(playerX - 1) + String(playerY);
    if (map[newPlayerPos] == 0) {
        map[newPlayerPos] = map[playerXY];
        map[playerXY] = 0;
    }
    return map;
}

function moveRight(map) {
    let playerPos = getPlayerPos(map);
    let playerX = playerPos[0];
    let playerY = playerPos[1];
    let playerXY = playerPos[0] + playerPos[1];
    let newPlayerPos = String(playerX + 1) + String(playerY);
    if (map[newPlayerPos] == 0) {
        map[newPlayerPos] = map[playerXY];
        map[playerXY] = 0;
    }
    return map;
}

function getEnemyCord(map) {
    let enemys = "";
    for (let key in map) {
        if (map[key] instanceof Enemy) {
            enemys += key + ",";
        }
    }
    return enemys;
}

function getPlayerPos(map) {
    let player = "";
    for (let key in map) {
        if (map[key] instanceof Player) {
            player += key;
        }
    }
    return player;
}
    
function startGame() {
    gameMap = GenMap(8, 8);
    gameMap = GenEnemys(5, 8, 8, gameMap);
    return gameMap;
}

function GenMap(xmax, ymax) {
    tempMap = {};
    for (let x = 0; x < xmax; x++) {
        for (let y = 0; y < ymax; y++) {
            let xy = String(x) + String(y);
            tempMap[xy] = 0;
        }
    }
    return tempMap;
}

function GenEnemys(num, xmax, ymax, gameMap) {
    let is_valid = false;
    let x = Math.floor(Math.random() * xmax);
    let y = Math.floor(Math.random() * ymax);
    enemys_needed = num;

    gameMap["00"] = new Player(100, 10);

    while (!is_valid) {
        let xy = String(x) + String(y);
        if (gameMap[xy] == 0) {
            gameMap[xy] = new Enemy(100, 10);
            enemys_needed--;
        } else {
            x = Math.floor(Math.random() * xmax);
            y = Math.floor(Math.random() * ymax);
        }
        if (enemys_needed == 0) {
            is_valid = true;
        }   
    }
    return gameMap;
}

module.exports = {startGame, getEnemyCord, getPlayerPos, moveDown, moveUp, moveLeft, moveRight};