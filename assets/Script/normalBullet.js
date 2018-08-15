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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        velocityX:20,
        velocityY:30,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        this.winSize = cc.director.getWinSize()
        this.node.setTag(commonData.TAG.bullet)
    },

    // start () {
    // },

    update (dt) {
        var random_R = cc.random0To1() * 100
        var random_G = cc.random0To1() * 100
        var random_B = cc.random0To1() * 100
        this.node.x += this.velocityX
        this.node.y += this.velocityY
        if(this.node.y > this.winSize.height){
            this.node.getParent().destroy()
        }
        this.node.color = cc.color(random_R + dt,random_G + dt,random_B + dt)
    },
    onCollisionEnter: function (other) {
        this.node.color = cc.Color.RED;
        // this.touchingNumber ++;
        // cc.log(this.touchingNumber);
    },

    onCollisionStay: function (other) {
        // console.log('on collision stay');
    },

    onCollisionExit: function () {
        // this.touchingNumber --;
        // cc.log(this.touchingNumber);
        // if (this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        // }
    }
});
