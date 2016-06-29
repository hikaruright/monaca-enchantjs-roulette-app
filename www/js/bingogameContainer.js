var CONST_KEY_SHOWED_LIST_STORAGE_KEY = "SHOWED_LIST_STORAGE_KEY";
var CONST_KEY_UNSHOWED_LIST_STORAGE_KEY = "UNSHOWED_LIST_STORAGE_KEY";

var bingoContainer = enchant.Class.create({
    
    // 出現済みlist
    //$scope.showedList = [];
    // 未出現list
    //$scope.unshowedList = [];
    // 直近の出現
    //$scope.drawNum = 0;
    
    initialize : function(){
        // シーン生成
        this.scene = new Scene();
    
    },
    
    initializeList : function(){
        //alert("initialize.");
        this.showedList = [];
        
        this.unshowedList = [];
        //alert($scope.unshowedList);
        // 1〜75をセット
        for(var i = 1; i <= 75; i++){
//            alert("i:"+i);
            
            this.unshowedList[this.unshowedList.length] = i;
        }
        //alert($scope.unshowedList);
    },
    
    loadList : function(){
        
        var keyList = localStorage.getItem(CONST_KEY_SHOWED_LIST_STORAGE_KEY);
        // Split
        // alert(keyList);
        this.showedList = keyList.split(',');
        // alert($scope.showedList);
        
        var unshowed = localStorage.getItem(CONST_KEY_UNSHOWED_LIST_STORAGE_KEY);
        this.unshowedList = unshowed.split(',');
    },
    
    saveList : function(){
        var keyList = this.showedList.join(",");
        // alert(keyList);
        localStorage.setItem(CONST_KEY_SHOWED_LIST_STORAGE_KEY, keyList);
        //alert("save complete/");
        var unshowed = this.unshowedList.join(",")
        localStorage.setItem(CONST_KEY_UNSHOWED_LIST_STORAGE_KEY, unshowed);
    },
    
    draw : function(){
        
        if(this.unshowedList.length == 0){
            alert("もうできないよ？");
            return;
        }
        var max = this.unshowedList.length;
        // alert("max?:"+max);

        var num = Math.random() * max;
        // 桁落とし
        var numInt = Math.floor(num);
        
        var _num = this.unshowedList[numInt];
        this.unshowedList.splice(numInt, 1);
        this.showedList[this.showedList.length] = _num;
        
        this.drawNum = _num;
        
        alert($scope.drawNum);
        this.saveList();
    } 
});