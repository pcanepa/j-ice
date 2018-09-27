//prevframeSelection needs because of the conventional
var prevframeSelection = null;
var prevFrame = null;
function figureOutSpaceGroup() {
	saveStateAndOrientation_a();
	prevframeSelection = frameSelection;
	if (frameValue == null || frameValue == "" || flagCif)
		frameValue = 1; // BH 2018 fix: was "framValue" in J-ICE/Java crystalFunction.js
	prevFrame = frameValue;
	var magnetic = confirm('It\'s the primitive cell ?')
	// crystalPrev = confirm('Does the structure come from a previous CRYSTAL
	// calculation?')
	reload(null, 
			flagCrystal ? "conv" : null, 
			magnetic ? "delete not cell=555;" : null
	);
	getSpaceGroup();
}

var interNumber = "";
getSpaceGroup = function() {
	var s = ""
	var info = jmolEvaluate('show("spacegroup")')
	if (info.indexOf("x,") < 0) {
		s = "no space group"
	} else {
		var S = info.split("\n")
		for (var i = 0; i < S.length; i++) {
			var line = S[i].split(":")
			if (line[0].indexOf("international table number") == 0)
				s = parseInt(S[i]
						.replace(/international table number:/, ""));
		}
	}
	interNumber = parseInt(s);
	getUnitcell(prevFrame);
	findCellParameters()
}


var stringCellParam;
var cellDimString = null;
var ibravQ = "";
function findCellParameters() {
	// /from crystal manual http://www.crystal.unito.it/Manuals/crystal09.pdf
	switch (true) {
	case ((interNumber <= 2)): // Triclinic lattices
		stringCellParam = roundNumber(aCell) + ", " + roundNumber(bCell) + ", "
				+ roundNumber(cCell) + ", " + roundNumber(alpha) + ", "
				+ roundNumber(beta) + ", " + roundNumber(gamma);
		cellDimString = " celdm(1) =  " + fromAngstromtoBohr(aCell)
				+ " \n celdm(2) =  " + roundNumber(bCell / aCell)
				+ " \n celdm(3) =  " + roundNumber(cCell / aCell)
				+ " \n celdm(4) =  " + cosRadiant(alpha) + " \n celdm(5) =  "
				+ (cosRadiant(beta)) + " \n celdm(6) =  "
				+ (cosRadiant(gamma)) + " \n\n";
		ibravQ = "14";
		break;

	case ((interNumber > 2) && (interNumber <= 15)): // Monoclinic lattices
		stringCellParam = roundNumber(aCell) + ", " + roundNumber(bCell) + ", "
				+ roundNumber(cCell) + ", " + roundNumber(alpha);
		if (!flagCrystal && quantumEspresso) {
			cellDimString = " celdm(1) =  " + fromAngstromtoBohr(aCell)
					+ " \n celdm(2) =  " + roundNumber(bCell / aCell)
					+ " \n celdm(3) =  " + roundNumber(cCell / aCell)
					+ " \n celdm(4) =  " + (cosRadiant(alpha))
					+ " \n\n";
			ibravQ = "12"; // Monoclinic base centered

			var question = confirm("Is this a Monoclinic base centered lattice?")
			if (question)
				ibravQ = "13";
		}
		break;

	case ((interNumber > 15) && (interNumber <= 74)): // Orthorhombic lattices
		stringCellParam = roundNumber(aCell) + ", " + roundNumber(bCell) + ", "
				+ roundNumber(cCell);
		if (!flagCrystal && quantumEspresso) {
			cellDimString = " celdm(1) = " + fromAngstromtoBohr(aCell)
					+ " \n celdm(2) =  " + roundNumber(bCell / aCell)
					+ " \n celdm(3) =  " + roundNumber(cCell / aCell) + " \n\n";
			ibravQ = "8";

			var question = confirm("Is this a Orthorhombic base-centered lattice?")
			if (question) {
				ibravQ = "9";
			} else {
				var questionfcc = confirm("Is this a Orthorhombic face-centered (fcc) lattice?");
				if (questionfcc) {
					ibravQ = "10";
				} else {
					ibravQ = "11";// Orthorhombic body-centered
				}
			}

		}
		break;

	case ((interNumber > 74) && (interNumber <= 142)): // Tetragonal lattices

		stringCellParam = roundNumber(aCell) + ", " + roundNumber(cCell);
		if (!flagCrystal && quantumEspresso) {
			cellDimString = " celdm(1) = " + fromAngstromtoBohr(aCell)
					+ " \n celdm(3) =  " + roundNumber(cCell / aCell) + " \n\n";
			ibravQ = "6";
			var question = confirm("Is this a Tetragonal I body centered (bct) lattice?");
			if (question)
				ibravQ = "7";
		}
		break;

	case ((interNumber > 142) && (interNumber <= 167)): // Trigonal lattices
		stringCellParam = roundNumber(aCell) + ", " + roundNumber(alpha) + ", "
				+ roundNumber(beta) + ", " + roundNumber(gamma);
		cellDimString = " celdm(1) = " + fromAngstromtoBohr(aCell)
				+ " \n celdm(4) =  " + (cosRadiant(alpha))
				+ " \n celdm(5) = " + (cosRadiant(beta))
				+ " \n celdm(6) =  " + (cosRadiant(gamma));
		ibravQ = "5";
		var question = confirm("Is a romboheadral lattice?")
		if (question) {
			stringCellParam = roundNumber(aCell) + ", " + roundNumber(cCell);
			cellDimString = " celdm(1) = " + fromAngstromtoBohr(aCell)
					+ " \n celdm(4) =  " + (cosRadiant(alpha))
					+ " \n celdm(5) = " + (cosRadiant(beta))
					+ " \n celdm(6) =  " + (cosRadiant(gamma))
					+ " \n\n";
			ibravQ = "4";
		}
		break;
	case ((interNumber > 167) && (interNumber <= 194)): // Hexagonal lattices
		stringCellParam = roundNumber(aCell) + ", " + roundNumber(cCell);
		if (!flagCrystal && quantumEspresso) {
			cellDimString = " celdm(1) = " + fromAngstromtoBohr(aCell)
					+ " \n celdm(3) = " + roundNumber(cCell / aCell) + " \n\n";
			ibravQ = "4";
		}
		break;
	case ((interNumber > 194) && (interNumber <= 230)): // Cubic lattices
		stringCellParam = roundNumber(aCell);
		if (!flagCrystal && quantumEspresso) {
			cellDimString = " celdm(1) = " + fromAngstromtoBohr(aCell);
			// alert("I am here");
			ibravQ = "1";
			var question = confirm("Is a face centered cubic lattice?")
			if (question) {
				var questionBase = confirm("Is a body centered cubic lattice?")
				if (questionBase) {
					ibravQ = "3";
				} else {
					ibravQ = "2";
				}
			}
	
		}
		break;
	default:
		errorMsg("SpaceGroup not found in range.");
		return false;
		break;
	}// end switch
	
//	stringCellparamgulp = roundNumber(aCell) + ' ' + roundNumber(bCell) + ' '
//			+ roundNumber(cCell) + ' ' + roundNumber(alpha) + ' '
//			+ roundNumber(beta) + ' ' + roundNumber(gamma);
	//	alert(stringCellparamgulp)
	if (flagCrystal)
		savCRYSTALSpace();
	if (!flagGulp) {
		reload("primitive");
		restoreStateAndOrientation_a();
	}
}
