$('.card').on('click', function () {
  $(this).toggleClass('over')
})

var canHasWebGL = (function () {
  if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) return false
  try {
    var canvas = document.createElement('canvas')
    return !! window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch( e ) {
    return false
  }
})()

function makeScene (selector, shapes) {
  var $selector = $(selector)
  var w = $selector.width()
  var h = 500
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(20,w/h, 0.1, 800);
  camera.position.x = 0;
  camera.position.y = 50;
  camera.position.z = 450
  camera.lookAt(scene.position);

  var renderer = canHasWebGL ? new THREE.WebGLRenderer({antialias: true}) : new THREE.CanvasRenderer()

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

  shapes.forEach(function (shape) {
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

function makeTorus (x, y, z) {
  var size = 14
  var geometry = new THREE.TorusGeometry( size, 3, 3, 6 )
//	var material = new THREE.MeshLambertMaterial({color: 0xffffff })
  var material = new THREE.MeshBasicMaterial({color: 0x222222, wireframe:true, wireframeLinewidth: 1})
  var obj = new THREE.Mesh(geometry, material)
  obj.position.x = x
  obj.position.y = y
  obj.position.z = z
  obj.rotation.x = -Math.random()
  obj.rotation.y = Math.random()
  obj.rotation.z = Math.random()
  obj.castShadow = true
  obj.receiveShadow = false
  return obj
}

function makeCylinder (x, y, z) {
  var geometry = new THREE.CylinderGeometry(3,12,22,4,1,false)
  var material = new THREE.MeshBasicMaterial({color: 0x222222, wireframe:true, wireframeLinewidth: 1})
  var obj = new THREE.Mesh(geometry, material)
  obj.position.x = x
  obj.position.y = y
  obj.position.z = z
  obj.rotation.x = -Math.random()
  obj.rotation.y = Math.random()
  obj.rotation.z = Math.random()
  obj.castShadow = true
  obj.receiveShadow = false
  return obj
}

function makeOctahedron (x, y, z) {
  var geometry = new THREE.OctahedronGeometry(14)
  var material = new THREE.MeshBasicMaterial({color: 0x222222, wireframe:true, wireframeLinewidth: 1})
  var obj = new THREE.Mesh(geometry, material)
  obj.position.x = x
  obj.position.y = y
  obj.position.z = z
  obj.rotation.x = -Math.random()
  obj.rotation.y = Math.random()
  obj.rotation.z = Math.random()
  obj.castShadow = true
  obj.receiveShadow = false
  return obj
}

function makePyramid (x, y, z) {
  var size = 18;
  var geometry = new THREE.TetrahedronGeometry(size);
  //	var material = new THREE.MeshLambertMaterial({color: 0xffffff });
  var material = new THREE.MeshBasicMaterial({color: 0x222222, wireframe:true, wireframeLinewidth: 1});
  var obj = new THREE.Mesh(geometry, material);
  obj.position.x = x
  obj.position.y = y
  obj.position.z = z
  obj.rotation.x = -Math.random()
  obj.rotation.y = Math.random()
  obj.rotation.z = Math.random()
  obj.castShadow = true;
  obj.receiveShadow = false;
  return obj
}

function makeCube (x, y, z) {
  var cubeSize = 18;
  var material = new THREE.MeshBasicMaterial({color: 0x222222, wireframe:true, wireframeLinewidth: 1});
  var cubeGeometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize);
  var obj = new THREE.Mesh(cubeGeometry, material);
  obj.position.x = x
  obj.position.y = y
  obj.position.z = z
  obj.rotation.x = -Math.random()
  obj.rotation.y = Math.random()
  obj.rotation.z = Math.random()
  obj.castShadow = true;
  obj.receiveShadow = false;
  return obj
}

/*if (window.innerWidth < 600) return;*/

var connectionObjs = [
  makeOctahedron(-40, 70, -100),
  makeOctahedron(-4, 64, 20),
  makeOctahedron(-50, 52, -30),
  makeOctahedron(-20, 41, 50)
]

var awarenessObjs = [
  makeCylinder(-110, 62, 50),
  makeCylinder(-97, 62, -30)
]

var buildingObjs = [
  makeTorus(-120, 18, 0),
  makeTorus(-118, 18, -150),
  makeTorus(-70, 1, 80)
]

var understandingObjs = [

  makePyramid(22, 15, -100),
  makePyramid(-2, 1, 1),
  makePyramid(35, 1, 60)
]

var revealingObjs = [
  makeCube(52, 50, 100),
  makeCube(140, 70, -200),
  makeCube(105, 0, -300),
  makeCube(95, 30, 0),
  makeCube(105, 0, 10)
]

makeScene('.scene', connectionObjs.concat(awarenessObjs).concat(buildingObjs).concat(understandingObjs).concat(revealingObjs))

var data = {
  '#understanding': {
    title: 'Understanding',
    objs: understandingObjs
  },
  '#revealing': {
    title: 'Revealing',
    objs: revealingObjs
  },
  '#building': {
    title: 'Building',
    objs: buildingObjs
  },
  '#awareness': {
    title: 'Awareness',
    objs: awarenessObjs
  },
  '#connection': {
    title: 'Connection',
    objs: connectionObjs
  }
}

$('.shapes a').hover(function () {
  var title = $('.shapes h4')
  var link = $(this)

  var split = link.attr('href').split('-')
  var text = data[split[0]].title
  var obj = data[split[0]].objs[parseInt(split[1], 10)]

  obj.material.color = new THREE.Color("#00cc99")

  if (title.text() != text) {
    title.text(text)
  }
}, function () {
  var link = $(this)
  var split = link.attr('href').split('-')
  var obj = data[split[0]].objs[parseInt(split[1], 10)]
  obj.material.color = new THREE.Color("#000000")
})

$('.shapes a').click(function (e) {
  e.preventDefault()
  $($(this).attr('href')).show()
})

$(document).on('keydown', function (evt) {
  if (evt.keyCode === 27) {
    $('.fullscreen').hide()
  }
})

$('.close').on('click', function(){
  $('.fullscreen').hide()
})

$('.tryme.collapse').collapse()

