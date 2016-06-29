// This is a JavaScript file
var PLANET_POSITION_Y = 100;

var PlanetSelectorContainer = enchant.Class.create({
    
    initialize : function(){try{
        
        var that = this;
        
        this.scene = new Scene();
        
        this.background = new Sprite(1280,1024);
        this.background.image = game.assets['img/roulette/background.jpg'];
        this.background.scale(1.5,1.5);
        this.background.x = -100;
        this.background.y = -100;
        
        this.scene.addChild(this.background);
        
        // 各惑星の残数
        var leftEarthLength = prizeContainer.leftPrizes("earth").length;
        var leftMoonLength = prizeContainer.leftPrizes("moon").length;
        var leftSunLength = prizeContainer.leftPrizes("sun").length;
        
        // 地球
        this.earth = new Sprite(500,500);
        this.earth.image = game.assets['img/roulette/earth.png'];
        this.earth.x = -50;
        this.earth.y = PLANET_POSITION_Y;
        this.earth.scale(0.5,0.5);
        
        this.scene.addChild(this.earth);
        
        if(leftEarthLength > 0){
            this.earth.addEventListener(Event.TOUCH_END,function() {
                switchScene("earth", null, that);
                that = null;
            });
        }else{
            
            this.soldoutEarth = new Sprite(500,500);
            this.soldoutEarth.image = game.assets['img/roulette/soldout_red.png'];
            //console.log("e flag1");
            this.soldoutEarth.x = this.earth.x;
            this.soldoutEarth.y = this.earth.y;
            //console.log("e flag2");
            this.scene.addChild(this.soldoutEarth);
            //console.log("e flag3");
            
        }
        
        // 月
        this.moon = new Sprite(500,500);
        this.moon.image = game.assets['img/roulette/moon.png'];
        this.moon.x = 270;
        this.moon.y = PLANET_POSITION_Y;
        this.moon.scale(0.5,0.5);
        
        this.scene.addChild(this.moon);
        
        if(leftMoonLength > 0){
            this.moon.addEventListener(Event.TOUCH_END,function() {
                switchScene("moon", null, that);
                // that = null;
            });
        }else{
            this.soldoutMoon = new Sprite(500,500);
            this.soldoutMoon.image = game.assets['img/roulette/soldout_red.png'];
            this.soldoutMoon.x = this.moon.x;
            this.soldoutMoon.y = this.moon.y;
            this.scene.addChild(this.soldoutMoon);
        }
        
        // 太陽
        this.sun = new Sprite(500,500);
        this.sun.image = game.assets['img/roulette/sun.png'];
        this.sun.x = 580;
        this.sun.y = PLANET_POSITION_Y;
        this.sun.scale(0.5,0.5);
        
        this.scene.addChild(this.sun);
        
        if(leftSunLength > 0){
            this.sun.addEventListener(Event.TOUCH_END,function() {
                switchScene("sun", null, that);
                // that = null;
            });
        }else{
            this.soldoutSun = new Sprite(500,500);
            this.soldoutSun.image = game.assets['img/roulette/soldout_blue.png'];
            this.soldoutSun.x = this.sun.x;
            this.soldoutSun.y = this.sun.y;
            this.scene.addChild(this.soldoutSun);
        }

        this.title = new Label('Select Planet');
        
        //this.title.text = '惑星を選択してください。'
        this.title.color = 'white';
        this.title.font = "normal normal 35px/1.0 monospace";
        this.title.x = 30;
        this.title.y = 50;
        // console.log('flag4.');
        
        this.title.addEventListener(Event.TOUCH_END, function(){
            if(window.confirm('初期化する？')){
                //location.href = "example_confirm.html"; // example_confirm.html へジャンプ
                // 初期化を実施
                prizeContainer.initializePrize();
                alert("初期化しました。アプリを再起動してください。");
                //switchScene('planetSelect',null,that);
                //that = null;
                location.reload();
            }
        });
        
        this.scene.addChild(this.title);
        
        // ゲームをリロードするためのもの
        try{
        var rotateImage = new Sprite(100,100);
        rotateImage.image = game.assets["img/roulette/rotate.png"];
        rotateImage.x = 100;
        rotateImage.y = 600;
        
        rotateImage.addEventListener(Event.TOUCH_END, function(){
            location.reload();
        });
        
        this.scene.addChild(rotateImage);
        
        // rotateImage = null;
        
        }catch(e){console.log(e);}
        
        
        // ---------------
        //    残数計算
        // ---------------
        
        var leftCounter = 0;
        
        try{
            
        var LEFT_DISP_Y = 500;
        
        var leftEarth = new Label();
        leftEarth.color = "white";
        leftEarth.x = 100;
        leftEarth.y = LEFT_DISP_Y;
        leftCounter += leftEarthLength;
        leftEarth.text =  "残り"+leftEarthLength;
        leftEarth.font = "normal normal 20px/1.0 monospace";

        var leftMoon = new Label();
        leftMoon.color = "white";
        leftMoon.x = 400;
        leftMoon.y = LEFT_DISP_Y;
        leftCounter += leftMoonLength;
        leftMoon.text =  "残り"+leftMoonLength;
        leftMoon.font = "normal normal 20px/1.0 monospace";

        var leftSun = new Label();
        leftSun.color = "white";
        leftSun.x = 700;
        leftSun.y = LEFT_DISP_Y;
        leftCounter += leftSunLength;
        leftSun.text = "残り"+leftSunLength
        leftSun.font = "normal normal 20px/1.0 monospace";

        // console.log("append childs.");
        
        this.scene.addChild(leftMoon);
        this.scene.addChild(leftSun);
        this.scene.addChild(leftEarth);
        
        // console.log("append childs. : end");
        
        }catch(e){console.log("error on set lefts."+e);}
        
        try{
            
            var lastone_flag = false;
            
            //カウンタがゼロ？
            if(leftCounter == 0){
                
                lastone_flag = true;
                
                var LASTONE_BUTTON_POS_X = 800;
                var LASTONE_BUTTON_POS_Y = 600;
                
                var lastone1 = new Sprite(120,120);
                lastone1.image = game.assets['img/lastonebutton1.png'];
                lastone1.x = LASTONE_BUTTON_POS_X;
                lastone1.y = LASTONE_BUTTON_POS_Y;
                
                lastone1.addEventListener(Event.TOUCH_END, function(){
                    // alert("show lastone.");
                    var loprize = prizeContainer.outPrize('lastone', 1);
                    switchScene('prize', loprize, that);
                    that = null;
                });
                
                this.scene.addChild(lastone1);
                
            }
            
            //this.background = null;
        }catch(e){
            console.log("Error on draw lastone. : "+e);
        }
        
        this.scene.addEventListener(Event.TOUCH_END,function() {
            
        });
        
        this.scene.addEventListener(Event.ENTER_FRAME, function(){
            var time = new Date().getTime();
            if(lastone_flag){
                if(time % 2000 > 1000){
                    lastone1.image = game.assets['img/lastonebutton1.png'];
                }else{
                    lastone1.image = game.assets['img/lastonebutton2.png'];
                }
            }
            
            // 折角だから背景回転
            that.earth.rotate(0.02);
            that.sun.rotate(0.01);
            that.moon.rotate(0.05);
            that.background.rotate(0.1);
        });
        
        console.log('planet selector.initialized.');
    }catch(e){console.log(e);}},
    
    getScene : function(){
        return this.scene;
    },
    
    release : function(){
        
        try{
        
            that = null;
        
            this.scene.clearEventListener();
        
            this.scene = null;
            this.background = null;
        
            this.earth = null;
            this.sun = null;
            this.moon = null;
        
            this.leftMoon = null;
            this.leftSun = null;
            this.leftEarth = null;
        
        }catch(e){console.log(e);}
        
        try{
            this.soldoutEarth = null;
            this.soldoutMoon = null;
            this.soldoutSun = null;
            lastone = null;
        }catch(e){
            console.log(e);
        }
        
        // this = null;
    }
    
});
