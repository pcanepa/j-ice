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

///////////////////////// LOAD & ON LOAD functions

loadDone_crystal = function() {
	_fileData.energyUnits = ENERGY_HARTREE;
	_fileData.StrUnitEnergy = "H";
	var vib = getbyID('vib');
	for (var i = 0; i < _fileData.info.length; i++) {
		var line = _fileData.info[i].name;
		if (line != null) {
			if (line.search(/Energy/i) != -1) { // Energy
//				if (i > 0 && i < _fileData.info.length)
//					var previous = substringEnergyToFloat(_fileData.info[i - 1].name);
//				if (_fileData.info[i].name != null) {
				addOption(getbyID('geom'), i + " " + line, i + 1);
				_fileData.geomData[i] = line;
				_fileData.counterFreq++;
//				}
			} else if (line.search(/cm/i) != -1) {
				if (line.search(/LO/) == -1) {
					_fileData.freqInfo.push(_fileData.info[i]);
					_fileData.vibLine.push((i - _fileData.counterFreq) + " " + line); 
					_fileData.freqData.push(line);
				}
			}
	
		}
	} 
	getUnitcell("1");
	runJmolScriptWait("echo");
	setTitleEcho();
	loadDone();
}

function exportCRYSTAL() {
	var systemCRYSTAL = null;
	var keywordCRYSTAL = null;
	var symmetryCRYSTAL = null;

	var endCRYSTAL = "TEST', 'END";
	var script = "";
	var flagsymmetry;
	warningMsg("Make sure you have selected the model you would like to export.")

	var titleCRYS = prompt("Type here the job title:", "");
	(titleCRYS == "" || titleCRYS == null) ? (titleCRYS = ' .d12 prepared with J-ICE ')
			: (titleCRYS = titleCRYS + ' .d12 prepared with J-ICE');

	setUnitCell();

	if (_fileData.cell.typeSystem == "molecule")
		fractionalCRYSTAL = _fileData.frameSelection + '.label("%l %16.9[xyz]")';
	runJmolScriptWait("print " + fractionalCRYSTAL)

	var  numAtomCRYSTAL = _fileData.frameSelection + ".length";
	var fractionalCRYSTAL = _fileData.frameSelection + '.label("%l %16.9[fxyz]")';

	switch (_fileData.cell.typeSystem) {
	case "crystal":
		systemCRYSTAL = "'CRYSTAL'";
		keywordCRYSTAL = "'0 0 0'";
		symmetryCRYSTAL = "'1'";

		if (!flagSiesta && !flagOutcar && !flagCryVasp)
			flagsymmetry = confirm("Do you want to introduce symmetry ?")
		if (!flagsymmetry) {
			script = "var cellp = ["
					+ roundNumber(_fileData.cell.a)
					+ ", "
					+ roundNumber(_fileData.cell.b)
					+ ", "
					+ roundNumber(_fileData.cell.c)
					+ ", "
					+ roundNumber(_fileData.cell.alpha)
					+ ", "
					+ roundNumber(_fileData.cell.beta)
					+ ", "
					+ roundNumber(_fileData.cell.gamma)
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
			
			// BH: THIS METHOD WILL RELOAD THE FILE!
			figureOutSpaceGroup();
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
		break;
	case "slab":
		systemCRYSTAL = "'SLAB'";
		keywordCRYSTAL = "";
		symmetryCRYSTAL = "'1'";

		warningMsg("Symmetry not exploited!");

		script = "var cellp = [" + roundNumber(_fileData.cell.a) + ", "
				+ roundNumber(_fileData.cell.b) + ", " + roundNumber(_fileData.cell.gamma) + "];"
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

		script = "var cellp = " + roundNumber(_fileData.cell.a) + ";"
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
	}
	script = script.replace("\n\n", "\n");
	runJmolScriptWait(script);
}


////////////////////////END SAVE INPUT

/////////////////////////

//// this method was called when the Geometry Optimize and Spectra tabs
//// were clicked via a complex sequence of callbacks
//// but that is not done now, because all this should be done from a loadStructCallback.
//function reloadFastModels() {
//	setDefaultJmolSettings();
//	if (flagCryVasp) {
//		getUnitcell("1");
//		runJmolScriptWait("echo");
//		setTitleEcho();
//		setGeomAndFreqData();
//		enableFreqOpts();
//		//getSymInfo();
//	}
//}

