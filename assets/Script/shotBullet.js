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
        velocityY:24,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.setTag(commonData.TAG.bullet)
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        this.winSize = cc.director.getWinSize()
        this.random_R = cc.random0To1() * 100
        this.random_G = cc.random0To1() * 100
        this.random_B = cc.random0To1() * 100
    },

    // start () {
    // },

    update (dt) {
        this.node.x += this.velocityX
        this.node.y += this.velocityY
        if(this.node.y > this.winSize.height){
            this.node.destroy()
        }
        var num = dt * 10
        this.node.color = cc.color(this.random_R + num,this.random_G + num,this.random_B + num)
    },
    onCollisionEnter: function (other) {
        this.node.destroy()
    },

    // onCollisionStay: function (other) {
    //     // console.log('on collision stay');
    // },

    // onCollisionExit: function (other) {
        
    // }
});
