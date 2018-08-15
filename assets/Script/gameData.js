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
    monsterProductionRate:0.5,
    buffProductionRate:4,
};