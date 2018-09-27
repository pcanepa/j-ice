/*  J-ICE library 

    based on:
 *
 *  Copyright (C) 2010-2014 Pieremanuele Canepa http://j-ice.sourceforge.net/
 *
 *  Contact: pierocanepa@sourceforge.net
 *
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA
 *  02111-1307  USA.
 */

///THIS ROUTINE IS TO EXPORT INPUT FOR GULP
var titleGulp = null;
var cellGulp = null;
var coordinateGulp = null;
var spacegroupGulp = null;
var restGulp = null;
var flagShelgulp = null;
var stringCellparamgulp;

function exportGULP() {
	warningMsg("Make sure you have selected the model you would like to export.");
	saveStateAndOrientation_a();
	if (typeSystem != "crystal")
		setUnitCell();
	setTitlegulp();
	setSystem();
	setCellgulp();
	setCoordinategulp();
	if (typeSystem == "crystal")
		setSpacegroupgulp();
	setPotentialgulp();
	if (typeSystem == "crystal") {
		var finalInputGulp = "var final = [titlegulp,cellgulp,coordgulp,spacegulp,restgulp];"
				+ 'final = final.replace("\n\n","\n");'
				+ 'WRITE VAR final "?.gin" ';
	} else {
		var finalInputGulp = "var final = [titlegulp,cellgulp,coordgulp,restgulp];"
				+ 'final = final.replace("\n\n","\n");'
				+ 'WRITE VAR final "?.gin" ';
	}
	run(finalInputGulp);
	restoreStateAndOrientation_a();

}

function setTitlegulp() {
	titleGulpinput = prompt("Type here the job title:", "");
	(titleGulpinput == "") ? (titleGulpinput = 'Input prepared with J-ICE ')
			: (titleGulpinput = '#Input prepared with J-ICE \n'
					+ titleGulpinput);
	titleGulp = 'var optiongulp = \"opti conp propr #GULP options\";'
			+ 'var titleheader = \"title \"; ' + 'var title = \"'
			+ titleGulpinput + '\"; ' + 'var titleend = \"end \";'
			+ 'titlegulp = [optiongulp, titleheader, title, titleend];';
	runJmolScriptWait(titleGulp);

}

var flagsymmetryGulp = false;
function setSystem() {
	switch (typeSystem) {
	case "crystal":
		setUnitCell();
		coordinateAddgulp = ""
		cellHeadergulp = "cell"
		var flagsymmetryGulp = confirm("Do you want to introduce symmetry ?");

		if (flagsymmetryGulp) {
			warningMsg("This procedure is not fully tested.");
			figureOutSpaceGroup();
		} else {
			stringCellparamgulp = roundNumber(aCell) + ' ' + roundNumber(bCell)
					+ ' ' + roundNumber(cCell) + ' ' + roundNumber(alpha) + ' '
					+ roundNumber(beta) + ' ' + roundNumber(gamma);
		}
		break;

	case "surface":
		cellHeadergulp = "scell"
		coordinateAddgulp = "s"
		stringCellparamgulp = roundNumber(aCell) + ", " + roundNumber(bCell)
				+ ", " + roundNumber(gamma);
		break;

	case "polymer":
		cellHeadergulp = "pcell"
		coordinateAddgulp = ""
		stringCellparamgulp = roundNumber(aCell);
		break;

	case "molecule":
		// To be terminated

		break;
	}

}
var cellHeadergulp
function setCellgulp() {

	cellGulp = 'var cellheader = \"' + cellHeadergulp + '\";'
			+ 'var cellparameter = \"' + stringCellparamgulp + '\";'
			+ 'cellgulp = [cellheader, cellparameter];';
	runJmolScriptWait(cellGulp);
}

function setCoordinategulp() {

	var coordinateString;
	var coordinateShel
	setCoorgulp();
	flagShelgulp = confirm("Is the inter-atomic potential a core/shel one? \n Cancel stands for NO core/shel potential.");
	if (sortofCoordinateGulp && typeSystem == 'crystal') {
		coordinateString = frameSelection + '.label("%e core %16.9[fxyz]")';
		coordinateShel = frameSelection + '.label("%e shel %16.9[fxyz]")';
	} else {
		coordinateString = frameSelection + '.label("%e core %16.9[xyz]")';
		coordinateShel = frameSelection + '.label("%e shel %16.9[xyz]")';
	}
	if (flagShelgulp) {
		coordinateGulp = 'var coordtype = \"' + sortofCoordinateGulp + '\";'
				+ 'var coordcore = ' + coordinateString + ';'
				+ 'var coordshel = ' + coordinateShel + ';'
				+ 'coordgulp = [coordtype, coordcore, coordshel];';
	} else {
		coordinateGulp = 'var coordtype = \"' + sortofCoordinateGulp + '\";'
				+ 'var coordcore = ' + coordinateString + ';'
				+ 'coordgulp = [coordtype, coordcore];';
	}
	runJmolScriptWait(coordinateGulp);
}

var sortofCoordinateGulp = null;
var coordinateAddgulp = null;
function setCoorgulp() {
	if (typeSystem == 'crystal') {
		var sortofCoordinate = confirm("Do you want the coordinates in Cartesian or fractional? \n OK for Cartesian, Cancel for fractional.")
		sortofCoordinateGulp = (sortofCoordinate == true) ? (coordinateAddgulp + "cartesian")
				: (coordinateAddgulp + "fractional");
	} else {
		messageMsg("Coordinate will be exported in Cartesian");
	}
}

// interNumber from crystalfunction
function setSpacegroupgulp() {
	if (!flagsymmetryGulp)
		interNumber = "P 1"
	spacegroupGulp = 'var spaceheader = \"spacegroup\";'
			+ 'var spacegroup = \"' + interNumber + '\";'// TBC
			+ 'spacegulp = [spaceheader, spacegroup];';
	runJmolScriptWait(spacegroupGulp);
}

function setPotentialgulp() {
	if (flagShelgulp) {
		restGulp = 'var species= \"species \" \n\n;'
				+ 'var restpot = \"#here the user should enter the inter-atomic potential setting\";'
				+ 'var spring = \"spring \"  \n\n;'
				+ 'restgulp = [species, restpot, spring];';
	} else {
		restGulp = 'var species= \"species \" \n\n;'
				+ 'var restpot = \"#here the user should enter the inter-atomic potential setting\";'
				+ 'restgulp = [species, restpot];';
	}
	runJmolScriptWait(restGulp);

}

// ////////////GULP READER

function gulpDone() {
		loadDone(loadModelsGulp);
}

function loadModelsGulp() {
	runJmolScriptWait("script scripts/gulp_name.spt"); 
	var counterFreq = 0;
	getUnitcell("1");
	setFrameValues("1");
	var counterMD = 0;
	counterFreq = 0;
	for (i = 0; i < Info.length; i++) {
		var line = Info[i].name;
		if (i == 0) {
			line = "Intial";
		}

		addOption(getbyID('geom'), i + " " + line, i + 1);
		geomData[i] = line;
		counterFreq++;

	}
	getSymInfo();

}

function substringEnergyGulpToFloat(value) {
	if (value != null) {
		var grab = parseFloat(
				value.substring(value.indexOf('=') + 1, value.indexOf('e') - 1))
				.toPrecision(8); // E = 100000.0000 eV
		grab = grab * 96.48;
		// http://web.utk.edu/~rcompton/constants
		grab = Math.round(grab * 100000000) / 100000000;
	}
	return grab;
}
