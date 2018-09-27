function enterEdit() {
	
}

function exitEdit() {
}

function showPickPlaneCallback() {
	var distance = prompt('Enter the distance (in \305) within you want to select atoms. \n Positive values mean from the upper face on, negative ones the opposite.', '1');
	if (distance != null && distance != "") {
		runJmolScriptWait('select within(' + distance + ',plane,$plane1)');
//		hideMode = " hide selected";
//		deleteMode = " delete selected";
//		colorWhat = "color atoms";
	}
}


var deleteMode = "";
var hideMode = "";
var displayMode = "";

var firstTimeEdit = true;
function enterEdit() {
	// BH 2018: Disabled -- unexpected behavior should not be on tab entry
//	if (firstTimeEdit) {
//		radiiConnectSlider.setValue(50);
//		runJmolScriptWait("set forceAutoBond ON; set bondMode AND");
//	}
//	getbyID("radiiConnectMsg").innerHTML = " " + 2.5 + " &#197";
//	setTimeout("runJmolScriptWait(\"restore BONDS bondEdit\");", 400);
//	firstTimeEdit = false;
}


function applyConnect(r) {
	if (firstTime) {
		runJmolScriptWait("connect (*) (*) DELETE; connect 2.0 (*) (*) single ModifyOrCreate;");
	} else {
		var flagBond = checkBoxX("allBondconnect");
		// alert(flagBond);
		// alert(frameNum);
		if (frameNum == null || frameNum == '') {
			getUnitcell("1");
			frameNum = 1.1;
		} else {

		}
		if (flagBond == 'off') {
			runJmolScriptWait("select " + frameNum
					+ "; connect  (selected) (selected)  DELETE");
			runJmolScriptWait("connect " + r
					+ " (selected) (selected) single ModifyOrCreate;");
		} else {
			runJmolScriptWait("connect (*) (*) DELETE; connect " + r
					+ " (*) (*) single ModifyOrCreate;");
		}
		runJmolScriptWait("save BONDS bondEdit");
	}
	getbyID('radiiConnectMsg').innerHTML = " " + r.toPrecision(2) + " &#197";
}

function deleteAtom() {
	runJmolScriptWait(deleteMode);
	runJmolScriptWait('draw off');
}

function hideAtom() {
	runJmolScriptWait(hideMode);
	runJmolScriptWait('draw off');
}

function connectAtom() {
	var styleBond = getValue("setBondFashion");
	if (styleBond == "select") {
		errorMsg("Please select type of bond!");
		return false;
	}

	if (radbondVal == "all") {
		if (radBondRange == "just") {
			var bondRadFrom = getValue("radiuscoonectFrom");
			if (bondRadFrom == "") {
				errorMsg("Please, check values entered in the textboxes");
				return false;
			}
			// alert(bondRadFrom)
			runJmolScriptWait("connect (all) (all) DELETE; connect " + bondRadFrom
					+ " (all) (all) " + styleBond + " ModifyOrCreate;");
		} else {
			var bondRadFrom = getValue("radiuscoonectFrom");
			var bondRadTo = getValue("radiuscoonectTo");
			if (bondRadFrom == "" && bondRadTo == "") {
				errorMsg("Please, check values entered in the textboxes.");
				return false;
			}
			if (bondRadTo <= bondRadFrom) {
				errorMsg("Please, check the range value entered.");
				return false;
			}
			runJmolScriptWait("connect (all) (all) DELETE; connect " + bondRadFrom + " "
					+ bondRadTo + " (all) (all) " + styleBond
					+ " ModifyOrCreate;");
		}
	} else if (radbondVal == "atom") {
		var atomFrom = getValue("connectbyElementList");
		var atomTo = getValue("connectbyElementListone");
		if (radBondRange == "just") {
			var bondRadFrom = getValue("radiuscoonectFrom");
			if (bondRadFrom == "") {
				errorMsg("Please, check values entered in the textboxes");
				return false;
			}
			// alert(bondRadFrom)
			runJmolScriptWait("connect (" + atomFrom + ") (" + atomTo + ") DELETE; connect "
					+ bondRadFrom + " (" + atomFrom + ") (" + atomTo + ") "
					+ styleBond + " ModifyOrCreate;");
		} else {
			var bondRadFrom = getValue("radiuscoonectFrom");
			var bondRadTo = getValue("radiuscoonectTo");
			if (bondRadFrom == "" && bondRadTo == "") {
				errorMsg("Please, check values entered in the textboxes.");
				return false;
			}
			if (bondRadTo <= bondRadFrom) {
				errorMsg("Please, check the range value entered.");
				return false;
			}
			runJmolScriptWait("connect (" + atomFrom + ") (" + atomTo + ") DELETE; connect "
					+ bondRadFrom + " " + bondRadTo + " (" + atomFrom + ") ("
					+ atomTo + ") " + styleBond + " ModifyOrCreate;");
		}

	} else if (radbondVal == "selection") {
		runJmolScriptWait("connect (selected) (selected) " + styleBond + " ModifyOrCreate;");
	}
}

