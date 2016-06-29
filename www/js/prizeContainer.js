/**
 * 商品の管理を行うクラス
 */
var PrizeContainer = enchant.Class.create({
    
    initialize : function(){
        
        this.prizeCounter = {
            'sun' : [1,2,3,4,5,6,7,8,9,10],
            'moon' :  [1,2,3,4,5,6,7,8,9,10,11],
            'earth' :  [1,2,3,4,5,6,7,8,9,10,11],
            'lastone' : [1]
        };
        
        /* LASTONE向けデバッグ用 */
        /*
        this.prizeCounter = {
            'sun' : [],
            'moon' :  [1],
            'earth' :  [],
            'lastone' : [1]
        };
        */
        this.prizes = {
            'earth' : [
            new Prize('earth',1, 'img/prize/earth/earth01.png', '自宅で炭酸'),
            new Prize('earth',2, 'img/prize/earth/earth02.png', 'ノンフライヤー'),
            new Prize('earth',3, 'img/prize/earth/earth03.png', 'プラレールアドバンス(鉄道同好会提供)'),
            new Prize('earth',4, 'img/prize/earth/earth04.png', 'iPad Air'),
            new Prize('earth',5, 'img/prize/earth/earth05.png', '冷温庫'),
            new Prize('earth',6, 'img/prize/earth/earth06.png', '高級食材！！'),
            new Prize('earth',7, 'img/prize/earth/earth07.png', 'ガラスペンセット'),
            new Prize('earth',8, 'img/prize/earth/earth08.png', 'カラリオ(複合機)'),
            new Prize('earth',9, 'img/prize/earth/earth09.png', 'くまもん防災セット'),
            new Prize('earth',10, 'img/prize/earth/earth10.png', '目もとエステ'),
            new Prize('earth',11, 'img/prize/earth/earth11.png', '電気ケトル')
        ],
        'sun' : [
            new Prize('sun',1, 'img/prize/sun/sun01.png', '温泉宿泊ギフト'),
            new Prize('sun',2, 'img/prize/sun/sun02.png', 'ほっかいろ'),
            new Prize('sun',3, 'img/prize/sun/sun03.png', 'ロードバイク'),
            new Prize('sun',4, 'img/prize/sun/sun04.png', 'iPad mini'),
            new Prize('sun',5, 'img/prize/sun/sun05.png', 'レストランカタログ'),
            new Prize('sun',6, 'img/prize/sun/sun06.png', 'TDLペアチケット'),
            new Prize('sun',7, 'img/prize/sun/sun07.png', '充電式カイロ'),
            new Prize('sun',8, 'img/prize/sun/sun08.png', 'チュッパチャップス'),
            new Prize('sun',9, 'img/prize/sun/sun09.png', '東京バナナ'),
            new Prize('sun',10, 'img/prize/sun/sun10.png', 'カタログギフト')
        ],
        'moon' : [
            new Prize('moon',1, 'img/prize/moon/moon01.png', 'ホームシアターセット'),
            new Prize('moon',2, 'img/prize/moon/moon02.png', '宝くじ'),
            new Prize('moon',3, 'img/prize/moon/moon03.png', 'ネスカフェ バリスタ'),
            new Prize('moon',4, 'img/prize/moon/moon04.png', 'アロマ加湿器'),
            new Prize('moon',5, 'img/prize/moon/moon05.png', 'プラネタリウム'),
            new Prize('moon',6, 'img/prize/moon/moon06.png', '超音波歯ブラシ'),
            new Prize('moon',7, 'img/prize/moon/moon07.png', 'KindleFireHD8.9 & amazonギフト'),
            new Prize('moon',8, 'img/prize/moon/moon08.png', '3DS LL & とびだせ！どうぶつの森'),
            new Prize('moon',9, 'img/prize/moon/moon09.png', '今治タオル'),
            new Prize('moon',10, 'img/prize/moon/moon10.png', 'ルンバ'),
            new Prize('moon',11, 'img/prize/moon/moon11.png', '腱鞘炎防止マウス')
        ],
        'lastone' : [
            new Prize('lastone',1, 'img/prize/lastone.jpg', '月の土地 & ...')
            ]
        };
    },
    
    getPrizes : function(type){
        return this.prizes[type];
    },
    
    preloadImages : function(game){
        try{
            /*
        for(var i in this.prizes){
            for(var j in this.prizes[i]){
                // console.log("preload image : "+this.prizes[i][j].imagePath);
                game.preload(this.prizes[i][j].imagePath);
            }
        }*/
            game.preload(
                'img/prize/earth/earth01.png',
                'img/prize/earth/earth02.png',
                'img/prize/earth/earth03.png',
                'img/prize/earth/earth04.png',
                'img/prize/earth/earth05.png',
                'img/prize/earth/earth06.png',
                'img/prize/earth/earth07.png',
                'img/prize/earth/earth08.png',
                'img/prize/earth/earth09.png',
                'img/prize/earth/earth10.png',
                'img/prize/earth/earth11.png',
                
                'img/prize/sun/sun01.png',
                'img/prize/sun/sun02.png',
                'img/prize/sun/sun03.png',
                'img/prize/sun/sun04.png',
                'img/prize/sun/sun05.png',
                'img/prize/sun/sun06.png',
                'img/prize/sun/sun07.png',
                'img/prize/sun/sun08.png',
                'img/prize/sun/sun09.png',
                'img/prize/sun/sun10.png',
            
                'img/prize/moon/moon01.png',
                'img/prize/moon/moon02.png',
                'img/prize/moon/moon03.png',
                'img/prize/moon/moon04.png',
                'img/prize/moon/moon05.png',
                'img/prize/moon/moon06.png',
                'img/prize/moon/moon07.png',
                'img/prize/moon/moon08.png',
                'img/prize/moon/moon09.png',
                'img/prize/moon/moon10.png',
                'img/prize/moon/moon11.png',
                
                'img/prize/lastone.jpg'
            );
        
        }catch(e){ console.log(e); }
    },
    
    outPrize : function(type, prizeNum){try{
        console.log("out prize : "+type+ ", "+prizeNum-1);
        var prize = this.prizes[type][prizeNum-1];
        console.log("image : " + prize);
        
        var _prizeCounter = this.prizeCounter[type];
        console.log("_prizeCounter:"+_prizeCounter);
        // 出たものを残リストから除外
        for(var i in _prizeCounter){
            if(_prizeCounter[i] == prizeNum){
                console.log("splice "+i);
                _prizeCounter.splice(i,1);
                break;
            }
        }
        return prize;
    }catch(e){ console.log("error in outPrize : " + e);}},
    
    leftPrizes : function(type){
        var retPrizes = [];
        for(var i in this.prizeCounter[type]){
            var _num = this.prizeCounter[type][i]-1;
            retPrizes[retPrizes.length] = this.prizes[type][_num];
        }
        
        this.save();
        
        return retPrizes;
    }, 
    
    hasSaveData : function(){try{
        return !!window.localStorage.getItem("ITEM_SAVE_STATE");
    }catch(e){console.log(e);}},
    
    save : function(){
        // 状態のセーブ
        window.localStorage.setItem("ITEM_SAVE_STATE", JSON.stringify(this.prizeCounter));
    },
    load : function(){
        // ロード
        console.log(window.localStorage.getItem("ITEM_SAVE_STATE"));
        this.prizeCounter = JSON.parse(window.localStorage.getItem("ITEM_SAVE_STATE"));
    }, 
    initializePrize : function(){
        this.prizeCounter = {
            'sun' : [1,2,3,4,5,6,7,8,9,10],
            'moon' :  [1,2,3,4,5,6,7,8,9,10,11],
            'earth' :  [1,2,3,4,5,6,7,8,9,10,11],
            'lastone' : [1]
        };
        this.save();
    }
});

var Prize = enchant.Class.create({
    initialize : function(type, num, imagePath, title){
        this.type = type;
        this.num = num;
        this.imagePath = imagePath;
        this.title = title;
    }
});