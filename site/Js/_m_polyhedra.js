function enterPolyhedra() {
	
}
function exitPolyhedra() {
}

function createPolyedra() {

	var vertNo, from, to, distance, style, selected, face;
	vertNo = getValue("polyEdge");
	from = getValue('polybyElementList');
	to = getValue("poly2byElementList");
	style = getValue("polyVert");
	face =  getValue("polyFace");
	if (face.equals("0.0") && !style.equals("collapsed"))
		face = "";
	runJmolScriptWait("polyhedra DELETE");

	// if( from == to){
	// errorMsg("Use a different atom as Vertex");
	// return false;
	// }

	distance = getValue("polyDistance");

	if (distance == "") {
		runJmolScriptWait("polyhedra 4, 6" + face + " " + style);
		return;
	}

	/*
	 * if(isChecked("byselectionPoly")){ runJmolScriptWait("polyhedra " + vertNo + " BOND { "+
	 * selected +" } faceCenterOffset " + face + " " + style); }
	 */

	if (isChecked("centralPoly")) {
		runJmolScriptWait("polyhedra BOND " + "{ " + from + " } " + face
				+ " " + style);
	} else {

		if (isChecked("bondPoly")) {
			runJmolScriptWait("polyhedra " + vertNo + " BOND " + face + " "
					+ style);		}
		if (isChecked("bondPoly1")) {
			runJmolScriptWait("polyhedra " + vertNo + " " + distance + " (" + from + ") to "
					+ "(" + to + ") " + face + " " + style);
		}

	}

}

function checkPolyValue(value) {
	(value == "collapsed") ? (makeEnable("polyFace"))
			: (makeDisable("polyFace"));
}

function setPolyString(value) {
	runJmolScriptWait("polyhedra 4, 6" + "  faceCenterOffset " + face + " " + value);
}

function setPolybyPicking(element) {
	setPicking(element);
	checkBoxStatus(element, 'polybyElementList');
	checkBoxStatus(element, "poly2byElementList");
}