function deleteBond() {
	var styleBond = getValue("setBondFashion");

	if (radbondVal == "all") {
		if (radBondRange == "just") {
			var bondRadFrom = getValue("radiuscoonectFrom");
			if (bondRadFrom == "") {
				runJmolScriptWait("connect (all) (all)  DELETE;");
				return false;
			}
			// alert(bondRadFrom)
			runJmolScriptWait("connect " + bondRadFrom + " (all) (all)  DELETE;");
		} else {
			var bondRadFrom = getValue("radiuscoonectFrom");
			var bondRadTo = getValue("radiuscoonectTo");
			if (bondRadFrom == "" && bondRadTo == "") {
				runJmolScriptWait("connect (all) (all)  DELETE;");
				return false;
			}
			runJmolScriptWait("connect " + bondRadFrom + " " + bondRadTo
					+ " (all) (all)  DELETE;");
		}
	} else if (radbondVal == "atom") {
		var atomFrom = getValue("connectbyElementList");
		var atomTo = getValue("connectbyElementListone");
		if (radBondRange == "just") {
			var bondRadFrom = getValue("radiuscoonectFrom");
			if (bondRadFrom == "") {
				runJmolScriptWait("connect (" + atomFrom + ") (" + atomTo + ") DELETE;");
				return false;
			}
			// alert(bondRadFrom)
			runJmolScriptWait(" connect " + bondRadFrom + " (" + atomFrom + ") (" + atomTo
					+ ") DELETE;");
		} else {
			var bondRadFrom = getValue("radiuscoonectFrom");
			var bondRadTo = getValue("radiuscoonectTo");
			if (bondRadFrom == "" && bondRadTo == "") {
				runJmolScriptWait("connect (" + atomFrom + ") (" + atomTo + ") DELETE;");
				return false;
			}
			runJmolScriptWait("connect " + bondRadFrom + " " + bondRadTo + " (" + atomFrom
					+ ") (" + atomTo + ") DELETE;");
		}

	} else if (radbondVal == "selection") {
		runJmolScriptWait("connect (selected) (selected) " + styleBond + " DELETE;");
	}
}

var radbondVal;
function checkBondStatus(radval) {
	runJmolScriptWait("select *; halos off; label off; select none;");
	radbondVal = radval;
	if (radbondVal == "selection") {
		for (var i = 0; i < document.editGroup.range.length; i++)
			document.editGroup.range[i].disabled = true;
		runJmolScriptWait('showSelections TRUE; select none; set picking identify; halos on;');
		getbyID("connectbyElementList").disabled = true;
		getbyID("connectbyElementListone").disabled = true;
	} else {
		for (var i = 0; i < document.editGroup.range.length; i++)
			document.editGroup.range[i].disabled = false;

		getbyID("radiuscoonectFrom").disabled = true;
		getbyID("radiuscoonectTo").disabled = true;
		getbyID("connectbyElementList").disabled = true;
		getbyID("connectbyElementListone").disabled = true;

		if (radbondVal == "atom") {
			getbyID("connectbyElementList").disabled = false;
			getbyID("connectbyElementListone").disabled = false;
		}
	}

}

var radBondRange;
function checkWhithin(radVal) {
	radBondRange = radVal;
	if (radBondRange == "just") {
		getbyID("radiuscoonectFrom").disabled = false;
		getbyID("radiuscoonectTo").disabled = true;
	} else {
		getbyID("radiuscoonectFrom").disabled = false;
		getbyID("radiuscoonectTo").disabled = false;
	}

}

//Fix .AtomName
function changeElement(value) {
	var script = '{selected}.element = "' + value + '";'
	+'{selected}.ionic = "' + value + '";'
	+'label "%e";font label 16;draw off';
	runJmolScriptWait(script);
	updateElementLists();
}

function elementSelectedDelete(element) {
	selectElement(element);
	deleteMode = "delete _" + element;
	return deleteMode;
}

function elementSelectedHide(element) {
	selectElement(element);
	hideMode = "hide _" + element;
	return hideMode;
}

//function elementSelectedDisplay(element) {
//	selectElement(element);
//	displayMode = "display _" + element;
//	return displayMode;
//}

function selectElement(element) {
	runJmolScriptWait("select _" + element + ";selectionhalos on");

}

function selectAll() {
	runJmolScriptWait("select *;halos on;");
}

//function selectAllDelete() {
//	selectAll();
//	// BH: REALLY?
//	runJmolScriptWait("select *; halos on; label on;");
//	deleteMode = "select *; delete; select none ; halos off; draw off;";
//	return deleteMode;
//}
//
//function selectAllHide() {
//	runJmolScriptWait("select *; halos on; label on;");
//	hideMode = "select *; hide selected; select none; halos off; draw off;";
//	return hideMode;
//}


