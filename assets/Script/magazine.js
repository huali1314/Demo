module.exports = {
    MagazineType:cc.Enum({
        NORMAL:0,//普通子弹
        SHOT:1,//散弹
        LIGHT:2,//激光
        TRACE:3,//追踪弹
        FIRE:4,//火焰
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