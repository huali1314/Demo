cc.Class({
    extends: cc.Component,

    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
    },

    // use this for initialization
    onLoad: function () {
        // cc.audioEngine.setMaxWebAudioSize(1024*10);
    },
    
    
    play: function () {
        this.audioSource.play();
    },
    
    pause: function () {
        this.audioSource.pause();
    },
    
    stop: function () {
        this.audioSource.stop();
    },
    
    resume: function () {
        this.audioSource.resume();
    }
});
