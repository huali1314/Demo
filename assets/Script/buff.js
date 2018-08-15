var commonData = require("gameData")
cc.Class({
    extends: cc.Component,
    start () {
        this.node.setTag(commonData.TAG.buff)
        this.screen_sz = cc.director.getWinSize()
    },

    update (dt) {
        if (this.node.y < -this.screen_sz.height/2){
            this.node.destroy()
        }else{
            this.node.y -= 5
        }
    },
    onCollisionEnter: function (other) {
       this.node.destroy()
    },
});
