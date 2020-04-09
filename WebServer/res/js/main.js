// object는 일단 각종 요소(예를 들어 큐브) 등의 요소들이 들어가는 부분

var scene, camera, renderer, container, objects = [];


// THREE.js 에는 3가지가 필수로 필요한데 
// Scene, Camera, renderer;
// scene 생성


// 초기 다양한 값 세팅하기 위한 함수
init();

// renderer 를 통하여 camera 와 함께 화면에 표시하는 함수
animate();

function init(){

	// 해당 3D 요소들이 위치할 공간
	container = document.getElementById('container');
	// console.log(container)
	
	
	scene = new THREE.Scene(); 

	// camera 생성, 일단은 PerspectiveCamera 로 설정
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	// 75 : 시야, 75도
	// window.innerWidth / window.innerHeight : 종횡비
	// 0.1, 1000 : 근거리 및 원거리 클리핑 평면
	//   카메라에서 멀거나 가까운 값보다 가까운 거리에 있는 물체는 렌더링 되지 않음
	//   값 비율을 조절할 것


	// renderer 생성
	// WebGL 을 사용하는 렌더러 사용
	renderer = new THREE.WebGLRenderer();

	// 앱을 렌더링할 크기를 설정해야함 - 여기서는 브라우저의 창 높이와 너비

	renderer.setSize(window.innerWidth, window.innerHeight);
	// 여기 setSize 에서 앱의 크기를 유지하면서 더 낮은 해상도로 랜더링 할 경우에는 
	// setSize의 세번째 인수 (updateStyle)로 false를 넣고 렌더링 사이즈를 넣으면 됨


	// 큐브를 만들려면 BoxGeometry 가 필요하다.
	// 큐브의 모든 점(정점)과 채우기(면) 을 포함하는 객체
	var geometry = new THREE.BoxGeometry();

	// 색상을 지정할 material, 즉 재질이 필요, 아래는 색깔만 입힘
	var material = new THREE.MeshBasicMaterial({color : 0x000fff});

	// 메쉬가 필요, 장면에 삽입하고 자유롭게 움직이도록 하는 것을 넣음 
	var cube = new THREE.Mesh(geometry, material);

	// 오브젝트 모음에 추가
	objects.push(cube);
	

	// 기본적으로 아래와 같이 호출하면 좌표(0,0,0) 에 추가됨
	// 아래 메소드를 통하여 카메라와 큐브가 서로 내부에 있게 됨
	scene.add(cube);

	// 그래서 카메라를 약간 움직임
	camera.position.z = 5;


	// 이제 위의 값들을 렌더링할 렌더링 루프(함수) 가 필요함
	// 기본 초당 60회 


	container.appendChild(renderer.domElement);
	document.body.appendChild( container );

}

function animate(){
	requestAnimationFrame(animate);


	// objects의 첫번째 배열은 현재 큐브가 들어가 있음
	
	objects[0].rotation.x += 0.1;
	objects[0].rotation.y += 0.1; 
	// 요러면 큐브가 돌고 돈다.

	renderer.render(scene, camera);
}
	



