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
        prompt: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        player: {
            default:null,
            type:cc.Node,
            serializable:true,
        },
    },

    onLoad () {
        this._initTouchEvent()
        this.prompt.setLocalZOrder(9999)
        cc.director.pause()
    },

    start () {
        
    },
    update (dt) {
        var playerInfo = this.player.getComponent("playerBaseInfo")
        var hp = playerInfo.hp
        if (hp <= 0){
            this.unRegisterEvent()
            this.pause()
        }
    },
    _initTouchEvent: function () {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_END, self._touchEndEvent, self);
    },
     _touchStartEvent: function (event) {
        this.prompt.active = false
        this.resume()
    },
    _touchEndEvent: function () {
        this.prompt.active = true
        this.pause()
    },
    pause(){
        commonData.curGameState = commonData.GameState.PAUSE
        cc.director.pause()
    },
    resume(){
        commonData.curGameState = commonData.GameState.RUNNING
        cc.director.resume()
    },
    displayDialog(){

    },
    unRegisterEvent(){
        this.node.off(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
    }
});
