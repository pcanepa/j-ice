var frameSelection = null;
var frameNum = null;
var frameValue = null;

function setFrameValues(i) {
	frameSelection = null;
	frameNum = null;
	frameValue = null;
	frameSelection = "{1." + i + "}";
	frameNum = "1." + i;
	frameValue = i;
	if (i == null || i == "") {
		frameSelection = "{1.1}";
		frameNum = "1.1";
		frameValue = 1;
	}
}

function showFrame(model) {
	//BH: Java comment: This shows a frame once clicked on the lateral list
	runJmolScriptWait("frame " + model);
	setFrameValues(model);
	getUnitcell(model);
}
