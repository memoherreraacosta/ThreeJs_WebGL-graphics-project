"use strict";
var canvas;
var engine;
var scene;
var camera;
var person = { height: 1.8 };
var light;
var cube, sphere, cone, circle, cylinder;
var guiControls;
var currentMesh = undefined;
var res;
var vol;
var corr;
var geometry;
var textMesh;
var textMat;
var loader;

function update() {}

function renderLoop() {
  engine.render(scene, camera);
  update();
  requestAnimationFrame(renderLoop);
}

function main() {
  // CANVAS
  canvas = document.getElementById("canvas");

  // RENDERER ENGINE
  engine = new THREE.WebGLRenderer({ canvas: canvas });
  engine.setSize(window.innerWidth, window.innerHeight);
  engine.setClearColor(new THREE.Color(0.2, 0.2, 0.35), 1);

  // MODELS
  // CUBE

  cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(),
    new THREE.MeshBasicMaterial()
  );
  cube.name = "Corriente";
  cube.visible = false;

  // SPHERE
  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshBasicMaterial()
  );
  sphere.name = "Resistencia";
  sphere.visible = false;

  // CONE
  cone = new THREE.Mesh(
    new THREE.ConeGeometry(),
    new THREE.MeshBasicMaterial()
  );
  cone.name = "Voltaje";
  cone.visible = false;

  loader = new THREE.FontLoader();
  loader.load("https://threejs.org/examples/fonts/gentilis_regular.typeface.json", function (font) {
    geometry = new THREE.TextGeometry(
      "Hello three.js!",
      {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5,
      }
    );
  },
  () => {}, // On progress callback
  (e) => { // On error callback
    console.log(e);
  });

  // SCENEGRAPH
  scene = new THREE.Scene();
  scene.add(cube); // CUBO
  scene.add(sphere); // SPHERE
  scene.add(cone); // CONE

  textMesh = new THREE.Mesh(
    geometry,
    new THREE.MeshLambertMaterial({ color: 0xff00ff })
  );
  scene.add(textMesh);

  // CAMERA
  camera = new THREE.PerspectiveCamera(
    60,
    canvas.width / canvas.height,
    0.01,
    10000
  ); // CAMERA
  camera.position.set(0, person.height, 3);
  var controls = new THREE.OrbitControls(camera, canvas);
  scene.add(camera);

  // LIGHTS
  light = new THREE.AmbientLight();
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
