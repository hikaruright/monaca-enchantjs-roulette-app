/**
 *
 * ルーレット制御を行う
 * 
 */

// set enchant.
enchant();

/** callinitfunction */
function callinit() {
    if(getUa() === false) init();
    else document.addEventListener("deviceready", init, false);
}


/** 利用する画像一覧 */
var imgPath = {
    'ball' : 'img/ball.png',
    'paddle' : 'img/paddle.png',
    'block_red' : 'img/block_red.png',
    'block_green' : 'img/block_green.png',
    'block_blue' : 'img/block_blue.png',
    'block_silver' : 'img/block_silver.png',
    'block_gold' : 'img/block_gold.png',
    
    'planet_bgImage' : 'img/roulette/background.jpg',
    'planet_moon' : 'img/roulette/moon.png',
    'planet_sun' : 'img/roulette/sun.png',
    'planet_earth' : 'img/roulette/earth.png',
    'planet_pointer' : 'img/roulette/pointer.png',
    'backicon' : 'img/back.png',
    'lastone1' : 'img/lastonebutton1.png',
    'lastone2' : 'img/lastonebutton2.png',
    'soldout_red' : 'img/roulette/soldout_red.png',
    'soldout_blue' : 'img/roulette/soldout_blue.png',
    'rotate' : 'img/roulette/rotate.png'
};



// gameオブジェクト
var game = null;

var SETTINGS_GRAVITY = 0.18,
    SETTINGS_FPS = 24,
    SETTINGS_BOUND_X = 0.16,
    SETTINGS_BOUND_Y = 1.1,
    SETTINGS_ACCELEROMETER_RELOAD_FREQ = 150,
    SETTINGS_PADDLE_ACCEL = 2.8,
    SETTINGS_INJECTION_SPEED = 13,
    SETTINGS_FONT = '18px/1.2 vt',
    SETTINGS_POINT = 1000,
    SETTINGS_POINT_SILVER = 200,
    SETTINGS_POINT_GOLD = 3000000;

var prizeContainer;
var planetContainer;

function init(){
    
    console.log("===== Initialize. start =====");
    game = new Core(1280,1024);
    game.fps = SETTINGS_FPS;
    game.rootScene.backgroundColor = 'black';
    game.scale = 1;
    game.score = 0;
    
    // 商品のコンテナ
    prizeContainer = new PrizeContainer();
    
    // 画像をプリロードする
    for(var i in imgPath) {
        game.preload(imgPath[i]);
    }
    prizeContainer.preloadImages(game);
    
    // セーブされたものを取得する
    if(prizeContainer.hasSaveData()){
        console.log("loading saved data.");
        prizeContainer.load();
    }else{
        console.log("loading initalized data.");
        prizeContainer.initializePrize();
    }
    
    $("#enchant-stage > div").css('-webkit-transform','none');
    
    // ロード時の初期イベント
    game.onload = function(){
        
        //var rouletteContainer = new RouletteContainer('earth', prizeContainer.leftPrizes('earth'));
        planetContainer = new PlanetSelectorContainer();
        
        game.pushScene(planetContainer.getScene());
    }
    
    game.start();
}

function switchScene(type, option, sender){try{
    
    console.log("scene.switch : "+type);
    var _scene = null;
    
    // sender.
    if(sender){
        try{
            sender.release();
        }catch(e){
            console.log("error on release. : "+e);
        }
    }
    
    try{
    
    if(type == 'planetSelect'){

        var _planetContainer = new PlanetSelectorContainer();
        _scene = _planetContainer.getScene();
        _planetContainer = null;
    
    }else if(type == 'earth'){
        var rouletteContainer = new RouletteContainer('earth', prizeContainer.leftPrizes('earth'));
        _scene = rouletteContainer.getScene();
        console.log("earth.");
        rouletteContainer= null;
    }else if(type == 'sun'){
        var rouletteContainer = new RouletteContainer('sun', prizeContainer.leftPrizes('sun'));
        _scene = rouletteContainer.getScene();
        rouletteContainer= null;
    }else if(type == 'moon'){
        var rouletteContainer = new RouletteContainer('moon', prizeContainer.leftPrizes('moon'));
        _scene = rouletteContainer.getScene();
        rouletteContainer= null;
    }else if(type == 'prize'){
        var showPrizeContainer = new ShowPrizseContainer(option);
        _scene = showPrizeContainer.getScene();
        showPrizeContainer = null;
    }
    
    }catch(e){
        console.log("error on start scene.");
    }
    
    try{
        var __scene = game.popScene();
        console.log("__scene.length : "+ __scene.childNodes.length);
    
        for(var i = 0, len = __scene.childNodes.length ; i < len; i++){
        
            // console.log("remove " + i + "> " + __scene.childNodes[i]);
            __scene.childNodes[0].remove();
        
        }
    }catch(e){
        console.log("faild remove " + i + "> " + __scene.childNodes[i]);
    }
    
    console.log("pushScene.start.");
    game.pushScene(_scene);
    
    _scene = null;
    
    }catch(e){console.log(e); }

}


/**
 * ユーザエージェントを取得
 */
function getUa() {
    if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 ) {
        return 'iPhone'; 
    } else if(navigator.userAgent.indexOf('iPad') > 0) {
        return 'iPad';
    } else if(navigator.userAgent.indexOf('Android') > 0) {
        return 'Android';
    } else return false;
}
