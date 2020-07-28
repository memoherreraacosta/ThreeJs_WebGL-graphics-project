"use strict";
var canvas;
var engine;
var scene;
var camera;
var person = { height: 1.8 };
//var light;
var cube, sphere, cone, circle, cylinder;
var guiControls;
var currentMesh = undefined;
var res;
var vol;
var corr;
var geometryV, geometryI, geometryR;
var textMeshV, textMeshI, textMeshR;
var textMat;
var loader;
var color = 0xFFFFFF;
var intensity = 10;
var light;

function update() {}

function renderLoop() {
  engine.render(scene, camera);
  update();
  requestAnimationFrame(renderLoop);
}

loader = new THREE.FontLoader();
loader.load("https://threejs.org/examples/fonts/gentilis_regular.typeface.json", function (font) {
  geometryV = new THREE.TextGeometry(
    "V",
    {
      font: font,
      size: 0.8,
      height: 0.2,
      curveSegments: 2,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 2,
      bevelOffset: 0,
      bevelSegments: 2,
    }
  );
},
() => {}, // On progress callback
(e) => { // On error callback
  console.log(e);
}
);

loader.load("https://threejs.org/examples/fonts/gentilis_regular.typeface.json", function (font) {
  geometryI = new THREE.TextGeometry(
    "I",
    {
      font: font,
      size: 0.8,
      height: 0.2,
      curveSegments: 2,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 2,
      bevelOffset: 0,
      bevelSegments: 2,
    }
  );

},
() => {}, // On progress callback
(e) => { // On error callback
  console.log(e);
});

loader.load("https://threejs.org/examples/fonts/gentilis_regular.typeface.json", function (font) {
  geometryR = new THREE.TextGeometry(
    "R",
    {
      font: font,
      size: 0.8,
      height: 0.2,
      curveSegments: 2,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 2,
      bevelOffset: 0,
      bevelSegments: 2,
    }
  );
},
() => {}, // On progress callback
(e) => { // On error callback
  console.log(e);
});

function main() {
  // CANVAS
  canvas = document.getElementById("canvas");

  // RENDERER ENGINE
  engine = new THREE.WebGLRenderer({ canvas: canvas });
  engine.setSize(window.innerWidth, window.innerHeight);
  engine.setClearColor(new THREE.Color(0.5, 0.5, 0.5), 1);

  // MODELS
  // CUBE

  cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(),
    new THREE.MeshBasicMaterial()
  );
  //cube.name = "Corriente";
  //cube.visible = false;

  // SPHERE
  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshBasicMaterial()
  );
  //sphere.name = "Resistencia";
  //sphere.visible = false;

  // CONE
  cone = new THREE.Mesh(
    new THREE.ConeGeometry(),
    new THREE.MeshBasicMaterial()
  );
  //cone.name = "Voltaje";
  //cone.visible = false;

  textMeshV = new THREE.Mesh(
      geometryV,
      new THREE.MeshLambertMaterial({ color: 0xff0000 })
    );
    textMeshV.position.x = -6;
    textMeshV.name = "Voltaje";
    //textMeshV.visible = false;
    //scene.add(textMeshV);

  textMeshI = new THREE.Mesh(
      geometryI,
      new THREE.MeshLambertMaterial({ color: 0x00ff00 })
    );
    textMeshI.position.x = 0;
    textMeshI.name = "Corriente";
    //textMeshI.visible = false;
    //scene.add(textMeshI);

  textMeshR = new THREE.Mesh(
      geometryR,
      new THREE.MeshLambertMaterial({ color: 0x0000ff })
    );
    textMeshR.position.x = 6;
    textMeshR.name = "Resistencia";
    //textMeshR.visible = false;
    //scene.add(textMeshR);

    //Light

  // SCENEGRAPH

  //scene = new THREE.Scene();
  scene = new THREE.Scene();
  //scene.add(cube); // CUBO
  //scene.add(sphere); // SPHERE
  //scene.add(cone); // CONE
  scene.add(textMeshV);
  scene.add(textMeshI);
  scene.add(textMeshR);

  console.log(res);
  console.log(vol);

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    60,
    canvas.width / canvas.height,
    0.01,
    10000
  ); // CAMERA
  camera.position.set(0, 0.5, 10);
  var controls = new THREE.OrbitControls(camera, canvas);
  scene.add(camera);

  // LIGHTS
  light = new THREE.AmbientLight(0x404040, 5);
  scene.add(light);

  // GUI
  var nameList = ["Select"];
  for (var i = 0; i < scene.children.length; i++) {
    nameList.push(scene.children[i].name);
  }

  guiControls = { valList: "Select" };
  var datGui = new dat.GUI();
  var list = datGui.add(guiControls, "valList", nameList).name("Valores");
  datGui.close();

  // EVENT-HANDLERS
  window.addEventListener("resize", resizeWindow, false);
  list.onChange(listOnChange);

  // ACTION
  requestAnimationFrame(renderLoop);
}
