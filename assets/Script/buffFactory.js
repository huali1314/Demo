// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var commonData = require("gameData")
cc.Class({
    extends: cc.Component,

    properties: {
        buffs: {
            // ATTRIBUTES:
            default: [],        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Prefab, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.productionRate = commonData.buffProductionRate
        this.curTime = 0
        this.half_Screen_width = cc.director.getWinSize().width/2
        this.half_Screen_height = cc.director.getWinSize().height/2
    },

    update (dt) {
        var date = new Date()
        var second = date.getTime()/1000
        if (second - this.curTime > this.productionRate){
            this.curTime = second
            var random_idx = Math.floor(cc.random0To1() * 2)
            var random_X = cc.random0To1()*(this.half_Screen_width * 2 - 30) - this.half_Screen_width
            var curbuff = this.buffs[random_idx]
            var buff = cc.instantiate(curbuff)
            buff.setPositionX(random_X)
            buff.setPositionY(this.half_Screen_height + 30)
            this.node.addChild(buff)
        }
    },
});
