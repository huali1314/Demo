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
var COLOR = [
                cc.Color.WHITE,
                cc.Color.GRAY,
                cc.Color.GRAY,
                cc.Color.GREEN,
                cc.Color.BLUE,
                cc.Color.CYAN,
                cc.Color.YELLOW,
                cc.Color.ORANGE,
                cc.Color.RED,
                cc.Color.MAGENTA
            ]
var hardBulletFormConfig = require("hardBulletFormConfig").config
cc.Class({
    extends: cc.Component,
    properties: {
        velocityX:0,
        velocityY:0,
        decay:100,
        attackSpaceTime:200,
    },
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true;
        this.winSize = cc.director.getWinSize()
        this.node.setTag(commonData.TAG.bullet)
        this.curTime = 0
    },
    start () {
        this.bulletBaseInfo = this.node.getComponent("bulletBaseInfo")
        this.AudioEngine = this.node.getComponent("audioEngineController")
        this.bulletBaseInfo.hp = commonData.curBulletGear
        var childs = this.node.children
        for (var i = 0;i<childs.length;i++){
            childs[i].color = COLOR[this.bulletBaseInfo.hp]
        }
        var scale = hardBulletFormConfig[this.bulletBaseInfo.hp].scale
        var extraDamage = hardBulletFormConfig[this.bulletBaseInfo.hp].extraDamage
        this.bulletBaseInfo.damage += extraDamage
        this.node.scale = scale 
    },
    update (dt) {
        this.node.x += this.velocityX * dt
        this.node.y += this.velocityY * dt
        if(this.node.y > this.winSize.height || this.node.y < 0
            || this.node.x > this.winSize.width ||this.node.x < 0){
            this.node.destroy()
        }
    },
    updateBulletStatus(other){
        if (other && !other.node.isValid && !this.node.isValid){
            return
        }
        this.bulletBaseInfo.hp = (this.bulletBaseInfo.hp > 0)?(this.bulletBaseInfo.hp - 1):0
        var bulletHp = this.bulletBaseInfo.hp 
        if (bulletHp <= 0){
            this.node.destroy()
            return
        }
        var childs = this.node.children
        for (var i = 0;i<childs.length;i++){
            childs[i].color = COLOR[bulletHp]
        }
    },
    onCollisionEnter: function (other) {
        // cc.log("========onCollisionEnter===")
        this.updateBulletStatus(other)
        this.AudioEngine.play()
    },

    onCollisionStay: function (other) {
        var date = new Date();
        if (date.getTime() - this.curTime > this.attackSpaceTime){
            if (other && other.isValid){
            //     this.updateBulletStatus(other)
                this.AudioEngine.play()
            }
            // var volume = this.AudioEngine.getVolume() - 0.11
            // this.AudioEngine.setVolume(volume)
            this.curTime = date.getTime()
        }
    },

    onCollisionExit: function (other) {
        cc.log("========onCollisionExit===")
        // this.updateBulletStatus(other)
        this.velocityY -= this.decay
        // this.AudioEngine.play()
    }
});
