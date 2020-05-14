var io = io.connect();
var controller_state = {};

io.on('connect', function(){
	  
	// 서버에 접속 되었다는 신호를 보내게 됨
	io.emit('game_connect');
	io.on('game_connected', game_connected);
	
	io.on('controller_connected', function(connected){
		
		if(connected){
			
			// QRcode 숨기기
			
			QR_code_element.style.display = "none";
			init();
			animate();
			
		}else{
			// QRcode 그대로 보이게
			QR_code_element.style.display = "block"
			
			controller_state = {};
			
			
		}
	});
});

io.on('updateUI', function(objStatuses){
	
	// 각종 UI 오브젝트의 상태를 보내서 업데이트
	updateUI(objStatuses);
	
});

var create_QR = function(){
	var QR_code;
	var url = "https://jswebgame.run.goorm.io?id=" + io.id;
	
	QR_code_element = document.createElement('div');
	QR_code_element.id = "QR_code";
	
	// body 안에 추가함
	document.body.appendChild(QR_code_element);
	
	QR_code = new QRCode("QR_code");
	QR_code.makeCode(url);
}

// 플레이어가 웹 게임에 접속을 할 경우 QR코드를 띄울 수 있도록 함수를 호출
var game_connected = function(){
	create_QR();
	
	// 더 이상 사용을 안하므로 해당 리스너를 지움
	io.removeListener('game_connected', game_connected);
	
}


io.on('ui_updateMyDirection', function(data){
	
	updateMyDirection(data);
});

io.on('ui_updatePlayerPosition', function(data){
    updatePlayerPosition(data);
});


// 서버로 부터 플레이어 캐릭터를 생성하라는 신호가 오면
io.on('ui_createPlayer', function(initPlayerObjArr){
	console.log(initPlayerObjArr);
	
	// UI 단에서 플레이어를 생성하는 함수를 실행, 해당 객체 값은 플레이어의 각종 위치, 크기 등 정보가 들어있는 값임
    createPlayer(initPlayerObjArr);
});





io.on('ui_addOtherPlayer', function(data){
    addOtherPlayer(data);
});

io.on('ui_removeMyPlayer', function(){
    removeMyPlayer();
});

io.on('ui_removeOtherPlayer', function(data){
    removeOtherPlayer(data);
});

// server.js 측에서 보내는(ioEvents) socket.io 메시지와 
// 자신 (main.js) 에서 보내는 socket.io 메시지를 공통으로 처리하는 부분
