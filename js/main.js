"use strict";
var canvas;
var engine;
var scene;
var camera;
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
var mesh;


function update() {}

function renderLoop() {
  engine.render(scene, camera);
  update();
  requestAnimationFrame(renderLoop);
}
loader = new THREE.FontLoader();
loader.load(
  "fonts/Roboto_Regular.json",
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
  "fonts/Roboto_Regular.json",
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
  "fonts/Roboto_Regular.json",
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
  textMeshV.position.y = 2;
  textMeshV.name = "Voltaje";

  textMeshI = new THREE.Mesh(
    geometryI,
    new THREE.MeshLambertMaterial({ color: 0x00ff00 })
  );
  textMeshI.position.x = 0;
  textMeshI.position.y = 2;
  textMeshI.name = "Corriente";

  textMeshR = new THREE.Mesh(
    geometryR,
    new THREE.MeshLambertMaterial({ color: 0x0000ff })
  );
  textMeshR.position.x = 6;
  textMeshR.position.y = 2;
  textMeshR.name = "Resistencia";

  // SCENEGRAPH
  scene = new THREE.Scene();
  scene.add(textMeshV);
  scene.add(textMeshI);
  scene.add(textMeshR);
  //scene.add(meshAtom);

  //3D Obj

  objLoader = new THREE.OBJLoader();
  objLoader.setPath("./models/");

  var fileName = "Atom.obj";
  objLoader.load(fileName, function (obj) {
    obj.scale.set(0.002,0.002,0.002);
    obj.position.x = -6;
    obj.position.y = -3;
    scene.add(obj);
  });

  fileName = "Battery.obj";
  objLoader.load(fileName, function (obj) {
    obj.scale.set(0.07,0.07,0.07);
    obj.position.x = 0;
    obj.position.y = -3;
    scene.add(obj);
  });

  fileName = "Lightbulb.obj";
  objLoader.load(fileName, function (obj) {
    obj.scale.set(0.8,0.8,0.8);
    obj.position.x = 6;
    obj.position.y = -1.5;
    scene.add(obj);
  });


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
