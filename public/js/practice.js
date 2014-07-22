//var cards = [ "TOUCH", "SMELL", "GAZE", "SPACE", "HOLD", "REVEAL", "FEELING", "PRIVATE" ]
/*
var cards = $('.cards .card').map(function(i, el){ return el.innerHTML })

var lastPicks = []

function randomItem (arr) {
  var i = Math.floor(Math.random() * arr.length)
  return arr[i]
}

function pseudoRandomItem (arr) {
  for(var res = randomItem(arr);
      lastPicks.indexOf(res) > -1;
      res = randomItem(arr)){}

  lastPicks.unshift(res);

  if ( lastPicks.length > 4) lastPicks.pop()

  return res
}

function newCard(){
  var card = pseudoRandomItem(cards)
  $('.fullscreen .card').text(card)
}

$('.fullscreen').on('click', newCard)

$(document).on('keydown', function (evt) {
  if (evt.keyCode === 27) {
    $('.fullscreen').hide()
  } else {
    newCard()
  }
})

$(document).on('click', '.cards .card', function(evt){
  var text = $(evt.target).text()
  $('.fullscreen .card').text(text)
  $('.fullscreen').show()
})

$('.close').on('click', function(){
  $('.fullscreen').hide()
})
*/

$('.card').on('click', function () {
  $(this).toggleClass('over')
})


$(document).on('click', '#Star-1', function(evt){
  alert('STAR')
})

$(document).on('click', '#Polygon-1', function(evt){
  alert('POLYGON')
})

$(document).on('click', '#Rectangle-1', function(evt){
  alert('SQUARE')
})

$(document).on('click', '#Triangle-1', function(evt){
  alert('TRIANGLE')
})


var canHasWebGL = ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )()

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

function makeTorus(){
  var size = 14;
  var geometry = new THREE.TorusGeometry( size, 3, 10, 30 );
//	var material = new THREE.MeshLambertMaterial({color: 0xffffff });
  var material = new THREE.MeshBasicMaterial({color: 0x222222, wireframe:true, wireframeLinewidth: 1});
  var obj = new THREE.Mesh(geometry, material);
  obj.position.x = 0;
  obj.position.y = 12;
  obj.castShadow = true;
  obj.receiveShadow = false;
  return obj
}

function makeCylinder () {
  var geometry = new THREE.CylinderGeometry(3,12,22,20,5,false)
  var material = new THREE.MeshBasicMaterial({color: 0x222222, wireframe:true, wireframeLinewidth: 1})
  var obj = new THREE.Mesh(geometry, material)
  obj.position.x = 0
  obj.position.y = 12
  obj.castShadow = true
  obj.receiveShadow = false
  return obj
}

function makeOctahedron () {
  var geometry = new THREE.OctahedronGeometry(14, 3)
  var material = new THREE.MeshBasicMaterial({color: 0x222222, wireframe:true, wireframeLinewidth: 1})
  var obj = new THREE.Mesh(geometry, material)
  obj.position.x = 0
  obj.position.y = 12
  obj.castShadow = true
  obj.receiveShadow = false
  return obj
}

/*if (window.innerWidth < 600) return;*/

shape(".octahedron", makeOctahedron)
shape(".torus", makeTorus)
shape(".cylinder", makeCylinder)

