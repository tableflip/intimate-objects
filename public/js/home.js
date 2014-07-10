function shape (selector, makeShape) {
	var $selector = $(selector)
	var w = $selector.width()
	var h = 300
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(80,w/h, 0.1, 200);
	camera.position.x = 0;
	camera.position.y = 24;
	camera.position.z = 40
	camera.lookAt(scene.position);

	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0xFFFFFF, 1.0));
	renderer.setSize(w, h);
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;

	var ambientLight = new THREE.AmbientLight(0xdddddd);
	scene.add(ambientLight);

	var spotLight = new THREE.SpotLight( 0xdddddd, 0.2 );
	spotLight.position.set( 0, 100, -9 );
	spotLight.castShadow = true;
	spotLight.shadowCameraVisible = false;
	spotLight.shadowDarkness = 0.02
	scene.add( spotLight );

	var shapes = [makeShape()]
	shapes.forEach(function(shape, index){
		scene.add(shape)
	})

	var planeGeometry = new THREE.PlaneGeometry(w,46);
	var planeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
	planeMaterial.opacity = 1
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;
	plane.rotation.x=-0.5*Math.PI;
	plane.position.x=0;
	plane.position.y=-18;
	plane.position.z=0;
	scene.add(plane);

// add the output of the renderer to the html element
	$(selector).append(renderer.domElement);

	function render() {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
		shapes.forEach(function(s,i){
			s.rotation.x += -0.0007;
			s.rotation.y += 0.0005;
			s.rotation.z += 0.0008;
		})
	}
	render();

	window.addEventListener( 'resize', function(){
		var width = $selector.width()
		camera.aspect = width / h
		camera.updateProjectionMatrix();
		renderer.setSize( width, h );
	}, false );
}

function makeCube(){
	var cubeSize = 18;
	var shapeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
	var cubeGeometry = new THREE.CubeGeometry(cubeSize,cubeSize,cubeSize);
	var obj = new THREE.Mesh(cubeGeometry,shapeMaterial);
	obj.position.x = 0;
	obj.position.y = 12;
	obj.castShadow = true;
	obj.receiveShadow = false;
	return obj
}

function makeTorus(){
	var size = 14;
	var geometry = new THREE.TorusGeometry( size, 3, 10, 30 );
	var material = new THREE.MeshLambertMaterial({color: 0xffffff });
	var obj = new THREE.Mesh(geometry, material);
	obj.position.x = 0;
	obj.position.y = 12;
	obj.castShadow = true;
	obj.receiveShadow = false;
	return obj
}
function makePyramid(){
	var size = 18;
	var geometry = new THREE.TetrahedronGeometry(size);
	var material = new THREE.MeshLambertMaterial({color: 0xffffff });
	var obj = new THREE.Mesh(geometry, material);
	obj.position.x = 0;
	obj.position.y = 12;
	obj.rotation.z = 50;
	obj.castShadow = true;
  	obj.receiveShadow = false;
	return obj
}

/*if (window.innerWidth < 600) return;*/
shape(".cube", makeCube)
shape(".torus", makeTorus)
shape(".pyramid", makePyramid)
