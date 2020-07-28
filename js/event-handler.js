// Resets the canvas dimensions to match window
function resizeWindow(event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  engine.setSize(canvas.width, canvas.height);
  camera.aspect = canvas.width / canvas.height;
  camera.updateProjectionMatrix();
}

function listOnChange(event) {
  if (event != "Select") {
    var mesh = scene.getObjectByName(event);
    mesh.visible = true;
    if (currentMesh) {
      currentMesh.visible = true;
    }
    currentMesh = mesh;
    const scaleNum = (function (num) {
      return 1 + num * 0.01;
    });

    if (currentMesh == scene.getObjectByName("Corriente")) {
      res = prompt("¿Cuál es la resistencia?");
      vol = prompt("¿Cuál es el voltaje?");
      corr = (vol / res).toFixed(2);

      document.getElementById("demo").innerHTML =
        "Voltaje(V) = " + vol + " volts";
      document.getElementById("demo1").innerHTML =
        "Corriente(I) = " + corr + " amperes";
      document.getElementById("demo2").innerHTML =
        "Resistencia(R) = " + res + " ohms";

      currentMesh.scale.set(scaleNum(corr), scaleNum(corr), 1);

      scene
        .getObjectByName("Resistencia")
        .scale.set(scaleNum(res), scaleNum(res), 1);
      scene
        .getObjectByName("Voltaje")
        .scale.set(scaleNum(vol), scaleNum(vol), 1);

      light.intensity = vol / 12;
    } else if (currentMesh == scene.getObjectByName("Voltaje")) {
      corr = prompt("¿Cuál es la corriente?");
      res = prompt("¿Cuál es la resistencia?");
      vol = (corr * res).toFixed(2);
      document.getElementById("demo").innerHTML =
        "Voltaje(V) = " + vol + " volts";
      document.getElementById("demo1").innerHTML =
        "Corriente(I) = " + corr + " amperes";
      document.getElementById("demo2").innerHTML =
        "Resistencia(R) = " + res + " ohms";
      currentMesh.scale.set(scaleNum(vol), scaleNum(vol), 1);

      scene
        .getObjectByName("Resistencia")
        .scale.set(scaleNum(res), scaleNum(res), 1);

      scene
        .getObjectByName("Corriente")
        .scale.set(scaleNum(corr), scaleNum(corr), 1);

      light.intensity = vol / 12;
    } else {
      corr = prompt("¿Cuál es la corriente?");
      vol = prompt("¿Cuál es el voltaje?");
      res = (vol / corr).toFixed(2);
      document.getElementById("demo").innerHTML =
        "Voltaje(V) = " + vol + " volts";
      document.getElementById("demo1").innerHTML =
        "Corriente(I) = " + corr + " amperes";
      document.getElementById("demo2").innerHTML =
        "Resistencia(R) = " + res + " ohms";
      currentMesh.scale.set(scaleNum(res), scaleNum(res), 1);

      scene
        .getObjectByName("Corriente")
        .scale.set(scaleNum(corr), scaleNum(corr), 1);

      scene
        .getObjectByName("Voltaje")
        .scale.set(scaleNum(vol), scaleNum(vol), 1);

      light.intensity = vol / 12;
    }
    currentMesh = mesh;
  } else {
    if (currentMesh) {
      currentMesh.visible = true;
    }
    currentMesh = undefined;
    scene.getObjectByName("Corriente").scale.set(1, 1, 1);
    scene.getObjectByName("Voltaje").scale.set(1, 1, 1);
    scene.getObjectByName("Resistencia").scale.set(1, 1, 1);
    camera.position.set(0, 0.5, 10);
  }
}
