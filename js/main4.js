// moveToXY()  moveToPointer() 
// 添加静音按钮旋转效果angularVelocity
var width = window.innerWidth;  
var height = window.innerHeight; 

// 创建游戏实例
var game = new Phaser.Game(width, height, Phaser.AUTO, '#game');

// 定义场景
var states = {
	// 加载场景
    preload: function() {
    	this.preload = function() {
	        // 设置背景为黑色
	        game.stage.backgroundColor = '#FFFFFF';
	        // 加载游戏资源
	        game.load.crossOrigin = 'anonymous'; // 设置跨域
	        game.load.image('bg', 'images/bg.png');
	        game.load.image('dude', 'images/dude.png');
	        game.load.image('green', 'images/green.png');
	        game.load.image('red', 'images/red.png');
	        game.load.image('yellow', 'images/yellow.png');
	        game.load.image('bomb', 'images/bomb.png');
	        game.load.image('five', 'images/five.png');
	        game.load.image('three', 'images/three.png');
	        game.load.image('one', 'images/one.png');
	        game.load.spritesheet('mute-play', 'images/mute-play.png', 32, 23); //游戏页-静音及播放
	        game.load.spritesheet('closebtn', 'images/closebtn.png'); //游戏页-静音及播放
	        game.load.spritesheet('leadbg', 'images/leadbg.png'); //游戏页-静音及播放
	        game.load.audio('bgMusic', 'audio/bgMusic.mp3');
	        game.load.audio('scoreMusic', 'audio/addscore.mp3');
            game.load.audio('bombMusic', 'audio/boom.mp3');
	       
            // 监听加载完毕事件
            game.load.onLoadComplete.add(onLoad);
            // 加载完毕回调方法
            function onLoad() {
            	game.state.start('created');
            }
	    }
    },                                                                          
    // 开始场景
    created: function() {
    	var tween = null;
    	this.create = function() {
            // 添加背景
	        var bg = game.add.image(0, 0, 'bg');
	        bg.width = game.world.width;
	        bg.height = game.world.height;
	        // 添加标题
	        var title = game.add.text(game.world.centerX, game.world.height * 0.25, '小恐龙接苹果', {
	            fontSize: '40px',
	            fontWeight: 'bold',
	            fill: '#f2bb15'
	        });
	        title.anchor.setTo(0.5, 0.5);
	        
	        // 添加主角
	        var man = game.add.sprite(game.world.centerX, game.world.height * 0.75, 'dude');
	        var manImage = game.cache.getImage('dude');
	        man.width = game.world.width * 0.2;
	        man.height = man.width / manImage.width * manImage.height;
	        man.anchor.setTo(0.5, 0.5);
	        
	        //添加弹层
	        var popup = game.add.sprite(0,0,'leadbg');
	        //popup.width = game.world.width;
	        //popup.height = game.world.height/2;
	        //popup.backgroundColor = 'rgba(0,0,0,0.5)';
	      
		
		    //  And click the close button to close it down again
		    var closeButton = game.make.sprite(0, 0, 'closebtn');
		    closeButton.inputEnabled = true;
		    closeButton.input.priorityID = 1;
		    closeButton.input.useHandCursor = true;
		    closeButton.events.onInputDown.add(closeWindow, this);
		    //  Add the "close button" to the popup window image
		    popup.addChild(closeButton);
		    function closeWindow() {
			    if (tween && tween.isRunning || popup.scale.x === 0.1)
			    {
			        return;
			    }
			
			    //  Create a tween that will close the window, but only if it's not already tweening or closed
			    tween = game.add.tween(popup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
			
			}
        }
    }
   
};

// 添加场景到游戏示例中
Object.keys(states).map(function(key) {
	game.state.add(key, states[key]);
});

// 启动游戏
game.state.start('preload');