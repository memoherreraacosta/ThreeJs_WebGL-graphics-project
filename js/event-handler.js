// Resets the canvas dimensions to match window
function resizeWindow(event)
{   
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    engine.setSize(canvas.width, canvas.height);
    camera.aspect = canvas.width / canvas.height;
    camera.updateProjectionMatrix();
}

function listOnChange(event)
{
	if(event != "Select")
	{
		var mesh = scene.getObjectByName(event);
		mesh.visible = true;
		if(currentMesh)
		{
			currentMesh.visible = false;
		}
		currentMesh = mesh;
		if(currentMesh == scene.getObjectByName("Corriente")){
			res = prompt("Cual es la resistencia");
			vol = prompt("Cual es el voltaje");
			document.getElementById("demo").innerHTML = 'Valor de la Corriente= ' + (vol/res);
		}else if(currentMesh == scene.getObjectByName("Voltaje")){
			corr = prompt("Cual es la corriente");
			res = prompt("Cual es la resistencia");
			document.getElementById("demo").innerHTML = 'Valor del Voltaje= ' + (corr*res);
		}else{
			corr = prompt("Cual es la corriente");
			vol = prompt("Cual es el voltaje");
			document.getElementById("demo").innerHTML = 'Valor de la Resistencia= ' + (vol/corr);
		}
		currentMesh = mesh;
	}
	else
	{
		if(currentMesh)
		{
			currentMesh.visible = false;
		}
		currentMesh = undefined;
	}
}




