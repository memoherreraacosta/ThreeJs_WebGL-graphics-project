"use strict";
var canvas;
var engine;
var scene;
var camera;
var person = { height: 1.8 };
//var light;
var circle, cylinder;
var guiControls;
var currentMesh = undefined;
var res;
var vol;
var corr;
var geometryV, geometryI, geometryR;
var textMeshV, textMeshI, textMeshR;
var textMat;
var loader, objLoader;
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
loader.load(
  "https://threejs.org/examples/fonts/gentilis_regular.typeface.json",
  function (font) {
    geometryV = new THREE.TextGeometry("V", {
      font: font,
      size: 0.8,
      height: 0.2,
      curveSegments: 2,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 2,
      bevelOffset: 0,
      bevelSegments: 2,
    });
  },
  () => {}, // On progress callback
  (e) => {
    // On error callback
    console.log(e);
  }
);

loader.load(
  "https://threejs.org/examples/fonts/gentilis_regular.typeface.json",
  function (font) {
    geometryI = new THREE.TextGeometry("I", {
      font: font,
      size: 0.8,
      height: 0.2,
      curveSegments: 2,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 2,
      bevelOffset: 0,
      bevelSegments: 2,
    });
  },
  () => {}, // On progress callback
  (e) => {
    // On error callback
    console.log(e);
  }
);

loader.load(
  "https://threejs.org/examples/fonts/gentilis_regular.typeface.json",
  function (font) {
    geometryR = new THREE.TextGeometry("R", {
      font: font,
      size: 0.8,
      height: 0.2,
      curveSegments: 2,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 2,
      bevelOffset: 0,
      bevelSegments: 2,
    });
  },
  () => {}, // On progress callback
  (e) => {
    // On error callback
    console.log(e);
  }
);

function main() {
  // CANVAS
  canvas = document.getElementById("canvas");

  // RENDERER ENGINE
  engine = new THREE.WebGLRenderer({ canvas: canvas });
  engine.setSize(window.innerWidth, window.innerHeight);
  engine.setClearColor(new THREE.Color(0.5, 0.5, 0.5), 1);

  // MODELS

  textMeshV = new THREE.Mesh(
    geometryV,
    new THREE.MeshLambertMaterial({ color: 0xff0000 })
  );
  textMeshV.position.x = -6;
  textMeshV.name = "Voltaje";

  textMeshI = new THREE.Mesh(
    geometryI,
    new THREE.MeshLambertMaterial({ color: 0x00ff00 })
  );
  textMeshI.position.x = 0;
  textMeshI.name = "Corriente";

  textMeshR = new THREE.Mesh(
    geometryR,
    new THREE.MeshLambertMaterial({ color: 0x0000ff })
  );
  textMeshR.position.x = 6;
  textMeshR.name = "Resistencia";

  /*
  // 3D Obj
  objLoader = new THREE.OBJLoader();
  objLoader.setPath("./models/");

  var fileName = "Atom.obj";
  objLoader.load(fileName, function (obj) {
    mesh = new THREE.Mesh(
      obj,
      new THREE.MeshBasicMaterial({ wireframe: true })
    );
    scene.add(mesh);
  });

  fileName = "Battery.obj";
  objLoader.load(fileName, function (obj) {
    mesh = new THREE.Mesh(
      obj,
      new THREE.MeshBasicMaterial({ wireframe: true })
    );
    scene.add(mesh);
  });

  fileName = "Lightbulb.obj";
  objLoader.load(fileName, function (obj) {
    mesh = new THREE.Mesh(
      obj,
      new THREE.MeshBasicMaterial({ wireframe: true })
    );
    scene.add(mesh);
  });
  */

  // SCENEGRAPH
  //scene = new THREE.Scene();
  scene = new THREE.Scene();
  scene.add(textMeshV);
  scene.add(textMeshI);
  scene.add(textMeshR);

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
  for (var i = 0; i < scene.children.length - 2; i++) {
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
