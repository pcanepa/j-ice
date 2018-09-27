function enterMeasure() {

}

function exitMeasure() {
	measureCoord = false;
}

var kindCoord;
var measureCoord = false;
function viewCoord(value) {
	kindCoord = value;
	measureCoord = true;
	messageMsg("Pick the atom you are interested in, please.");
	setPickingCallbackFunction(showCoord);
	runJmolScriptWait("select *; label off"
			+ 'set defaultDistanceLabel "%2.7VALUE %UNITS"'
			+ 'showSelections TRUE; select none; set picking ON;set picking LABEL; set picking SELECT atom; halos on; set LABEL on;');
}

function showCoord() {
	if (measureCoord) {
		if (kindCoord == "fractional") {
			runJmolScriptWait('Label "%a: %.2[fX] %.2[fY] %.2[fZ]"');
		} else {
			runJmolScriptWait('Label "%a: %1.2[atomX] %1.2[atomY] %1.2[atomZ]"');
		}
	}
}
var unitMeasure = "";
function setMeasureUnit(value) {
	unitMeasure = value;
	runJmolScriptWait("set measurements " + value);
}

function setMeasurement() {
	runJmolScriptWait("set measurements ON");
}

var mesCount = 0;
function checkMeasure(value) {
	var radiobutton = value;
	var unit = getbyID('measureDist').value;
	mesReset();
	runJmolScriptWait('set pickingStyle MEASURE ON; set MeasureCallback "measuramentCallback";');
	if (radiobutton == "distance") {
		if (unit == 'select') {
			measureHint('Select the desired measure unit.');
			uncheckRadio("distance");
			return false;
		}
		measureHint('Pick two atoms');
		runJmolScriptWait('set defaultDistanceLabel "%2.3VALUE %UNITS";'
				+ 'showSelections TRUE; select none;  label on ; set picking on; set picking LABEL; set picking SELECT atom; set picking DISTANCE;'
				+ "measure ON; set measurements ON; set showMeasurements ON; set measurements ON; set measurementUnits "
				+ unit + ";set picking MEASURE DISTANCE;" + "set measurements "
				+ unit + ";" + 'label ON;');

	} else if (radiobutton == "angle") {
		measureHint('Pick three atoms');
		runJmolScriptWait('set defaultAngleLabel "%2.3VALUE %UNITS";'
				+ 'showSelections TRUE; select none;  label on ; set picking on; set picking LABEL; set picking SELECT atom; set picking ANGLE;'
				+ "measure ON; set measurements ON; set showMeasurements ON; set picking MEASURE ANGLE;"
				+ 'set measurements ' + unitMeasure + ';label ON');
	} else if (radiobutton == "torsional") {
		measureHint('Pick four atoms');
		runJmolScriptWait('set defaultTorsionLabel "%2.3VALUE %UNITS";'
				+ 'showSelections TRUE; select none;  label on ; set picking on; set picking TORSION; set picking SELECT atom; set picking ANGLE;'
				+ 'measure ON; set measurements ON; set showMeasurements ON; set picking MEASURE TORSION;label ON');
	}
	setMeasureText()

}

var measureHint = function(msg) {
	// BH 2018
	document.measureGroup.textMeasure.value = msg + "...";
}

function setMeasureSize(value) {
	runJmolScriptWait("select *; font label " + value + " ; font measure "
			+ value + " ; select none;");
}

function setMeasureText(value) {
	runJmolScriptWait("show measurements");
	var init = "\n";
	// BH 2018
	if (mesCount == 0)
		document.measureGroup.textMeasure.value = init = '';
	document.measureGroup.textMeasure.value += init + ++mesCount + " " + value;
}

function mesReset() {
	mesCount = 0;
	getbyID("textMeasure").value = "";
	runJmolScriptWait('set pickingStyle MEASURE OFF; select *; label off; halos OFF; selectionHalos OFF; measure OFF; set measurements OFF; set showMeasurements OFF;  measure DELETE;');
}

function measuramentCallback(a, b, c, d, e) {
	setMeasureText(b);
}