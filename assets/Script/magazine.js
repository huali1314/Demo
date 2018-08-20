module.exports = {
    MagazineType:cc.Enum({
        NORMAL:0,//普通子弹
        HARD:1,
        SHOT:2,//散弹
        LIGHT:3,//激光
        TRACE:4,//追踪弹
        FIRE:5,//火焰
    }),
    Damage:{
    	default:[],
    	0:1,//普通子弹
        1:2,//散弹
        2:1.5,//激光
        3:3,//追踪弹
        4:4,//火焰
    }
};