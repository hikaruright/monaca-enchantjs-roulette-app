// This is a JavaScript file

var ROULETTE_PLANET_POSITION_X = 250;
var ROULETTE_PLANET_POSITION_Y = 100;

var ITEMS_NUM_LIST_EARTH = [""];

var circle_fill_colors = [
    "rgba(96,79,41, 0.5)",
    "rgba(85,102,102, 0.5)",
    "rgba(42,182,194, 0.5)",
    "rgba(6,213,183, 0.5)",
    "rgba(149,84,145, 0.5)",
    "rgba(164,100,89, 0.5)",
    "rgba(160,173,46, 0.5)",
    "rgba(146,47,92, 0.5)",
    "rgba(108,179,240, 0.5)",
    "rgba(16,134,171, 0.5)",
    "rgba(4,44,126, 0.5)",
    "rgba(59,114,127, 0.5)"
    ];
    
var RouletteContainer = enchant.Class.create({
    
    initialize : function(imageType, showPrizes){try{
        
        var that = this;
        var imageType = imageType;
        
        this.planetType = imageType;
        
        this.scene = new Scene();
        
        this.sprite = new Sprite(500,500);
        this.sprite.x = ROULETTE_PLANET_POSITION_X;
        this.sprite.y = ROULETTE_PLANET_POSITION_Y;

        if(imageType == 'sun'){
            this.sprite.image = game.assets['img/roulette/sun.png'];    
        }else if(imageType == 'moon'){
            this.sprite.image = game.assets['img/roulette/moon.png'];
        }else if(imageType == 'earth'){
            this.sprite.image = game.assets['img/roulette/earth.png'];
        }
        
        var planet = this.sprite;
        
        this.label = new Label();
        this.label.x = 10;
        this.label.y = 10;
        this.label.color="white";
        this.label.text = " ";
        
        var debugLabel = this.label;
        
        this.scene.addChild(planet);
        this.scene.addChild(this.label);
        
        var num = showPrizes.length;
        this.num = showPrizes.length;
        this.prizes = showPrizes;
        
        // this.surfaces = [];
        this.circles = [];
        this.numberLabels = [];
        
        // alert("prizes : "+JSON.stringify(this.prizes));
        
        for(var i in this.prizes){
            
            var _prize = this.prizes[i];
            // console.log("_prize : "+_prize);
            // 扇形図形
            var surface1 = new Surface(500,500);
            surface1.context.beginPath();
            surface1.context.moveTo(250,250);
            var _start = (Math.PI*2 / num) * i;
            var _end = _start + Math.PI*2 / num;
            
            surface1.context.arc(250, 250, 250, _start, _end, false);
            surface1.context.closePath();
            surface1.context.fillStyle = circle_fill_colors[i];
            surface1.context.fill();
            
            surface1.context.lineWidth = 1;
            surface1.context.strokeStyle = "#4a4a4a";
            surface1.context.stroke();
            
            // 描画するSprite
            var circleSprite1 = new Sprite(500,500);
            circleSprite1.image = surface1;
            circleSprite1.x = ROULETTE_PLANET_POSITION_X;
            circleSprite1.y = ROULETTE_PLANET_POSITION_Y;    
            
            this.circles[this.circles.length] = circleSprite1;
            
            that.scene.addChild(this.circles[this.circles.length -1 ]);
            
            // 文字の位置を調整
            var charRad = _start + (_end - _start) / 2.0;
            //var charRad = charDig * 180 / Math.PI;
            
            var char_X = Math.cos(charRad)*200 + 250 + ROULETTE_PLANET_POSITION_X - 10;
            var char_Y = Math.sin(charRad)*200 + 250 + ROULETTE_PLANET_POSITION_Y - 10;
            // console.log(" > rad " + charRad + " ("+Math.cos(charRad)+", "+Math.sin(charRad)+")");
            
            var numberLabel = new Label();
            
            numberLabel.color="White";
            numberLabel.text = "" + _prize.num;
            numberLabel.x = char_X;
            numberLabel.y = char_Y;
            numberLabel.font = "normal normal 45px/1.0 monospace";
            
            that.scene.addChild(numberLabel);
            that.numberLabels[that.numberLabels.length] = numberLabel;
            
            // 解除
            _prize = null;
            numberLabel = null;
            surface1 = null;
            circleSprite1 = null;
        }
        
        //this.scene.addChild(this.circleSprite1);
        /*
        this.circleGroup = new Group(500,500);
        
        try{
            this.circleGroup.addChild(this.circleSprite1);
            this.scene.addChild(this.circleGroup)
        }catch(e){
            console.log(e);
        }
        var attachArea = this.circleGroup;
        */
        
        // 最上位にポインタを入れる
        this.pointerSprite = new Sprite(120,170);
        this.pointerSprite.image = game.assets['img/roulette/pointer.png'];
        this.pointerSprite.scale(0.5,0.5);
        this.pointerSprite.x = ROULETTE_PLANET_POSITION_X + 250 - 60;
        this.pointerSprite.y = ROULETTE_PLANET_POSITION_Y - 120;
        
        this.scene.addChild(this.pointerSprite);
        
        // BackKey
        this.backKey = new Sprite(170, 120);
        this.backKey.image = game.assets['img/back.png'];
        this.backKey.scale(0.5,0.5);
        this.backKey.x = 50;
        this.backKey.y = 20;
        this.backKey.opacity = 1.0;
        this.backKey.addEventListener(Event.TOUCH_START, function(){
            switchScene('planetSelect', null, that);
            that = null;
        });
        
        this.scene.addChild(this.backKey);
        
        var touchedFlag = false;
        var touchedTime = null;
        var stoppedFlag = true;
        var showPrizeFlag = false;
        var startedFlag = false;
        
        /** タッチスタートイベント */
        this.scene.addEventListener(Event.TOUCH_START,function() {
            
        });
        
        /** タッチエンドイベント */
        this.scene.addEventListener(Event.TOUCH_END,function() {
            if(!startedFlag){
                startedFlag = true;
            }
            if(stoppedFlag){
                touchedFlag = false;
                touchedTime = null;
                
                stoppedFlag = false;
            } else if(!touchedFlag){ 
                touchedFlag = true;
                touchedTime = new Date().getTime();
                touchedDegree = planet.rotation;
            }
        });
        
        startTime = new Date().getTime();
        
        /** Main loop(フレームレートイベント) */
        this.scene.addEventListener(Event.ENTER_FRAME,function() {try{
            
            var nowTime = new Date().getTime();
            
            if(!startedFlag){
                
                // opacity変更
                if(that.backKey){
                    that.backKey.opacity = 1.0 - ((nowTime % 1000) / 1000) * 0.3;
                }
                return;
            }
            if(touchedFlag){
                // 停止処理
                var spanTime = (nowTime - touchedTime);
                if(spanTime < 4700){
                    var dig = parseInt(((1 - (spanTime / 5000)) * 20));
                }else if(spanTime < 5500){
                    var dig = -0.3;
                }else if(spanTime < 5700){
                    var dig = 0.6;
                }else{
                    if(spanTime > 6500){
                        // 遷移する
                        showPrizeFlag = true;
                    }
                    // 停止中なので回転0をセット
                    var dig = 0;
                    
                    // フラグ解除
                    stoppedFlag = true;
                }
                // 回転
                planet.rotate(dig);
                //that.circleSprite1.rotate(dig);
                //that.circleGroup.rotate(dig);
                for(var i in that.circles){
                    that.circles[i].rotate(dig);
                }
            }else{
                
                var ROTATE_TIME = 700;
                
                // 通常の回転
                var dig = parseInt(((nowTime - startTime) % ROTATE_TIME) * 360 / ROTATE_TIME); 
                planet.rotation = dig;
                //that.circleSprite1.rotation = dig;
                for(var i in that.circles){
                    that.circles[i].rotation = dig;
                }
            }
            
            // 基準点
            var circleRad = (planet.rotation % 360) / 180 * Math.PI
            
            // 番号文字の位置計算
            for(var i in that.numberLabels){
                
                var _start = (Math.PI*2 / that.numberLabels.length) * i + circleRad;
                var _end = _start + Math.PI*2 / that.numberLabels.length;
                
                // 文字の位置を調整
                var charRad = _start + (_end - _start) / 2.0;
                //var charRad = charDig * 180 / Math.PI;
            
                var char_X = Math.cos(charRad)*200 + 250 + ROULETTE_PLANET_POSITION_X - 10;
                var char_Y = Math.sin(charRad)*200 + 250 + ROULETTE_PLANET_POSITION_Y - 10;
                // console.log(" > rad " + charRad + " ("+Math.cos(charRad)+", "+Math.sin(charRad)+")");
                
                that.numberLabels[i].x = char_X;
                that.numberLabels[i].y = char_Y;
            }
            
            // 現在位置判定
            var selectedNum = (planet.rotation) % 360;
            if(selectedNum < 0) selectedNum += 360;
            var spanDig = 360 / that.numberLabels.length;
            
            var _numInt = parseInt(((360 - selectedNum + 270)%360) / spanDig);
            // alert(JSON.stringify(that.prizes));
            // alert(_numInt);
            var numInt = that.prizes[_numInt].num;
            if(showPrizeFlag){
                try{
                    // console.log("show prize. : "+numInt);
                    var prize = prizeContainer.outPrize(imageType, numInt);
                    // console.log("prize : "+prize);
                    switchScene('prize', prize, that);
                    that = null;
                    prize = null;
                }catch(e){
                    console.log(e);
                }
                showPrizeFlag = false;
            }
            
            //debugLabel.text = "dig : " + (planet.rotation % 360) + " > " + touchedFlag + ", Selected : "+_numInt + " > " + numInt + " / "+selectedNum+", "+spanDig;
            debugLabel.text = " ";
            //console.log("aaa");
        }catch(e){ console.log(e); }});
        
        // console.log("initialized...");
    }catch(e){ console.log(e); }},
    
    getScene : function(){
        return this.scene;
    },
    
    release : function(){
        
        this.scene.clearEventListener();
        if(!this.scene){
            console.log("scene is null!");
        }
        this.scene = null;
        this.sprite = null;
        planet = null;
        this.pointerSprite = null;
        this.backKey = null;
        
        if(!this.circles){
            console.log("circles is null!");
        }
        
        delete this.circles;
        delete this.numberLabels;
        
        that = null;
        //this = null;
    }

});