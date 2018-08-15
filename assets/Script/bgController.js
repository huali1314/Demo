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
       road:[cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
      // if(commonData.curGameState == commonData.GameState.RUNNING){
         this.updateRoadPosition(dt)
      // }
    },
    updateRoadPosition(dt){
        for(var index = 0; index < this.road.length; index++){
           var element = this.road[index];
           var curPosY = element.y
           var winSize = cc.director.getWinSize();

           if (curPosY > -winSize.height/2){
                element.y = curPosY - commonData.velocity
           }else{
                var posY = (index == 0)?this.road[1].y:this.road[0].y
                var newPosY = posY + element.getContentSize().height - commonData.velocity
                element.y = newPosY
           }
       }
    },
});
