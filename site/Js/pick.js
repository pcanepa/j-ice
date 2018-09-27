function setPicking(form) {
	if (form.checked) {
		runJmolScriptWait('showSelections TRUE; select none;halos on; ');
		colorWhat = "color atom";
	} else {
		runJmolScriptWait('select none;');
	}
	return colorWhat;
}

function setPickingDelete(form) {
	runJmolScriptWait("select none; halos off;" +
			"draw off; showSelections TRUE; select none;");
	var plane = checkBoxX('byplane');
	var sphere = checkBoxX('bydistance');
	if (form.checked) {
		if (plane == 'on' || sphere == 'on') {
			runJmolScriptWait('halos on; ');
		} else {
			runJmolScriptWait('showSelections TRUE; halos on;');
			deleteMode = "delete selected";
		}
	}
	if (!form.checked)
		runJmolScriptWait('select none; halos off;');
	return deleteMode;
}

function setPickingHide(form) {
	runJmolScriptWait("select none; halos off;" +
			"draw off; showSelections TRUE; select none;");

	var plane = checkBoxX('byplane');
	var sphere = checkBoxX('bydistance');
	if (form.checked) {
		if (plane == 'on' || sphere == 'on') {
			runJmolScriptWait('showSelections TRUE; halos on; ');
		} else {
			runJmolScriptWait('showSelections TRUE; select none; halos on; ');
		}
		hideMode = " hide selected";
	} else {
		runJmolScriptWait('select none; halos off; label off;');
	}
	return hideMode;
}


/*
 * display within(0,plane,@{plane({atomno=3}, {0 0 0}, {0 1/2 1/2})})
 * 
 * The parametric equation ax + by + cz + d = 0 is expressed as {a b c d}.
 * 
 * Planes based on draw and isosurface objects are first defined with an ID
 * indicated, for example:
 * 
 * draw plane1 (atomno=1) (atomno=2) (atomno=3)
 * 
 * After that, the reference $plane1 can be used anywhere a plane expression is
 * required. For instance,
 * 
 * select within(0,plane, $plane1)
 */

var pickingEnabled = false;
var counterHide = 0;
var selectedAtoms = [];
var sortquestion = null;
var selectCheckbox = null;
var menuCallback = null;

function onClickPickPlane(checkbox, callback) {
	menuCallback = callback;
	selectCheckbox = checkbox;
	if (!checkbox || checkbox.checked) {
		selectPlane();
	} else {
		runJmolScriptWait('select none; halos off;draw off; showSelections TRUE; select none;');
	}
}

function selectPlane() {
	var miller = prompt("In order to extract a 2D map from a 3D file you need to select a plane. \n" +
			" If you want to select a Miller plane, enter three Miller indices here. \n" +
			" If you want to pick three atoms to define the plane, leave this blank.", "").trim();
	if (miller === null)
		return;
	if (miller) {
		runJmolScriptWait('draw delete; draw plane1 HKL {' + miller + '};draw off;');
		menuCallback && menuCallback();
		return true;			
	} else {
		runJmolScriptWait("draw off; showSelections TRUE; select none; halos on;");
		messageMsg('Select in sequence three atoms to define the plane.');
		startPicking();
	}
}

function startPicking() {
	selectedAtoms = [];
	counterHide = 0;
	pickingEnabled = true;
	runJmolScriptWait("pickedlist = []");
	setPickingCallbackFunction(pickPlaneCallback);
}

function cancelPicking() {
	setPickingCallbackFunction(null);
	pickingEnabled = false;
	runJmolScriptWait("select none; halos off; draw off; showSelections TRUE; select none;");
	if (selectCheckbox)
		uncheckBox(selectCheckbox);
}

function setDistanceHide(checkbox) {
	selectCheckbox = checkbox;
	if (checkbox.checked) {
		setStatus('Select the central atom around which you want to select atoms.');
		pickingEnabled = true;
		setPickingCallbackFunction(pickDistanceCallback);
		runJmolScriptWait("showSelections TRUE; select none; halos on;");
	} else {
		runJmolScriptWait('select none; halos off;');
	}
}

function pickPlaneCallback() {
	if (pickingEnabled) {
		runJmolScriptWait("select pickedList");
		var picklist = Jmol.evaluateVar(jmolApplet0, "pickedlist");
		if (picklist.length < 3) {
			setStatus('Select another atom.');
			return false;
		}
		cancelPicking();
		runJmolScriptWait('draw delete; draw plane1 PLANE @pickedlist;draw off');
		menuCallback && menuCallback();
		return true;			
	}
}

function pickDistanceCallback() {
	if (pickingEnabled == true) {
		runJmolScriptWait("select picked");
		var distance = prompt('Enter the distance (in \305) within you want to select atoms.', '2.0');
		if (distance != null && distance != "") {
			runJmolScriptWait('select within(' + distance + ',picked); draw sphere1 width ' + distance + '  {picked} translucent;');
			hideMode = " hide selected";
			deleteMode = " delete selected";
			colorWhat = "color atoms";
			cancelPicking();
			return true;
		}
	}

}

