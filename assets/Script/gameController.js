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
        score:{
            default:null,
            type:cc.Label,
            serializable:true,
        },
        enemyKilled:{
            default:null,
            type:cc.Label,
            serializable:true,
        },
        gameOver:{
            default:null,
            type:cc.Node,
            serializable:true
        },
        playerHp:{
            default:null,
            type:cc.Label,
            serializable:true,
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
        this.gameOver.setLocalZOrder(9999)
        this.gameOver.active = false
        this.playerInfo = this.player.getComponent("playerBaseInfo")
        this.playerController = this.player.getComponent("playerController")
        this.stop()
    },
    updateUI(hp){
        this.playerHp.string = hp
        this.enemyKilled.string = commonData.enemyKilled
        this.score.string = commonData.damage
    },
    // start () {
        
    // },
    update (dt) {
        var hp = this.playerInfo.hp
        this.updateUI(hp)
        if (hp <= 0){
            this.unRegisterEvent()
            this.gameOver.active = true
            this.stop()
        }else{
            this.gameOver.active = false
        }
    },
    _initTouchEvent: function () {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, self._touchStartEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, self._touchCancelEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_END, self._touchEndEvent, self);
    },
     _touchStartEvent: function (event) {
        if (commonData.curGameState == commonData.GameState.STOP){
            this.playerInfo.hp = this.playerInfo.maxHp
            this.playerController._initTouchEvent()
            this.resume()
            return
        }
        this.prompt.active = false
        this.resume()
    },
    _touchEndEvent: function () {
        if (commonData.curGameState == commonData.GameState.STOP){
            return
        }
        this.prompt.active = true
        this.pause()
    },
    _touchCancelEvent:function(){
        if (commonData.curGameState == commonData.GameState.STOP){
            return
        }
        this.prompt.active = true
        this.pause()
    },
    stop(){
        commonData.curGameState = commonData.GameState.STOP
        // cc.game.setFrameRate(0)
        // cc.director.pause()
    },
    pause(){
        commonData.curGameState = commonData.GameState.PAUSE
        // cc.game.setFrameRate(4)
        // cc.director.pause()
    },
    resume(){
        commonData.curGameState = commonData.GameState.RUNNING
        // cc.game.setFrameRate(60)
        // cc.director.resume()
    },
    displayDialog(){

    },
    unRegisterEvent(){
        // this.node.off(cc.Node.EventType.TOUCH_START, this._touchStartEvent, this);
        // this.node.off(cc.Node.EventType.TOUCH_END, this._touchEndEvent, this);
    }
});
