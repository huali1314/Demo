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
        velocityX:0,
        velocityY:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        this.winSize = cc.director.getWinSize()
        this.node.setTag(commonData.TAG.bullet)
    },

    start () {
        this.random_R = cc.random0To1() * 100 + 100
        this.random_G = cc.random0To1() * 100 + 100
        this.random_B = cc.random0To1() * 100 + 100
    },

    update (dt) {
        this.node.x += this.velocityX
        this.node.y += this.velocityY
        if(this.node.y > this.winSize.height || this.node.y < 0
            || this.node.x > this.winSize.width ||this.node.x < 0){
            this.node.destroy()
        }
        var temp = dt * 20
        this.node.color = cc.color(this.random_R + temp,this.random_G + temp,this.random_B + temp)
    },
    onCollisionEnter: function (other) {
        this.node.destroy()
    },

    // onCollisionStay: function (other) {
        
    // },

    // onCollisionExit: function () {
    //     this.node.color = cc.Color.WHITE;
    // }
});
