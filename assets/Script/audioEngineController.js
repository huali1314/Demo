cc.Class({
    extends: cc.Component,

    properties: {
        audio: {
            url: cc.AudioClip,
            default: null
        },
    },

    onLoad: function () {
    },

    
    play: function () {
        if (!this.audio) return;
        var id = cc.audioEngine.play(this.audio, false, 1);
    },
    
    stopAll: function () {
        if (!this.audio) return;
        cc.audioEngine.stopAll();
    },
    
    pauseAll: function () {
        if (!this.audio) return;
        cc.audioEngine.pauseAll();
    },
    
    resumeAll: function () {
        if (!this.audio) return;
        cc.audioEngine.resumeAll();
    },
    getVolume:function(){
        cc.audioEngine.getVolume()
    },
    setVolume:function(volume){
        cc.audioEngine.setVolume(volume)
    },
});
