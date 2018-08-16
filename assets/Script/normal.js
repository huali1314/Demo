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

    // properties: {
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
    // },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.childs = this.node.children
        this.maxNum = this.childs.length
        this.maxGear = (this.maxNum + 1)/2
        this.changeBulletNum()
    },
    changeBulletNum:function() {
        var curGear = commonData.curBulletGear
        var limitGear = (curGear >= this.maxGear)?this.maxGear:curGear
        for (var i = 1;i <= this.maxNum;i++ ){
            if (i <= (1 + (limitGear - 1) * 2)){
                this.node.getChildByName("normalBullet" + i).active = true
            }else{
                 this.node.getChildByName("normalBullet" + i).active = false
            }
        }
    },
});
