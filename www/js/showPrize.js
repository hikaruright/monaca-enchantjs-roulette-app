var ShowPrizseContainer = enchant.Class.create({

    initialize : function(prize){
        
        var that = this;
        
        this.scene = new Scene();
        
        this.prizeImage = new Sprite(800,600);
        
        // console.log("show prize > "+prize.imagePath);
        
        this.prizeImage.image = game.assets[prize.imagePath];
        this.prizeImage.x = 100;
        this.prizeImage.y = 50;
        
        this.scene.addChild(this.prizeImage);
        
        this.title = new Label();
        this.title.text = "No."+prize.num + " " +prize.title;
        this.title.color = 'white';
        this.title.font = "normal normal 35px/1.0 monospace";
        this.title.width = 1200;
        this.title.x = 30;
        this.title.y = 5;
        // console.log('flag4.');
        this.scene.addChild(this.title);
        
        prizeContainer.save();
        
        this.scene.addEventListener(Event.TOUCH_END, function(){
            
            switchScene('planetSelect', null, that);
            that = null;
        });
    },
    getScene : function(){
        return this.scene;
    },
    
    release : function(){
        that = null;
        this.scene = null;
        this.prizeImage = null;
        this.title = null;
        //this = null;
    }
});