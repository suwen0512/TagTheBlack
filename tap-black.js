var timer = null;    //计时器
var iSpeed = 2;      //黑块掉落速度
var state = 1;       //游戏状态，0为暂停，1为运行，-1为结束
var count = 3;       //区域内黑块总数，大于4则游戏结束
var keyState = 1;
// var sound = ['1','2','3','1','1','2','3','1','3','4','5','3','4','5','5','6','5','4','3','1','5','6','5','4','3','1','2','5','1','2','5','1'];
// var soundId = '';
// var soundNum = 0;

function init(){
	for(var i=0; i<4; i++){      //初始化游戏区域
		crow();
	}

	$('main').onclick = function(ev){
		var oEvent = ev || event;
		if(state == -1){       //游戏结束
			var newGame = confirm('游戏结束，再来一局？');
			if(newGame == true){
				location.reload();     //刷新页面
			}else{
				clearInterval(timer);
			}
			return;
		}

		if(oEvent.target.className.indexOf('black') == -1){      //点击白块时
			state = -1;
			alert('game over');
			clearInterval(timer);
		}else{
			// soundId = 'sound'+'1'+sound[soundNum];
			// audio = new Audio('audio/11.mp3');
			// audio.play();                                         //点击黑块时
			oEvent.target.className = 'cell';
			count --;
			snum = score();
			if(snum%20 == 0){            //分数每增长10分，速度加1
				iSpeed += 1;
			}
			soundNum = (soundNum+1)%sound.length;
			
		}
	}

	document.onkeydown = function(ev){
		var oEvent = ev || event;
		if(oEvent.keyCode == 32){
			keyState = (keyState+1) % 2;
			console.log(keyState);
			if(keyState){
				state = 0;
				clearInterval(timer);
				$('start').style.display = 'block';
				$('start').innerHTML = '点击继续';
			}else{

				$('start').style.display = 'none';
				start();     //区域内黑块开始掉落
			}	
		}
	}

	$('start').onclick = function(){    //点击开始时
		keyState = (keyState+1) % 2;
		$('start').style.display = 'none';
		start();     //区域内黑块开始掉落
	}

}

function cdiv(className){
	var div = document.createElement('div');

	div.className = className;

	return div;
}

function crow(){      //创建行元素
	var con = $('container');
	var row = cdiv('row');
	var classes = createSn();

	for(var i=0; i<4; i++){
		row.appendChild(cdiv(classes[i]));
	}

	if(con.firstChild == null){
		con.appendChild(row);
	}else{
		con.insertBefore(row,con.firstChild);
	}
}

function $(id){
	return document.getElementById(id);
}

function createSn(){             //初始化行元素样式
	var arr = ['cell','cell','cell','cell'];
	var num = Math.floor(Math.random()*4);

	arr[num] = 'cell black';
	return arr;
}



function start(){            //运动开始，黑块开始掉落
	timer = setInterval(function(){
		move();
	},30);
}

function move(){             //运动过程
	var con = $('container');
	var top = parseInt(window.getComputedStyle(con,null)['top']);

	top += iSpeed;

	if(count >= 4){
		var newGame = confirm('游戏结束，再来一局？');
		if(newGame == true){
			location.reload();     //刷新页面
		}else{
			clearInterval(timer);
		}
		state = -1;
	}

	if(top >= 0){
		crow();
		top -= 100;
		delRow();
		count++;
	}

	con.style.top = top + 'px';
}

function delRow(){                   //删除行元素
	var con = $('container');
	con.removeChild(con.lastChild);
}

function score(){                //得分
	$('score').innerHTML = parseInt($('score').innerHTML) + 1;
	return $('score').innerHTML;
}

init();