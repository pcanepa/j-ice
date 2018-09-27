function enterOther() {
	setValuesOther();	
}

function exitOther() {
}


function setValuesOther() {
// show lighting
//	  set ambientPercent 45;
//	  set diffusePercent 84;
//	  set specular true;
//	  set specularPercent 22;
//	  set specularPower 40;
//	  set specularExponent 6;
//	  set celShading false;
//	  set celShadingPower 10;
//	  set zShadePower 3;
//	  set zDepth 0;
//	  set zSlab 50;
//	  set zShade false;
	
	cameraDepthSlider.setValue(jmolEvaluate("cameraDepth") * 25);
	SpecularPercentSlider.setValue(jmolEvaluate("specularPercent"));
	AmbientPercentSlider.setValue(jmolEvaluate("ambientPercent"));
	DiffusePercentSlider.setValue(jmolEvaluate("diffusePercent"));
//	getbyID("SpecularPercentMsg").innerHTML = 40 + " %";
//	getbyID("AmbientPercentMsg").innerHTML = 40 + " %";
//	getbyID("DiffusePercentMsg").innerHTML = 40 + " %";

}

function applyCameraDepth(depth) {
	runJmolScriptWait("set cameraDepth " + depth + ";")
	getbyID("cameraDepthMsg").innerHTML = depth
}

function applySpecularPercent(x) {
	runJmolScriptWait(" set specularPercent " + x + ";");
	getbyID("SpecularPercentMsg").innerHTML = x + "%";
}

function applyAmbientPercent(x) {
	runJmolScriptWait(" set ambientPercent " + x + ";");
	getbyID("AmbientPercentMsg").innerHTML = x + "%";
}

function applyDiffusePercent(x) {
	runJmolScriptWait(" set diffusePercent " + x + ";");
	getbyID("DiffusePercentMsg").innerHTML = x + "%";
}

function setTextSize(value) {
	runJmolScriptWait("select *; font label " + value + " ;");
}

function setFrameTitle(chkbox) {
	runJmolScriptWait(chkbox.checked ? "frame title" : "frame title ''");
}


