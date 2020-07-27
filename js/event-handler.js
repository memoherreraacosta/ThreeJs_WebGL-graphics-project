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
      scene.getObjectByName("Resistencia").scale.x = res;
      scene.getObjectByName("Resistencia").scale.y = res;
      scene.getObjectByName("Resistencia").scale.z = res;
      scene.getObjectByName("Voltaje").scale.x = vol;
      scene.getObjectByName("Voltaje").scale.y = vol;
      scene.getObjectByName("Voltaje").scale.z = vol;
      scene.getObjectByName("Corriente").scale.x = corr;
      scene.getObjectByName("Corriente").scale.y = corr;
      scene.getObjectByName("Corriente").scale.z = corr;
      res = prompt("Cual es la resistencia");
      vol = prompt("Cual es el voltaje");
      document.getElementById("demo").innerHTML =
        "Valor de la Corriente= " + vol / res;
      corr = vol/res;
      currentMesh.scale.x = corr*0.5;
      currentMesh.scale.y = corr*0.5;
      currentMesh.scale.z = corr* 0.5;
      scene.getObjectByName("Resistencia").scale.x = res*0.5;
      scene.getObjectByName("Resistencia").scale.y = res*0.5;
      scene.getObjectByName("Resistencia").scale.z = res*0.5;
      scene.getObjectByName("Voltaje").scale.x = vol*0.5;
      scene.getObjectByName("Voltaje").scale.y = vol*0.5;
      scene.getObjectByName("Voltaje").scale.z = vol*0.5;
      //camera.position.set(0, 0.5, corr*0.3);

    } else if (currentMesh == scene.getObjectByName("Voltaje")) {
      //camera.position.set(0, 0.5, 10);
      scene.getObjectByName("Resistencia").scale.x = res;
      scene.getObjectByName("Resistencia").scale.y = res;
      scene.getObjectByName("Resistencia").scale.z = res;
      scene.getObjectByName("Voltaje").scale.x = vol;
      scene.getObjectByName("Voltaje").scale.y = vol;
      scene.getObjectByName("Voltaje").scale.z = vol;
      scene.getObjectByName("Corriente").scale.x = corr;
      scene.getObjectByName("Corriente").scale.y = corr;
      scene.getObjectByName("Corriente").scale.z = corr;
      corr = prompt("Cual es la corriente");
      res = prompt("Cual es la resistencia");
      document.getElementById("demo").innerHTML =
        "Valor del Voltaje= " + corr * res;
      vol = corr*res;
      currentMesh.scale.x = vol*0.5;
      currentMesh.scale.y = vol*0.5;
      currentMesh.scale.z = vol*0.5;
      scene.getObjectByName("Resistencia").scale.x = res*0.5;
      scene.getObjectByName("Resistencia").scale.y = res*0.5;
      scene.getObjectByName("Resistencia").scale.z = res*0.5;
      scene.getObjectByName("Corriente").scale.x = corr*0.5;
      scene.getObjectByName("Corriente").scale.y = corr*0.5;
      scene.getObjectByName("Corriente").scale.z = corr*0.5;
      //camera.position.set(0, 0.5, vol*0.3);
    } else {
      //scamera.position.set(0, 0.5, 10);
      scene.getObjectByName("Resistencia").scale.x = res;
      scene.getObjectByName("Resistencia").scale.y = res;
      scene.getObjectByName("Resistencia").scale.z = res;
      scene.getObjectByName("Voltaje").scale.x = vol;
      scene.getObjectByName("Voltaje").scale.y = vol;
      scene.getObjectByName("Voltaje").scale.z = vol;
      scene.getObjectByName("Corriente").scale.x = corr;
      scene.getObjectByName("Corriente").scale.y = corr;
      scene.getObjectByName("Corriente").scale.z = corr;
      corr = prompt("Cual es la corriente");
      vol = prompt("Cual es el voltaje");
      document.getElementById("demo").innerHTML =
        "Valor de la Resistencia= " + vol / corr;
      res = vol/corr;
      currentMesh.scale.x = res*0.5;
      currentMesh.scale.y = res*0.5;
      currentMesh.scale.z = res*0.5;
      scene.getObjectByName("Corriente").scale.x = corr*0.5;
      scene.getObjectByName("Corriente").scale.y = corr*0.5;
      scene.getObjectByName("Corriente").scale.z = corr*0.5;
      scene.getObjectByName("Voltaje").scale.x = vol*0.5;
      scene.getObjectByName("Voltaje").scale.y = vol*0.5;
      scene.getObjectByName("Voltaje").scale.z = vol*0.5;
      //camera.position.set(0, 0.5, res*0.3);
    }
    currentMesh = mesh;
  } else {
    //camera.position.set(0, 0.5, 10);
    if (currentMesh) {
      currentMesh.visible = false;
    }
    currentMesh = undefined;
    scene.getObjectByName("Corriente").scale.x = corr;
    scene.getObjectByName("Corriente").scale.y = corr;
    scene.getObjectByName("Corriente").scale.z = corr;
    scene.getObjectByName("Voltaje").scale.x = vol;
    scene.getObjectByName("Voltaje").scale.y = vol;
    scene.getObjectByName("Voltaje").scale.z = vol;
    scene.getObjectByName("Resistencia").scale.x = res;
    scene.getObjectByName("Resistencia").scale.y = res;
    scene.getObjectByName("Resistencia").scale.z = res;
  }
}
