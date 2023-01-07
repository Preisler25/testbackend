class Enemy{
    constructor(hp, dmg){
        this.hp = hp;
        this.dmg = dmg;
    }
    toString(){
        return "E";
    }
}
class Player{
    constructor(hp, dmg){
        this.hp = hp;
        this.dmg = dmg;
    }
    toString(){
        return "P";
    }
}

function moveUp(map, isAlive) {
    let playerPos = getUserCord(map);
    let playerX = playerPos[0];
    let playerY = playerPos[1];
    let playerXY = playerPos[0] + playerPos[1];
    let newPlayerPos = String(playerX) + String(parseInt(playerY) + 1);
    if (map[newPlayerPos] == 0) {
        map[newPlayerPos] = map[playerXY];
        map[playerXY] = 0;
    }
    if (map[newPlayerPos] instanceof Enemy) {
        map[playerXY] = 0;
        isAlive = false;
    }
    return map, isAlive;
}

function moveDown(map, isAlive) {
    let playerPos = getUserCord(map);
    let playerX = playerPos[0];
    let playerY = playerPos[1];
    let playerXY = playerPos[0] + playerPos[1];
    let newPlayerPos = String(playerX) + String(parseInt(playerY) - 1);
    if (map[newPlayerPos] == 0) {
        map[newPlayerPos] = map[playerXY];
        map[playerXY] = 0;
    }
    if (map[newPlayerPos] instanceof Enemy) {
        map[playerXY] = 0;
        isAlive = false;
    }
    return map, isAlive;
}

function moveLeft(map, isAlive) {
    let playerPos = getUserCord(map);
    let playerX = playerPos[0];
    let playerY = playerPos[1];
    let playerXY = playerPos[0] + playerPos[1];
    let newPlayerPos = String(parseInt(playerX) - 1) + String(playerY);
    if (map[newPlayerPos] == 0) {
        map[newPlayerPos] = map[playerXY];
        map[playerXY] = 0;
    }
    if (map[newPlayerPos] instanceof Enemy) {
        map[playerXY] = 0;
        isAlive = false;
    }
    return map, isAlive;
}

function moveRight(map, isAlive) {
    let playerPos = getUserCord(map);
    let playerX = playerPos[0];
    let playerY = playerPos[1];
    let playerXY = playerPos[0] + playerPos[1];
    let newPlayerPos = String(parseInt(playerX) + 1) + String(playerY);
    if (map[newPlayerPos] == 0) {
        map[newPlayerPos] = map[playerXY];
        map[playerXY] = 0;
    }
    if (map[newPlayerPos] instanceof Enemy) {
        map[playerXY] = 0;
        isAlive = false;
    }
    return map, isAlive;
}

function moveEnemys(map, isAlive) {
    for (let key in map) {
        let rand = Math.floor(Math.random() * 4);
        if (map[key] instanceof Enemy) {
            let enemyX = key[0];
            let enemyY = key[1];
            let enemyXY = key[0] + key[1];
            let newEnemyPos = "";
            switch (rand) {
                case 0:
                    newEnemyPos= String(parseInt(enemyX) + 1) + String(enemyY);
                    break;
                case 1:
                    newEnemyPos= String(parseInt(enemyX) - 1) + String(enemyY);
                    break;
                case 2:
                    newEnemyPos= String(enemyX) + String(parseInt(enemyY) + 1);
                    break;
                case 3:
                    newEnemyPos= String(enemyX) + String(parseInt(enemyY) - 1);
                    break;
            }
            if (map[newEnemyPos] == 0) {
                map[newEnemyPos] = map[enemyXY];
                map[enemyXY] = 0;
            }
            if (map[newEnemyPos] instanceof Player) {
                map[newEnemyPos] = map[enemyXY];
                map[enemyXY] = 0;
                isAlive = false;
            }
        }
    }
    return map, isAlive;
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

function getUserCord(map) {
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
    let x = Math.floor(Math.random() * Math.floor(xmax/2));
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

module.exports = {startGame, getEnemyCord, getUserCord, moveDown, moveUp, moveLeft, moveRight, moveEnemys};