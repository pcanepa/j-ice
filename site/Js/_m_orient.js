function enterOrient() {
	slabSlider.setValue(100 - jmolEvaluate("slab"));
	depthSlider.setValue(100 - jmolEvaluate("depth"));
	if (jmolEvaluate("slabEnabled") == "true")
		checkBox("slabToggle");
	else
		uncheckBox("slabToggle");
}

function exitOrient() {
}

function applySlab(x) {
	getbyID('slabMsg').innerHTML = x + "%" // display
	runJmolScriptWait("slab " + (100 - x) + ";")
}

function applyDepth(x) { // alternative displays:
	getbyID('depthMsg').innerHTML = (100 - x) + "%" // 100%
	runJmolScriptWait("depth " + (100 - x) + ";")
}

function toggleSlab() {
	var ctl = getbyID("slabToggle")
	if (ctl.checked) {
		runJmolScriptWait("slab on;");
//		applySlab(slabSlider.getValue());
//		applyDepth(depthSlider.getValue());
//		slabSlider.setValue(20);
//		applySlab(defaultFront);
//		depthSlider.setValue(defaultBack);
//		applyDepth(defaultBack);
	} else {
		runJmolScriptWait("slab off; ")
//		slabSlider.setValue(0);
//		depthSlider.setValue(0);
	}
}

//This controls the refined motion of the structure
var motion = "";
function setKindMotion(valueList) {
	motion = valueList;
	if (motion == "select")
		errorMsg("Please select the motion");
	return motion;
}

function setMotion(axis) {
	var magnitudeMotion = getbyID("fineOrientMagn").value;

	if (motion == "select" || motion == "") {
		errorMsg("Please select the motion");
		return false;
	}

	// /(motion == "translate" )? (makeDisable("-z") + makeDisable("z")) :
	// (makeEnable("-z") + makeEnable("z"))

	if (magnitudeMotion == "") {
		errorMsg("Please, check value entered in the textbox");
		return false;
	}

	var stringa = "Selected" + " " + axis + " " + magnitudeMotion;
	if (motion == "translate" && (axis == "-x" || axis == "-y" || axis == "-z")) {
		axis = axis.replace("-", "");
		stringa = "Selected" + " " + axis + " -" + magnitudeMotion;
	}

	stringa = motion + (getbyID("moveByselection").checked ? "Selected " : " ") + stringa;
	 
	runJmolScriptWait(stringa);


}

