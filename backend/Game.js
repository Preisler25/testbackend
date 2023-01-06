class Enemy{
    constructor(x, y, hp, dmg){
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.dmg = dmg;
    }
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

    while (!is_valid) {
        let xy = String(x) + String(y);
        if (gameMap[xy] == 0) {
            gameMap[xy] = new Enemy(x, y, 100, 10);
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

module.exports = {startGame};