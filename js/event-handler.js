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
      //currentMesh.visible = false;
    }
    currentMesh = mesh;
    if (currentMesh == scene.getObjectByName("Corriente")) {
      //camera.position.set(0, 0.5, 10);
      res = prompt("¿Cuál es la resistencia?");
      vol = prompt("¿Cuál es el voltaje?");
      corr = vol/res;
      document.getElementById("demo").innerHTML =
        "Valor del Voltaje = " + vol;
      document.getElementById("demo1").innerHTML =
        "Valor de la Corriente = " + vol / res;
      document.getElementById("demo2").innerHTML =
        "Valor de la Resistencia = " + res;
      currentMesh.scale.x = corr*0.1;
      currentMesh.scale.y = corr*0.1;
      currentMesh.scale.z = corr*0.1;
      scene.getObjectByName("Resistencia").scale.x = res*0.1;
      scene.getObjectByName("Resistencia").scale.y = res*0.1;
      scene.getObjectByName("Resistencia").scale.z = res*0.1;
      scene.getObjectByName("Voltaje").scale.x = vol*0.1;
      scene.getObjectByName("Voltaje").scale.y = vol*0.1;
      scene.getObjectByName("Voltaje").scale.z = vol*0.1;

      light.intensity = vol/24;
      //camera.position.set(0, 0.5, corr*0.3);

    } else if (currentMesh == scene.getObjectByName("Voltaje")) {
      //camera.position.set(0, 0.5, 10);
      corr = prompt("¿Cuál es la corriente?");
      res = prompt("¿Cuál es la resistencia?")
      vol = corr*res;;
      document.getElementById("demo").innerHTML =
        "Valor del Voltaje = " + corr * res;
      document.getElementById("demo1").innerHTML =
        "Valor de la Corriente = " + corr;
      document.getElementById("demo2").innerHTML =
        "Valor de la Resistencia = " + res;
      currentMesh.scale.x = vol*0.1;
      currentMesh.scale.y = vol*0.1;
      currentMesh.scale.z = vol*0.1;
      scene.getObjectByName("Resistencia").scale.x = res*0.1;
      scene.getObjectByName("Resistencia").scale.y = res*0.1;
      scene.getObjectByName("Resistencia").scale.z = res*0.1;
      scene.getObjectByName("Corriente").scale.x = corr*0.1;
      scene.getObjectByName("Corriente").scale.y = corr*0.1;
      scene.getObjectByName("Corriente").scale.z = corr*0.1;

      light.intensity = vol/24;
      //camera.position.set(0, 0.5, vol*0.3);
    } else {
      //scamera.position.set(0, 0.5, 10);
      corr = prompt("¿Cuál es la corriente?");
      vol = prompt("¿Cuál es el voltaje?");
      res = vol/corr;
      document.getElementById("demo").innerHTML =
        "Valor del Voltaje = " + vol;
      document.getElementById("demo1").innerHTML =
        "Valor de la Corriente = " + corr;
      document.getElementById("demo2").innerHTML =
        "Valor de la Resistencia = " + vol-corr;
      currentMesh.scale.x = res*0.1;
      currentMesh.scale.y = res*0.1;
      currentMesh.scale.z = res*0.1;
      scene.getObjectByName("Corriente").scale.x = corr*0.1;
      scene.getObjectByName("Corriente").scale.y = corr*0.1;
      scene.getObjectByName("Corriente").scale.z = corr*0.1;
      scene.getObjectByName("Voltaje").scale.x = vol*0.1;
      scene.getObjectByName("Voltaje").scale.y = vol*0.1;
      scene.getObjectByName("Voltaje").scale.z = vol*0.1;

      light.intensity = vol/24;
      //camera.position.set(0, 0.5, res*0.3);
    }
    currentMesh = mesh;
  } else {
    //camera.position.set(0, 0.5, 10);
    if (currentMesh) {
      currentMesh.visible = true;
    }
    currentMesh = undefined;
    scene.getObjectByName("Corriente").scale.x = 1;
    scene.getObjectByName("Corriente").scale.y = 1;
    scene.getObjectByName("Corriente").scale.z = 1;
    scene.getObjectByName("Voltaje").scale.x = 1;
    scene.getObjectByName("Voltaje").scale.y = 1;
    scene.getObjectByName("Voltaje").scale.z = 1;
    scene.getObjectByName("Resistencia").scale.x = 1;
    scene.getObjectByName("Resistencia").scale.y = 1;
    scene.getObjectByName("Resistencia").scale.z = 1;
    camera.position.set(0, 0.5, 10);
  }
}
