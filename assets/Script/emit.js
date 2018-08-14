// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bullet: {
            // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
                                  // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            serializable: true,   // optional, default is true
        },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        emitRate:0.2
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.curTime = 0
        this.winSize = cc.director.getWinSize()
        // cc.loader.loadRes("prefab/normalBullet", function(errorMessage,loadedResource){
        //     //检查资源加载
        //     if( errorMessage ) { 
        //         cc.log( '载入预制资源失败, 原因:' + errorMessage );
        //         return; 
        //     }
        //     if( !( loadedResource instanceof cc.Prefab ) ) {
        //         cc.log( '你载入的不是预制资源!' );
        //         return; 
        //     }
        //     this.bullet = loadedResource

        // });
    },

    update (dt) {
        var date = new Date();
        if (date.getTime()/1000 - this.curTime > this.emitRate){
            cc.log("=======update=======")
            if (this.bullet){
                for(var i = 0;i < 5;i++){
                    var bullet = cc.instantiate(this.bullet)
                    // bullet.setParent(this.node)
                    var parent = this.node.getParent()
                    bullet.setPosition(parent.getPositionX() + -10 * (2 - i),parent.getPositionY() + 25)
                    parent.getParent().addChild(bullet)
                    if(bullet.y > this.winSize.height/2){
                        bullet.destroy()
                    }
                }
            }
            this.curTime = date.getTime()/1000
        }
    },
});
