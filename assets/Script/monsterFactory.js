var commonData = require("gameData")
cc.Class({
    extends: cc.Component,

    properties: {
        monsters: {
            // ATTRIBUTES:
            default: [],        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Prefab, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.productionRate = commonData.monsterProductionRate
        this.curTime = 0
        this.half_Screen_width = cc.director.getWinSize().width/2
        this.half_Screen_height = cc.director.getWinSize().height/2
    },

    update (dt) {
        var date = new Date()
        var second = date.getTime()/1000
        if (second - this.curTime > this.productionRate){
            this.curTime = second
            var random_idx = Math.floor(cc.random0To1() * 3)
            var random_X = cc.random0To1()*(this.half_Screen_width * 2 - 30) - this.half_Screen_width
            var curMonster = this.monsters[random_idx]
            var monster = cc.instantiate(curMonster)
            monster.setPositionX(random_X)
            monster.setPositionY(this.half_Screen_height + 30)
            this.node.addChild(monster)
        }
    },
});
