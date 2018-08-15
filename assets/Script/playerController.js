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
        this.node.setTag(commonData.TAG.player)
        this.node.setLocalZOrder(9998)
        this.playerBaseInfo = this.node.getComponent("playerBaseInfo")
        this.bulletIdx = this.playerBaseInfo.curBulletIdx
    },
    updateBullet(){
        this.bulletIdx = this.playerBaseInfo.curBulletIdx
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
                    bullet.setPosition(this.node.x + this.winSize.width/2,this.node.y + this.winSize.height/2 + 45)
                    parent.getParent().addChild(bullet)
                    // bullet.destroy()
                }
                this.curTime = date.getTime()/1000
            }
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
        this.node.setPosition(touchPos)
    },
    unRegisterEvent(){
        var self = this;
        self.canvas.off(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
        self.canvas.off(cc.Node.EventType.TOUCH_MOVE, self._touchMoveEvent, self);
    },
    onCollisionEnter: function (other) {
        if (!other.node.isValid){
            return
        }
        switch(other.node.tag){
            case commonData.TAG.player:
                var monsterBaseInfo = other.node.getComponent("monsterBaseInfo")
                var damage = monsterBaseInfo.damage
                var leftHp = this.playerBaseInfo.hp - damage
                this.playerBaseInfo.hp = (leftHp > 0)?leftHp:0
                if(this.playerBaseInfo.hp <= 0){
                    this.unRegisterEvent()
                }
                cc.log(this.playerBaseInfo.hp)
                break
            case commonData.TAG.buff:
                var buffBaseInfo = other.node.getComponent("buffBaseInfo")
                this.playerBaseInfo.curBulletIdx = buffBaseInfo.type
                this.updateBullet()
                // cc.log(this.playerBaseInfo.curBulletIdx)
                break

        }
        
    },
});
