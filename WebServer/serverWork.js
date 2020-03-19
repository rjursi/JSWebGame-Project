
const https = require('https');
var fs = require('fs'); // 파일 읽기, 쓰기 등이 가능한 모듈
const hostname = '0.0.0.0';
const port = 3000;

const https_options = {
	key: fs.readFileSync('./https_key/key.pem'),
	cert: fs.readFileSync('./https_key/cert.pem')
};

function onRequest(request, response){
  console.log(request.url);
  if(request.method == 'GET' && (request.url == '/' || request.url == '/index.html')){
    /*
      console.log(request.method);
      console.log(response);
    */
    response.writeHead(200, {"Content-Type":"text/html"}); // 웹페이지 형식으로 출력을 할 것을 표시
    fs.createReadStream("./res/index.html").pipe(response); // 같은 디렉토리에 있는 index.html을 출력하는 용도
  } else{
    send404Message(response);
  }
  
}




function send404Message(response){
  response.writeHead(404, {"Content-Type":"text/plain"});
  response.write("404 Error....");
  response.end();
}

function ServerOn(){


  // http 모듈을 사용, import 와 같은 거라고 보면 됨

  

  const server = https.createServer(https_options, onRequest);

  server.listen(port, hostname, () => { 
      // () => {} : 추가로 도는 함수를 의미
      // listen 하면서 추가로 되는 함수를 의미
      
      
    console.log(`Server running at http://${hostname}:${port}/`);
    //서버가 가동되었을때 나타나는 메시지

  });
}

module.exports.ServerOn = ServerOn;
