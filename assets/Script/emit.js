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
        bullets: {
            // ATTRIBUTES:
            default: [],        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Prefab, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        emitRate:0.2
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.curTime = 0
        this.winSize = cc.director.getWinSize()
        this.bulletIdx = commonData.curBulletIdx
    },
    updateBullet(){
        this.bulletIdx = commonData.curBulletIdx
    },
    update (dt) {
        if (commonData.curGameState == commonData.GameState.RUNNING){
            var date = new Date();
            if (date.getTime()/1000 - this.curTime > this.emitRate){
                var curBullet = this.bullets[this.bulletIdx]
                if (curBullet){
                    var bullet = cc.instantiate(curBullet)
                    // bullet.setParent(this.node)
                    var parent = this.node.getParent()
                    bullet.setPosition(parent.getPositionX(),parent.getPositionY() + 45)
                    parent.getParent().addChild(bullet)
                    // bullet.destroy()
                }
                this.curTime = date.getTime()/1000
            }
        }
    },
});
