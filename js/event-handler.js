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
      currentMesh.visible = false;	
    }
    currentMesh = mesh;
    const scaleNum = (function (num) {
      return 1 + num * 0.1;
    });

    if (currentMesh == scene.getObjectByName("Corriente")) {
      res = prompt("¿Cuál es la resistencia?");
      vol = prompt("¿Cuál es el voltaje?");
      corr = (vol / res).toFixed(2);

      document.getElementById("demo").innerHTML =
        "Valor del Voltaje(V) = " + vol + " volts";
      document.getElementById("demo1").innerHTML =
        "Valor de la Corriente(I) = " + corr + " amperes";
      document.getElementById("demo2").innerHTML =
        "Valor de la Resistencia(R) = " + res + " ohms";

      currentMesh.scale.set(scaleNum(corr), scaleNum(corr), 0);

      scene
        .getObjectByName("Resistencia")
        .scale.set(scaleNum(res), scaleNum(res), 0);
      scene
        .getObjectByName("Voltaje")
        .scale.set(scaleNum(vol), scaleNum(vol), 0);

      light.intensity = vol / 24;
    } else if (currentMesh == scene.getObjectByName("Voltaje")) {
      corr = prompt("¿Cuál es la corriente?");
      res = prompt("¿Cuál es la resistencia?");
      vol = (corr * res).toFixed(2);
      document.getElementById("demo").innerHTML =
        "Valor del Voltaje(V) = " + vol + " volts";
      document.getElementById("demo1").innerHTML =
        "Valor de la Corriente(I) = " + corr + " amperes";
      document.getElementById("demo2").innerHTML =
        "Valor de la Resistencia(R) = " + res + " ohms";
      currentMesh.scale.set(scaleNum(vol), scaleNum(vol), 0);

      scene
        .getObjectByName("Resistencia")
        .scale.set(scaleNum(res), scaleNum(res), 0);

      scene
        .getObjectByName("Corriente")
        .scale.set(scaleNum(corr), scaleNum(corr), 0);

      light.intensity = vol / 24;
    } else {
      corr = prompt("¿Cuál es la corriente?");
      vol = prompt("¿Cuál es el voltaje?");
      res = (vol / corr).toFixed(2);
      document.getElementById("demo").innerHTML =
        "Valor del Voltaje(V) = " + vol + " volts";
      document.getElementById("demo1").innerHTML =
        "Valor de la Corriente(I) = " + corr + " amperes";
      document.getElementById("demo2").innerHTML =
        "Valor de la Resistencia(R) = " + res + " ohms";
      currentMesh.scale.set(scaleNum(res), scaleNum(res), 0);

      scene
        .getObjectByName("Corriente")
        .scale.set(scaleNum(corr), scaleNum(corr), 0);

      scene
        .getObjectByName("Voltaje")
        .scale.set(scaleNum(vol), scaleNum(vol), 0);

      light.intensity = vol / 24;
    }
    currentMesh = mesh;
  } else {
    if (currentMesh) {
      currentMesh.visible = true;
    }
    currentMesh = undefined;
    scene.getObjectByName("Corriente").scale.set(1, 1, 0);
    scene.getObjectByName("Voltaje").scale.set(1, 1, 0);
    scene.getObjectByName("Resistencia").scale.set(1, 1, 0);
    camera.position.set(0, 0.5, 10);
  }
}
