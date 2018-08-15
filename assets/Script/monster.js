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
        particleBoom: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Prefab, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.setTag(commonData.TAG.monster)
        this.screen_sz = cc.director.getWinSize()
        this.monsterBaseInfo = this.node.getComponent("monsterBaseInfo")
        this.velocity = this.monsterBaseInfo.velocity
    },

    update (dt) {
        if (this.node.y < -this.screen_sz.height/2){
            this.node.destroy()
        }else{
            this.node.y -= this.velocity
        }
    },
    onCollisionEnter: function (other) {
        var bulletBaseInfo = other.node.getComponent("bulletBaseInfo")
        if (bulletBaseInfo == null || this.monsterBaseInfo == null || !other.node.isValid){
            return
        }
        var damage = bulletBaseInfo.damage
        if (this.monsterBaseInfo.hp <= 0){
            var boom = cc.instantiate(this.particleBoom)
            boom.setPosition(this.node.getPosition())
            this.node.getParent().addChild(boom)
            this.node.destroy()
        }else{
            var leftHp = this.monsterBaseInfo.hp - damage
            this.monsterBaseInfo.hp = leftHp > 0?leftHp:0
        }
    },
});
