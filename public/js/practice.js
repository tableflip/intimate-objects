$('.card').hover(function () {
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

  var renderer = canHasWebGL ? new THREE.WebGLRenderer({antialias: true}) : new THREE.CanvasRenderer()
  renderer.setClearColor(new THREE.Color(0xFFFFFF, 1.0));
  renderer.setSize(w, h);
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;

  console.log('wh', w, h)
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(20,w/h, 0.1, 800);
  camera.position.set(0,50,450)
  camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

  shapes.forEach(function (shape) {
    scene.add(shape)
  })

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
    w = $selector.width()
    renderer.setSize( w, h );
    camera.aspect = w / h
    camera.updateProjectionMatrix();
  }, false );

  // Figure out which object the user clicked on
  projector = new THREE.Projector();
  mouseVector = new THREE.Vector3();

  var currentlySelectedShape = null

  $(window).on('mousemove', function (e) {
    var offset = $selector.offset()
    var relX = e.pageX - offset.left
    var relY = e.pageY - offset.top

    mouseVector.x = 2 * (relX / w) - 1
    mouseVector.y = 1 - 2 * ( relY / h )

    var raycaster = projector.pickingRay( mouseVector.clone(), camera )
    var intersects = raycaster.intersectObjects( shapes )

    shapes.forEach(function (obj) {
      obj.material.color = new THREE.Color("#000000")
    })

    intersects.forEach(function(i){
      var obj = i.object
      obj.material.color = new THREE.Color("#00cc99")
    })

    if(intersects.length > 0) {
      currentlySelectedShape = intersects[0].object
    } else {
//      currentlySelectedShape = null
    }
  })

  var moving = null

   $(window).on('keydown', function(evt){
    if(!moving) return
    if (evt.keyCode === 37) {
      evt.preventDefault()
      moving.position.x-=3
    }
    if (evt.keyCode === 38) {
      evt.preventDefault()
      moving.position.y+=3
    }
    if (evt.keyCode === 39) {
      evt.preventDefault()
      moving.position.x+=3
    }
    if (evt.keyCode === 40) {
      evt.preventDefault()
      moving.position.y-=3
    }
  })

  $selector.on('click', function(){
    console.log('click', currentlySelectedShape)
    if(!currentlySelectedShape) return

    moving = currentlySelectedShape

    var dialog = $(currentlySelectedShape.name)

    dialog.show()
    $("#mask").show()

    var factory = currentlySelectedShape.factory

    makeScene($('.lhs', dialog), [factory(0, 25, 280)])
  })

}

function makeShape (geometry, x, y, z) {
  var material = new THREE.MeshBasicMaterial({color: 0x222222, wireframe:true, wireframeLinewidth: 1})
  var obj = new THREE.Mesh(geometry, material)
  obj.position.set(x,y,z)
  obj.rotation.set(-Math.random(), Math.random(), Math.random() )
//  obj.castShadow = true
//  obj.receiveShadow = false
  return obj
}

function makeTorus (x, y, z) {
  var size = 14
  var geometry = new THREE.TorusGeometry( size, 3, 3, 6 )
  return makeShape(geometry, x,y,z)
}

function makeCylinder (x, y, z) {
  var geometry = new THREE.CylinderGeometry(3,12,22,4,1,false)
  return makeShape(geometry, x,y,z)
}

function makeOctahedron (x, y, z) {
  var geometry = new THREE.OctahedronGeometry(14)
  return makeShape(geometry, x,y,z)
}

function makePyramid (x, y, z) {
  var size = 18;
  var geometry = new THREE.TetrahedronGeometry(size);
  return makeShape(geometry, x,y,z)
}

function makeCube (x, y, z) {
  var cubeSize = 18;
  var geometry = new THREE.BoxGeometry(cubeSize,cubeSize,cubeSize);
  return makeShape(geometry, x,y,z)
}

function makeSphere (x, y, z) {
  var size = 14;
  var geometry = new THREE.SphereGeometry(size);
  return makeShape(geometry, x,y,z)
}

/*if (window.innerWidth < 600) return;*/

/*
{
  "#understanding":[[25,69,-100],[-11,28,1],[56,-2,60]],
  "#revealing":[[76,-31,100],[140,70,-200],[-153,54,-300],[-130,63,0],[-81,-63,10]],
  "#building":[[-120,15,0],[152,-3,-150],[-34,-14,80]],
  "#awareness":[[13,-10,50],[-70,11,-30]],
  "#connection":[[48,-86,-100],[-46,61,20],[61,43,-30],[-116,-29,50]]
}
*/
var connectionObjs = [
  makeSphere(48,-86,-100),
  makeSphere(-46,61,20),
  makeSphere(61,43,-30),
  makeSphere(-116,-29,50)
]

var awarenessObjs = [
  makeCylinder(13,-10,50),
  makeCylinder(-70,11,-30)
]

var buildingObjs = [
  makeTorus(-120,15,0),
  makeTorus(152,-3,-150),
  makeTorus(-34,-14,80)
]

var understandingObjs = [
  makePyramid(25,62,-100),
  makePyramid(-11,28,1),
  makePyramid(56,-2,60)
]

var revealingObjs = [
  makeCube(76,-31,100),
  makeCube(140,70,-200),
  makeCube(-153,54,-300),
  makeCube(-130,63,0),
  makeCube(-81,-63,10)
]

$(document).on('ready', function(){
  makeScene('.scene', connectionObjs.concat(awarenessObjs).concat(buildingObjs).concat(understandingObjs).concat(revealingObjs))
})

var data = {
  '#understanding': {
    title: 'Understanding',
    objs: understandingObjs,
    factory: makePyramid
  },
  '#revealing': {
    title: 'Revealing',
    objs: revealingObjs,
    factory: makeCube
  },
  '#building': {
    title: 'Building',
    objs: buildingObjs,
    factory: makeTorus
  },
  '#awareness': {
    title: 'Awareness',
    objs: awarenessObjs,
    factory: makeCylinder
  },
  '#connection': {
    title: 'Connection',
    objs: connectionObjs,
    factory: makeSphere
  }
}

// add a name to each obeject, a ref to the in page anchor for the corresponding popup
Object.keys(data).forEach(function(key) {
  data[key].objs.forEach(function(obj, index) {
    obj.name = key + '-' + index
    obj.factory = data[key].factory
  })
})

function positions(){
  var res = {}
  Object.keys(data).forEach(function(key) {
    res[key] = []
    data[key].objs.forEach(function(obj, index) {
      var p = obj.position
      res[key].push([p.x, p.y, p.z,])
    })
  })
  console.log(JSON.stringify(res))
}

$(document).on('keydown', function (evt) {
  if (evt.keyCode === 27) {
    $('.fullscreen').hide()
    $("#mask").hide()
    $('.fullscreen .lhs').empty()
  }
})

$('.close, #mask').on('click', function(){
  $('.fullscreen').hide()
  $("#mask").hide()
  $('.fullscreen .lhs').empty()
})

$('.tryme.collapse').collapse()



