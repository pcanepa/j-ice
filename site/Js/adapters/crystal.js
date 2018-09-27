/*  J-ICE library 

    based on:
 *
 * Copyright (C) 2010-2014 Pieremanuele Canepa http://j-ice.sourceforge.net/
 *
 * Contact: pierocanepa@sourceforge.net
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

////The following functions are to control import/ export, geometry optimization, frequency properties.
/////////
////////////////SAVE INPUT
/////////

var titleCRYS = null;

function titleCRYSTAL() {
	titleCRYS = prompt("Type here the job title:", "");
	(titleCRYS == "" || titleCRYS == null) ? (titleCRYS = ' .d12 prepared with J-ICE ')
			: (titleCRYS = titleCRYS + ' .d12 prepared with J-ICE')
}

var numAtomCRYSTAL = null;
var fractionalCRYSTAL = null;
function atomCRYSTAL() {
	if (typeSystem == "molecule")
		fractionalCRYSTAL = frameSelection + '.label("%l %16.9[xyz]")';
	runJmolScriptWait("print " + fractionalCRYSTAL)
	// alert(typeSystem);

	numAtomCRYSTAL = frameSelection + ".length";
	fractionalCRYSTAL = frameSelection + '.label("%l %16.9[fxyz]")';
	// alert(typeSystem);
}

var systemCRYSTAL = null;
var keywordCRYSTAL = null;
var symmetryCRYSTAL = null;
function exportCRYSTAL() {
	var endCRYSTAL = "TEST', 'END";
	var script = "";
	warningMsg("Make sure you have selected the model you would like to export.")
	titleCRYSTAL();
	setUnitCell();
	atomCRYSTAL();

	switch (typeSystem) {
	case "crystal":
		systemCRYSTAL = "'CRYSTAL'";
		keywordCRYSTAL = "'0 0 0'";
		symmetryCRYSTAL = "'1'";

		if (!flagSiesta && !flagOutcar && !flagCryVasp)
			var flagsymmetry = confirm("Do you want to introduce symmetry ?")
		if (!flagsymmetry) {
			script = "var cellp = ["
					+ roundNumber(aCell)
					+ ", "
					+ roundNumber(bCell)
					+ ", "
					+ roundNumber(cCell)
					+ ", "
					+ roundNumber(alpha)
					+ ", "
					+ roundNumber(beta)
					+ ", "
					+ roundNumber(gamma)
					+ "];"
					+ 'var cellparam = cellp.join(" ");'
					+ 'cellparam = cellparam.replace("\n\n","\n");'
					+ "var crystalArr = ['"
					+ titleCRYS
					+ "', "
					+ systemCRYSTAL
					+ ", "
					+ keywordCRYSTAL
					+ ", "
					+ symmetryCRYSTAL
					+ "];"
					+ "var crystalRestArr = ["
					+ numAtomCRYSTAL
					+ ", "
					+ fractionalCRYSTAL
					+ ", '"
					+ endCRYSTAL
					+ "'];"
					+ 'var finalArr = [crystalArr, cellparam , crystalRestArr];'
					+ 'finalArr = finalArr.replace("\n\n","\n");'
					+ 'WRITE VAR finalArr "?.d12"';
		} else {
			warningMsg("This procedure is not fully tested.");
			figureOutSpaceGroup();
		}
		break;
	case "slab":
		systemCRYSTAL = "'SLAB'";
		keywordCRYSTAL = "";
		symmetryCRYSTAL = "'1'";

		warningMsg("Symmetry not exploited!");

		script = "var cellp = [" + roundNumber(aCell) + ", "
				+ roundNumber(bCell) + ", " + roundNumber(gamma) + "];"
				+ 'var cellparam = cellp.join(" ");' + "var crystalArr = ['"
				+ titleCRYS + "', " + systemCRYSTAL + ", " + symmetryCRYSTAL
				+ "];" + 'crystalArr = crystalArr.replace("\n\n","\n");'
				+ "var crystalRestArr = [" + numAtomCRYSTAL + ", "
				+ fractionalCRYSTAL + ", '" + endCRYSTAL + "'];"
				+ 'crystalRestArr = crystalRestArr.replace("\n\n","\n");'
				+ 'var finalArr = [crystalArr, cellparam , crystalRestArr];'
				+ 'finalArr = finalArr.replace("\n\n","\n");'
				+ 'WRITE VAR finalArr "?.d12"';
		break;
	case "polymer":
		systemCRYSTAL = "'POLYMER'";
		keywordCRYSTAL = "";
		symmetryCRYSTAL = "'1'";

		warningMsg("Symmetry not exploited!");

		script = "var cellp = " + roundNumber(aCell) + ";"
				+ "var crystalArr = ['" + titleCRYS + "', " + systemCRYSTAL
				+ ", " + symmetryCRYSTAL + "];"
				+ 'crystalArr = crystalArr.replace("\n\n","\n");'
				+ "var crystalRestArr = [" + numAtomCRYSTAL + ", "
				+ fractionalCRYSTAL + ", '" + endCRYSTAL + "'];"
				+ 'crystalRestArr = crystalRestArr.replace("\n\n","\n");'
				+ 'var finalArr = [crystalArr, cellp , crystalRestArr];'
				+ 'finalArr = finalArr.replace("\n\n","\n");'
				+ 'WRITE VAR finalArr "?.d12"';
		break;
	case "molecule":
		// alert("prov")
		systemCRYSTAL = "'MOLECULE'";
		symmetryCRYSTAL = "'1'"; // see how jmol exploits the punctual TODO:
		// show POINTGROUP
		// symmetry
		fractionalCRYSTAL
		warningMsg("Symmetry not exploited!");
		script = "var crystalArr = ['" + titleCRYS + "', " + systemCRYSTAL
				+ ", " + symmetryCRYSTAL + "];"
				+ 'crystalArr = crystalArr.replace("\n\n","\n");'
				+ "var crystalRestArr = [" + numAtomCRYSTAL + ", "
				+ fractionalCRYSTAL + ", '" + endCRYSTAL + "'];"
				+ 'crystalRestArr = crystalRestArr.replace("\n\n","\n");'
				+ 'var finalArr = [crystalArr, crystalRestArr];'
				+ 'finalArr = finalArr.replace("\n\n","\n");'
				+ 'WRITE VAR finalArr "?.d12"';
		break;
	}// end switch
	script = script.replace("\n\n", "\n");
	runJmolScriptWait(script);
}

function savCRYSTALSpace() {
	var endCRYSTAL = "TEST', 'END";
	var script = "var cellp = [" + stringCellParam + "];"
			+ 'var cellparam = cellp.join(" ");' + "var crystalArr = ['"
			+ titleCRYS + "', " + systemCRYSTAL + ", " + keywordCRYSTAL + ", "
			+ interNumber + "];" + 'crystalArr = crystalArr.replace("\n\n"," ");'
			+ "var crystalRestArr = [" + numAtomCRYSTAL + ", " + fractionalCRYSTAL
			+ ", '" + endCRYSTAL + "'];"
			+ 'crystalRestArr = crystalRestArr.replace("\n\n"," ");'
			+ 'var finalArr = [crystalArr, cellparam , crystalRestArr];'
			+ 'finalArr = finalArr.replace("\n\n","\n");'
			+ 'WRITE VAR finalArr "?.d12"';
	runJmolScript(script);
}

////////////////////////END SAVE INPUT

/////////////////////////
///////////////////////// LOAD & ON LOAD functions

crystalDone = function() {
	loadDone(loadModelsCrystal);
}

function setGeomAndFreqData() {
	counterFreq = 0;
	var vib = getbyID('vib');
	for (i = 0; i < Info.length; i++) {
		if (Info[i].name != null) {
			var line = Info[i].name;
			if (line.search(/Energy/i) != -1) { // Energy
				if (i > 0 && i < Info.length)
					var previous = substringEnergyToFloat(Info[i - 1].name);
				if (Info[i].name != null) {
					addOption(getbyID('geom'), i + " " + Info[i].name, i + 1);
					geomData[i] = Info[i].name;
					counterFreq++;
				}
			} else if (line.search(/cm/i) != -1) {
				addOption(vib, (i + counterFreq +1) + " " + Info[i].name, i + 1);
				if (line.search(/LO/) == -1)
					freqData[i - counterFreq] = Info[i].name;
			}
	
		}
	} 
}

//This is called each time a new file is loaded
function loadModelsCrystal() {	
	getUnitcell("1");
	runJmolScriptWait("echo");
	setGeomAndFreqData();
	setTitleEcho();
}

// this method was called when the Geometry Optimize and Spectra tabs
// were clicked via a complex sequence of callbacks
// but that is not done now, because all this should be done from a loadStructCallback.
function reloadFastModels() {
	setDefaultJmolSettings();
	if (flagCryVasp) {
		getUnitcell("1");
		runJmolScriptWait("echo");
		setTitleEcho();
		setGeomAndFreqData();
		enableFreqOpts();
		//getSymInfo();
	}
}

