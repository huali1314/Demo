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
var magazine = require("magazine")
var normalBulletFormConfig = require("normalBulletFormConfig")
cc.Class({
    extends: cc.Component,

    properties: {
        // player:{
        //     default:null,
        //     type:cc.Node,
        //     serializable: true,
        // },
        canvas:{
            default:null,
            type:cc.Node,
            serializable:true,
        },
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

    onLoad () {
        this._initTouchEvent()
    },

    start () {
        this.curTime = 0
        this.winSize = cc.director.getWinSize()
        this.playerSize = this.node.getContentSize()
        this.halfPlayerWidth = this.playerSize.width/2
        this.halfPlayerHeight = this.playerSize.height/2
        this.leftBorder = -this.winSize.width/2 + this.halfPlayerWidth
        this.rightBorder = this.winSize.width/2 - this.halfPlayerWidth
        this.topBorder = this.winSize.height/2 - this.halfPlayerHeight
        this.bottomBorder = -this.winSize.height/2 + this.halfPlayerHeight
        this.node.setTag(commonData.TAG.player)
        this.node.setLocalZOrder(9998)
        this.playerBaseInfo = this.node.getComponent("playerBaseInfo")
        this.bulletIdx = this.playerBaseInfo.curBulletIdx
        this.updateBullet()
    },
    // updateGear(){
    //     var curGear = commonData.curBulletGear
    //     this.maxGear = this.playerBaseInfo.maxBulletGear
    //     this.limitGear = (curGear > this.maxGear)?this.maxGear:curGear
    // },
    resetGear(){
        commonData.curBulletGear = 1
    },
    updateBullet(){
        this.bulletType = this.playerBaseInfo.curBulletType
        // this.updateGear()
        switch(this.bulletType){
            case magazine.MagazineType.NORMAL:
                this.updateNormalBulletFormData()
                break
            case magazine.MagazineType.SHOT:
                // this.bulletFormData = this.updateNormalBulletFormData()
                break
        }
    },
    update (dt) {
        if (commonData.curGameState == commonData.GameState.RUNNING){
            var date = new Date();
            if (date.getTime()/1000 - this.curTime > this.emitRate){
                var curBullet = this.bullets[this.bulletType]
                if (curBullet){
                    this.updateBulletResolution(this.bulletType,curBullet)
                }
                this.curTime = date.getTime()/1000
            }
        }
    },
    normalBulletResoultion(bullet){
        for (var i = 0;i < this.bulletFormData.length;i++){
            var bullet = cc.instantiate(bullet)
            var bullet_S = bullet.getComponent("normalBullet")
            bullet_S.velocityX = this.bulletFormData[i].velocityX
            bullet_S.velocityY = this.bulletFormData[i].velocityY
            var rotation = this.bulletFormData[i].rotation
            if (this.bulletFormData[i].random){
                rotation += cc.random0To1() * this.bulletFormData.random
            }
            bullet.setRotation(rotation)
            var parent = this.node.getParent()
            bullet.setPosition(this.node.x + this.winSize.width/2,this.node.y + this.winSize.height/2 + 45)
            parent.getParent().addChild(bullet)
        }
    },
    //散弹
    shotBulletResolution(bullet){

    },
    //激光
    lightBulletResolution(bullet){

    },
    //追踪弹
    traceBulletResolution(bullet){

    },
    //火焰弹
    fireBulletResolution(bullet){

    },
    //根据子弹类型更新子弹处理函数
    updateBulletResolution(bulletType,curBullet){
        switch(bulletType){
            case magazine.MagazineType.NORMAL:
                this.normalBulletResoultion(curBullet)
                break
            case magazine.MagazineType.SHOT:
                this.shotBulletResolution(curBullet)
                break
            case magazine.MagazineType.LIGHT:
                this.lightBulletResolution(curBullet)
                break
            case magazine.MagazineType.TRACE:
                this.traceBulletResolution(curBullet)
                break
            case magazine.MagazineType.FIRE:
                this.fireBulletResolution(curBullet)
                break
        }
    },
    updateNormalBulletFormData(){
        this.bulletFormData = normalBulletFormConfig.config[commonData.curBulletGear - 1]
        switch(commonData.curBulletGear){
            case 1:
                this.emitRate = 0.2
                break
            case 2:
                this.emitRate = 0.2
                break
            case 3:
                this.emitRate = 0.15
                break
            case 4:
                this.emitRate = 0.15
                break
            case 5:
                this.emitRate = 0.15
                break
            case 6:
                this.emitRate = 0.15
                break
            case 7:
                this.emitRate = 0.15
                break
            case 8:
                this.emitRate = 0.15
                break
            case 9:
                this.emitRate = 0.1
                break
            case 10:
                this.emitRate = 0.15
                break
        }
    },

    _initTouchEvent: function () {
        var self = this;
    // cc.log("_initTouchEvent")
        self.canvas.on(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, self._touchMoveEvent, self);
 
    },
     _touchStartEvent: function (event) {
        if (!cc.rectContainsPoint(this.node.getBoundingBoxToWorld(), event.getLocation())) {
            this.touchPlayer = false
            return
        }
        this.touchPlayer = true
        // 记录触摸的世界坐标，给touch move使用
        this._touchLocation = event.getLocation();
        var touchPos = this.canvas.convertToNodeSpaceAR(event.getLocation());
        // 更改玩家位置
        this.node.setPosition(touchPos)
    },
 
    _touchMoveEvent: function (event) {
        if (this.touchPlayer == false){
            return
        }
        var touchPos = this.canvas.convertToNodeSpaceAR(event.getLocation());
        if(touchPos.x <= this.leftBorder || 
            touchPos.x >= this.rightBorder){
            this.node.setPositionX((touchPos.x > 0)?this.rightBorder:this.leftBorder)
        }else{
            this.node.setPositionX(touchPos.x)
        }
        if(touchPos.y >= this.topBorder || 
            touchPos.y <= this.bottomBorder){
            this.node.setPositionY((touchPos.y > 0)?this.topBorder:this.bottomBorder)
        }else{
            this.node.setPositionY(touchPos.y)
        }
        // this.node.setPosition(touchPos)
    },
    unRegisterEvent(){
        var self = this;
        self.canvas.off(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
        self.canvas.off(cc.Node.EventType.TOUCH_MOVE, self._touchMoveEvent, self);
    },
    onCollisionEnter: function (other) {
        if (!other.node.isValid || !this.node.isValid){
            return
        }
        switch(other.node.tag){
            case commonData.TAG.monster:
                var monsterBaseInfo = other.node.getComponent("monsterBaseInfo")
                var damage = monsterBaseInfo.damage
                var leftHp = this.playerBaseInfo.hp - damage
                this.playerBaseInfo.hp = (leftHp > 0)?leftHp:0
                if(this.playerBaseInfo.hp <= 0){
                    this.unRegisterEvent()
                }
                // cc.log(this.playerBaseInfo.hp)
                break
            case commonData.TAG.buff:
                var buffBaseInfo = other.node.getComponent("buffBaseInfo")
                if(this.playerBaseInfo.curBulletType == buffBaseInfo.type){
                    cc.log(this.playerBaseInfo.maxBulletGear)
                    commonData.curBulletGear = (commonData.curBulletGear >= this.playerBaseInfo.maxBulletGear)?this.playerBaseInfo.maxBulletGear:commonData.curBulletGear + 1
                }
                this.playerBaseInfo.curBulletType = buffBaseInfo.type
                this.updateBullet()
                // cc.log(this.playerBaseInfo.curBulletIdx)
                break

        }
        
    },
});
