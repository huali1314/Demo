module.exports = {
    GameState:cc.Enum({
        RUNNING: 0,
        PAUSE: 1,
        STOP:2,
    }),
    TAG:cc.Enum({
    	monster:9990,
    	player:9991,
    	buff:9992,
    	bullet:9993,
    }),
    curGameState:1,
    velocity:1,
    monsterProductionRate:2,
    buffProductionRate:10,
    curBulletGear:1,
    enemyKilled:0,
    damage:0,
};