/*  J-ICE library 
 *
 *  based on:
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

createDebugPanel = function() {
	// BH 2018
	return "<div id='debugpanel'>"
		+ createCheck("debugMode", "Show Commands", "debugShowCommands(this.checked)", 0,
			0, "")
		+ "&nbsp;" + createButton("removeText", "Clear", 'debugShowCommands(true);debugSay(null)', 0)
		+ "&nbsp;" + createButton("getHelp", "History", 'debugShowCommands(true);debugShowHistory()', 0)
		+ "&nbsp;" + createButton("getHelp", "Scripting Help", 'runJmolScriptWait("help")', 0)
		+ "<br>\n"
		+ "<div id='debugdiv' style='display:none'>"
		+ "<input type='text' style='font-size:12pt;width:350px' value='' placeHolder='type a command here' onKeydown='event.keyCode === 13&&$(this).select()&&runJmolScriptWait(value)'/>" 
		+ "<br><textarea id='debugarea' style='font-size:12pt;width:350px;height:150px;font-family:monospace;overflow-y:auto'></textarea>" 
		+ "</div></div>"
}

function cleanLists() {
	// was "removeAll()"
	cleanList('geom');
	cleanList('vib');
	cleanList('colourbyElementList');
	// cleanList('colourbyAtomList');
	cleanList('polybyElementList');
	cleanList("poly2byElementList");
	// BH 2018 -- does not belong here: setValue("fineOrientMagn", "5");
}

function createAllMenus() {
	var s = createFileGrp()
		+ createShowGrp()
		+ createEditGrp()
		//+ createBuildGrp()
		+ createMeasureGrp()
		+ createOrientGrp()
		+ createCellGrp()
		+ createPolyGrp()
		+ createIsoGrp()
		+ createGeometryGrp()
		+ createFreqGrp()
		+ createElecpropGrp()
		+ createMainGrp()
		+ createDebugPanel()
		//+ createHistGrp()
		;
	return s
}
	
function createFileGrp() { // Here the order is crucial
	var elOptionArr = new Array("default", "loadC", "reload", "loadcif",
			"loadxyz", "loadOutcastep", "loadcrystal", "loadDmol",
			"loadaimsfhi", "loadgauss", "loadgromacs", "loadGulp",
			"loadmaterial", "loadMolden", "loadpdb", "loadQuantum",
			"loadSiesta", "loadShel", "loadVASPoutcar", "loadVasp", "loadWien",
			"loadXcrysden", "loadstate");
	var elOptionText = new Array("Load New File", "General (*.*)",
			"Reload current", "CIF (*.cif)", "XYZ (*.XYZ)",
			"CASTEP (INPUT, OUTPUT)", "CRYSTAL (*.*)", "Dmol (*.*)",
			"FHI-aims (*.in)", "GAUSSIAN0X (*.*)", "GROMACS (*.gro)",
			"GULP (*.gout)", "Material Studio (*.*)", "Molden, QEfreq (*.*)",
			"PDB (*.pdb)", "QuantumESPRESSO (*.*)", "Siesta (*,*)",
			"ShelX (*.*)", "VASP (OUTCAR, POSCAR)", "VASP (*.xml)",
			"WIEN2k (*.struct)", "Xcrysden (*.xtal)", "Jmol state (*.spt,*.png)");

	var strFile = "<form autocomplete='nope'  id='fileGroup' name='fileGroup' style='display:inline' class='contents'>\n";
	strFile += "<h2>File manager</h2>\n";
	strFile += "<table><tr><td>Drag-drop a file into JSmol or use the menu below.<br>\n";
	strFile += createSelectmenu('Load File', 'onChangeLoad(value)', 0, 1,
			elOptionArr, elOptionText);
	strFile += "</td><td><div style=display:none>model #" +
		createText2("modelNo", "", 7, "")
		+ "</div></td></tr><tr><td>\n";
	strFile += "Sample Files<BR>\n";
	strFile += createSelectmenu('Sample Files', 'onChangeLoadSample(value)', 0, 1,
			sampleOptionArr);
	strFile += "</td></tr></table><BR><BR>\n";
	strFile += "Export/Save File<BR>\n";
	// Save section
	var elSOptionArr = new Array("default", "saveCASTEP", "saveCRYSTAL",
			"saveGULP", "saveGROMACS", "saveQuantum", "saveVASP", "saveXYZ",
			"saveFrac", /* "savefreqHtml", */"savePNG", "savepdb", "savePOV",
	"saveState", "savePNGJ");
	var elSOptionText = new Array("Export File", "CASTEP (*.cell)",
			"CRYSTAL (*.d12)", "GULP (*.gin)", "GROMACS (*.gro)",
			"PWscf QuantumESPRESSO (*.inp)", "VASP (POSCAR)", "XYZ (*.XYZ)",
			"frac. coord. (*.XYZfrac)",
			// "save Frequencies HTML (*.HTML)",
			"image PNG (*.png)", "coordinates PDB (*.PDB)",
			"image POV-ray (*.pov)", "current state (*.spt)", "image+state (PNGJ)");
	strFile += createSelectmenu('Export File', 'onChangeSave(value)', 0, 1,
			elSOptionArr, elSOptionText);
	strFile += "<p ><img src='images/j-ice.png' alt='logo'/></p>";
	strFile += "<div style='margin-top:50px;'><p style='color:#000'> <b style='color:#f00'>Please DO CITE:</b>";
	strFile += "<blockquote>\"J-ICE: a new Jmol interface for handling<br> and visualizing Crystallographic<br> and Electronics properties.<br>"
	strFile += "P. Canepa, R.M. Hanson, P. Ugliengo, M. Alfredsson, <br>  J. Appl. Cryst. 44, 225 (2011). <a href='http://dx.doi.org/10.1107/S0021889810049411' target'blank'>[doi]</a> \"</blockquote> </p></div>";
	strFile += "</form>\n";
	return strFile;
}

function createShowGrp() {
	var colorBondsName = new Array("select", "atom", "bond");
	var dotName = new Array("select", "1", "2", "3", "4");
	var strShow = "<form autocomplete='nope'  id='showGroup' name='showGroup' style='display:none' >";
	strShow += "<table class='contents'><tr><td colspan='2'>\n";
	strShow += "<h2>Structure Appearance</h2>\n";
	strShow += "Select atom/s by:</td><tr>\n";
	strShow += "<tr><td colspan='2'>";
	strShow += "by element "
		+ createSelectKey('colourbyElementList', "elementSelected(value)",
				"elementSelected(value)", "", 1) + "\n";
	// strShow += "&nbsp;by atom &nbsp;"
	// + createSelect2('colourbyAtomList', 'atomSelectedColor(value)', '', 1)
	// + "\n";
	strShow += createCheck("byselection", "by picking &nbsp;",
			'setPicking(this)', 0, 0, "set picking");

	strShow += createCheck("bydistance", "within a sphere (&#197); &nbsp;",
			'setDistanceHide(this)', 0, 0, "");
	strShow += "</td></tr><tr><td colspan='2'>\n";
	strShow += createCheck("byplane", "within a plane &nbsp;",
			'onClickPickPlane(this,showPickPlaneCallback)', 0, 0, "");
	strShow += "</td></tr><tr><td colspan='2'>\n";
	strShow += createButton('show_selectAll', 'select All', 'selectAll()', '')
	+ "\n";
	strShow += createButton('unselect', 'unselect All',
			'runJmolScriptWait("select *; halos off; selectionhalos off;draw off")', '')
			+ "\n";
	strShow += createButton('halooff', 'Halo/s off',
			'runJmolScriptWait("halos off; selectionhalos off; draw off" )', '')
			+ "\n";
	strShow += createButton('label on', 'Label On',
			'runJmolScriptWait("label on;label display; draw off")', '')
			+ "\n";
	strShow += createButton('label off', 'Label Off',
			'runJmolScriptWait("label hide; draw off")', '')
			+ "\n";
	strShow += createLine('blue', '');
	strShow += "</td></tr><tr><td colspan='2'>\n";
	strShow += "Atom/s & bond/s style</td></tr> \n";
	strShow += "<tr><td > \n";
	strShow += "Atom/s colour: "
		+ createButton("colorAtoms", "Default colour",
				'runJmolScriptWait("select *; color Jmol;")', 0);
	strShow += "</td><td align='left'><script>\n";
	strShow += 'jmolColorPickerBox([setColorWhat,"atoms"], "","atomColorPicker");';
	strShow += "</script> </td></tr>";
	strShow += "<tr><td>Bond colour: "
		+ createButton("bondcolor", "Default colour",
				'runJmolScriptWait(" color bonds Jmol")', 0);
	strShow += "</td><td align='left'> <script> jmolColorPickerBox([setColorWhat, 'bonds'],[255,255,255],'bondColorPicker')</script></td>";
	strShow += "</td></tr>";
	strShow += "<tr><td colspan='2'> Atom/s & bond/s finish \n";
	strShow += createRadio(
			"abFashion",
			"opaque",
			'toggleDivRadioTrans(value,"transulcencyDiv") + runJmolScriptWait("color " +  getValue("setFashion") + " OPAQUE")',
			0, 1, "on", "on")
			+ "\n";
	strShow += createRadio(
			"abFashion",
			"translucent",
			'toggleDivRadioTrans(value,"transulcencyDiv") + runJmolScriptWait("color " +  getValue("setFashion") + " TRANSLUCENT")',
			0, 0, "off", "off")
			+ "\n";
	strShow += createSelect('setFashion', '', 0, 1, colorBondsName)
			+ "\n";
	strShow += "</td></tr>"
		strShow += "<tr><td><div id='transulcencyDiv' style='display:none; margin-top:20px'>";
	strShow += createSlider("trans");
	strShow += "</div></td></tr><tr><td>";
	strShow += "Dot surface ";
	strShow += createSelect('setDot',
			'runJmolScriptWait("dots on; set dotScale " + value + "; draw off")', 0, 1,
			dotName);
	strShow += createRadio("dotStyle", "off", 'runJmolScriptWait("dots off")', 0, 0, "off",
	"off");
	strShow += createLine('blue', '');
	strShow += "</td></tr>\n";
	strShow += "<tr><td colspan='2'> Atom/s & bond/s Size<br> \n";
	strShow += createButton('Stick & Ball', 'Stick & Ball', 'onClickBallAndStick()', '')
	+ " \n";
	strShow += createButton('Stick', 'Stick', 'onStickClick()', '') + " \n";
	strShow += createButton('Wire', 'Wire', 'onClickWire()', '') + " \n";
	strShow += createButton('Ball', 'Ball', 'onClickBall()', '') + "\n";
	strShow += createButton('CPK', 'CPK', 'onClickCPK()', '') + " \n";
	strShow += createButton('ionic', 'Ionic', 'onClickIonic()', '') + "\n";
	strShow += "</td></tr>";
	strShow += "<tr><td>";
	strShow += "wireframe ";
	strShow += "</td><td>"
	strShow += createSlider("bond");
	strShow += "</td></tr>";
	strShow += "<tr><td >";
	strShow += "vdW radii";
	strShow += "</td><td>";
	strShow += createSlider("radii");
	strShow += "</td></tr>";
	strShow += "<tr><td colspan='2'>";
	strShow += createLine('blue', '');
	strShow += "H-bonds: "
		+ createRadio("H-bond", "on", 'runJmolScriptWait("script ./scripts/hbond.spt")',
				0, 0, "") + "\n";
	strShow += createRadio("H-bond", "off",
			'runJmolScriptWait("script ./scripts/hbond_del.spt")', 0, 1, "")
			+ "\n";
	strShow += " / solid H-bond"
		+ createRadio("dash", " on", 'runJmolScriptWait("set hbondsSolid TRUE")', 0, 0,
		"") + "\n";
	strShow += createRadio("dash", "off", 'runJmolScriptWait("set hbondsSolid FALSE")', 0, 1,
	"")
	+ "\n";
	strShow += "</td></tr><tr><td>H-bond colour: "
		+ createButton("bondcolor", "Default colour",
				'runJmolScriptWait("color HBONDS none")', 0) + "</td><td>\n";
	strShow += "<script align='left'>jmolColorPickerBox([setColorWhat,'hbonds'],[255,255,255],'hbondColorPicker')</script>";
	strShow += "</td></tr><tr><td colspan='2'> \n";
	strShow += "View / Hide Hydrogen/s "
		+ createCheck("hydrogenView", "", "setJmolFromCheckbox(this, this.value)",
				0, 1, "set showHydrogens") + "\n";
	strShow += "</td></tr></table> \n";
	strShow += createLine('blue', '');
	strShow += "</form>\n";
	return strShow;
}

function createEditGrp() {
	var bondValue = new Array("select", "single", "partial", "hbond", "double",
			"aromatic", "partialDouble", "triple", "partialTriple",
	"parialTriple2");
	var strEdit = "<form autocomplete='nope'  id='editGroup' name='editGroup' style='display:none'>";
	strEdit += "<table class='contents'><tr><td > \n";
	strEdit += "<h2>Edit structure</h2>\n";
	strEdit += "</td></tr>\n";
	strEdit += "<tr><td>\n";
	strEdit += "Select atom/s by:\n";
	strEdit += "</td><tr>\n";
	strEdit += "<tr><td colspan='2'>";
	strEdit += "by element "
		+ createSelect2(
				"deletebyElementList",
				"elementSelectedDelete(value) + elementSelectedHide(value) ",
				false, 1) + "\n";
	// strEdit += "&nbsp;by atom &nbsp;"
	// + createSelect2('deltebyAtomList',
	// 'atomSelectedDelete(value) + atomSelectedHide(value) ', '',
	// 1) + "\n";
	strEdit += createCheck("byselection", "by picking &nbsp;",
			'setPickingDelete(this) + setPickingHide(this)', 0, 0, "");
	;
	strEdit += createCheck("bydistance", "within a sphere (&#197); &nbsp;",
			'setDistanceHide(this)', 0, 0, "");
	strEdit += "</td></tr><tr><td colspan='2'>\n"
		strEdit += createCheck("byplane", "within a plane &nbsp;",
				'onClickPickPlane(this,editPickPlaneCallback)', 0, 0, "");
	strEdit += "</td></tr><tr><td colspan='2'>\n";
	strEdit += createButton('edit_selectAll', 'select All',
			'selectAll()', '')
			+ "\n";
	strEdit += createButton('unselect', 'unselect All',
			'runJmolScriptWait("select *; halos off; label off")', '')
			+ "\n";
	strEdit += createButton('halooff', 'Halo/s off',
			'runJmolScriptWait("halos off; selectionhalos off" )', '')
			+ "\n";
	strEdit += createButton('label All', 'Label All',
			'runJmolScriptWait("select *; label on")', '')
			+ "\n";
	strEdit += createButton('label off', 'Label off',
			'runJmolScriptWait("select *; label off")', '')
			+ "\n";
	strEdit += createLine('blue', '');
	strEdit += "</td></tr>\n";
	strEdit += "<tr><td colspan='2'>\n";
	strEdit += "Rename atom/s<br>";
	strEdit += "Element Name ";
	strEdit += createSelect('renameEle', 'changeElement(value)', 0, 1,
			eleSymb);
	strEdit += createLine('blue', '');
	strEdit += "</td></tr>\n";
	strEdit += "<tr><td colspan='2'>\n";
	strEdit += "Remove / hide atom/s <br>";
	strEdit += createButton('Delete atom', 'Delete atom/s', 'deleteAtom()', '')
	+ "\n";
	strEdit += createButton('Hide atom/s', 'Hide atom/s', 'hideAtom()', '')
	+ "\n";
	strEdit += createButton('Display atom', 'Display hidden atom/s',
			'runJmolScriptWait("select hidden; display")', '')
			+ "\n";
	strEdit += createLine('blue', '');
	strEdit += "</td></tr>\n";
	strEdit += "<tr><td >";
	strEdit += "Connectivity</a>";
	strEdit += "</td><td>";
	strEdit += createSlider("radiiConnect");
	strEdit += '<br>'
		+ createCheck('allBondconnect', 'apply to all structures', '', 0,
				1, '');
	strEdit += "</td></tr>";
	strEdit += "<tr><td colspan='2'>\n";
	strEdit += createButton('advanceEdit', '+',
			'toggleDivValue(true,"advanceEditDiv",this)', '')
			+ " Advanced options <br>"
			strEdit += "<div id='advanceEditDiv' style='display:none; margin-top:20px'>";
	strEdit += "Connect by:\n";
	strEdit += createRadio("connect", "selection", 'checkBondStatus(value)', 0,
			0, "connect", "selection");
	strEdit += createRadio("connect", "by element", 'checkBondStatus(value)',
			0, 0, "connect", "atom");
	strEdit += createRadio("connect", "all", 'checkBondStatus(value)', 0, 0,
			"connect", "all")
			+ "<br>\n";
	strEdit += "From " + createSelect2("connectbyElementList", "", false, 1) + " ";
	strEdit += "To " + createSelect2("connectbyElementListone", "", false, 1)
	+ "<br>\n";
	strEdit += "Mode "
		+ createRadio("range", "whithin", 'checkWhithin(value)', 'disab',
				0, "range", "just");
	strEdit += createRadio("range", "whithin a range", 'checkWhithin(value)',
			'disab', 0, "range", "range")
			+ "<br>\n";
	strEdit += "From / whithin "
		+ createText2("radiuscoonectFrom", "", "2", "disab") + " ";
	strEdit += " to " + createText2("radiuscoonectTo", "", "2", "disab")
	+ " &#197;";
	strEdit += "<br> Style bond "
		+ createSelect('setBondFashion', '', 0, 1, bondValue) + "<br> \n";
	strEdit += createButton('connect2', 'Connect atom', 'connectAtom()', '');
	strEdit += createButton('connect0', 'Delete bond', 'deleteBond()', '')
	+ "<br>\n";
	strEdit += "</div>";
	strEdit += createLine('blue', '');
	strEdit += "</td></tr>\n";
	strEdit += "</table></FORM>\n";
	return strEdit;
}

//function createBuildGrp() {
//	var periodicityName = new Array("select", "crystal", "film", "polymer");
//	var periodicityValue = new Array("", "crystal", "slab", "polymer");
//
//	var strBuild = "<form autocomplete='nope'  id='builGroup' name='builGroup' style='display:none'>";
//	strBuild += "<table class='contents'><tr><td> \n";
//	strBuild += "<h2>Build and modify</h2>\n";
//	strBuild += "</td></tr>\n";
//	/*
//	 * strBuild += "<tr><td>\n"; strBuild += "Add new atom/s <i>via</i>
//	 * internal coordinates (distance, angle and torsional)<br>" strBuild +=
//	 * createCheck("addZnew", "Start procedure",
//	 * 'toggleDiv(this,"addAtomZmatrix") + addAtomZmatrix(this)', "", "", "");
//	 * strBuild += "<div id='addAtomZmatrix' style='display:none;
//	 * margin-top:20px'>"; strBuild += "<br> Element: " + createSelect('addEleZ',
//	 * '', 0, 1, 100, eleSymb, eleSymb); strBuild += "<br>"; strBuild +=
//	 * createButton("addAtom", "add Atom", "addZatoms()", ""); strBuild += "</div>"
//	 * strBuild += createLine('blue', ''); strBuild += "</td></tr>\n";
//	 */
//	strBuild += "<tr><td>\n";
//	strBuild += "Add new atom/s<br>";
//	strBuild += createCheck("addNewFrac", "Start procedure",
//			'addAtomfrac()  + toggleDiv(this,"addAtomCrystal")', "", "", "");
//	strBuild += "<div id='addAtomCrystal' style='display:none; margin-top:20px'>";
//	strBuild += "<br> \n ";
//	strBuild += "x <input type='text'  name='x_frac' id='x_frac' size='1' class='text'> ";
//	strBuild += "y <input type='text'  name='y_frac' id='y_frac' size='1' class='text'> ";
//	strBuild += "z <input type='text'  name='z_frac' id='z_frac' size='1' class='text'> ";
//	strBuild += ", Element: "
//		+ createSelect('addNewFracList', '', 0, 1, eleSymb);
//	strBuild += createButton("addNewFracListBut", "add Atom", "addNewatom()",
//	"");
//	strBuild += "<br><br> Read out coordinates of neighbor atom/s";
//	strBuild += createRadio("coord", "fractional", 'viewCoord(value)', '', 0,
//			"", "fractional");
//	strBuild += createRadio("coord", "cartesian", 'viewCoord(value)', '', 0,
//			"", "cartesian");
//	strBuild += "</div>";
//	strBuild += createLine('blue', '');
//	strBuild += "</td></tr>\n";
//	strBuild += "<tr><td>\n";
//	strBuild += "Create a molecular CRYSTAL, FILM, POLYMER<br>";
//
//	strBuild += createCheck(
//			"createCrystal",
//			"Start procedure",
//			'createCrystalStr(this) + toggleDiv(this,"createmolecularCrystal")  + cleanCreateCrystal()',
//			"", "", "");
//	strBuild += "<div id='createmolecularCrystal' style='display:none; margin-top:20px'>";
//	strBuild += "<br> Periodicity: "
//		+ createSelect('typeMole', 'checkIfThreeD(value)', 0, 1,
//				periodicityValue, periodicityName);
//	strBuild += "<br> Space group: "
//		+ createSelect('periodMole', 'setCellParamSpaceGroup(value)', 0, 1,
//				spaceGroupValue, spaceGroupName)
//				+ " <a href=http://en.wikipedia.org/wiki/Hermann%E2%80%93Mauguin_notation target=_blank>Hermann-Mauguin</a>"; // space
//	// group
//	// list
//	// spageGroupName
//	strBuild += "<br> Cell parameters: <br><br>";
//	strBuild += "<i>a</i> <input type='text'  name='a_frac' id='a_frac' size='7' class='text'> ";
//	strBuild += "<i>b</i> <input type='text'  name='b_frac' id='b_frac' size='7' class='text'> ";
//	strBuild += "<i>c</i> <input type='text'  name='c_frac' id='c_frac' size='7' class='text'> ";
//	strBuild += " &#197; <br>";
//	strBuild += "<i>&#945;</i> <input type='text'  name='alpha_frac' id='alpha_frac' size='7' class='text'> ";
//	strBuild += "<i>&#946;</i> <input type='text'  name='beta_frac' id='beta_frac' size='7' class='text'> ";
//	strBuild += "<i>&#947;</i> <input type='text'  name='gamma_frac' id='gamma_frac' size='7' class='text'> ";
//	strBuild += " degrees <br><br> "
//		+ createButton("createCrystal", "Create structure",
//				"createMolecularCrystal()", "") + "</div>";
//	strBuild += createLine('blue', '');
//	strBuild += "</td></tr>\n";
//	strBuild += "<tr><td>\n";
//	strBuild += "Optimize (OPT.) structure  UFF force filed<br>";
//	strBuild += "Rappe, A. K., <i>et. al.</i>; <i>J. Am. Chem. Soc.</i>, 1992, <b>114</b>, 10024-10035. <br><br>";
//	strBuild += createButton("minuff", "Optimize", "minimizeStructure()", "");
//	strBuild += createCheck("fixstructureUff", "fix fragment",
//			'fixFragmentUff(this) + toggleDiv(this,"fragmentSelected")', "",
//			"", "")
//			+ " ";
//	strBuild += createButton("stopuff", "Stop Opt.", "stopOptimize()", "");
//	strBuild += createButton("resetuff", "Reset Opt.", "resetOptimize()", "");
//	strBuild += "</td></tr><tr><td><div id='fragmentSelected' style='display:none; margin-top:20px'>Fragment selection options:<br>";
//	// strBuild += "by element "
//	// + createSelectKey('colourbyElementList', "elementSelected(value)",
//	// "elementSelected(value)", "", 1) + "\n";
//	// strBuild += "&nbsp;by atom &nbsp;"
//	// + createSelect2('colourbyAtomList', 'atomSelected(value)', '', 1)
//	// + "\n";
//	strBuild += createCheck("byselection", "by picking &nbsp;",
//			'setPicking(this)', 0, 0, "set picking");
//	strBuild += createCheck("bydistance", "within a sphere (&#197) &nbsp;",
//			'setDistanceHide(this)', 0, 0, "");
//	strBuild += createCheck("byplane", " within a plane &nbsp;",
//			'onClickPickPlane(this,buildPickPlaneCallback)', 0, 0, "");
//	strBuild += "</div>";
//	strBuild += "</td></tr><tr><td>\n";
//	strBuild += "<br> Structural optimization criterion: <br>";
//	strBuild += "Opt. threshold <input type='text'  name='optciteria' id='optciteria' size='7'  value='0.001' class='text'> kJ*mol<sup>-1</sup> (Def.: 0.001, Min.: 0.0001) <br>";
//	strBuild += "Max. No. Steps <input type='text'  name='maxsteps' id='maxsteps' size='7'  value='100' class='text'> (Def.: 100)";
//	strBuild += "<tr><td>";
//	strBuild += "<br> Optimization Output: <br>";
//	strBuild += createTextArea("textUff", "", 4, 50, "");
//	strBuild += createLine('blue', '');
//	strBuild += "</td></tr>\n";
//	strBuild += "</table>\n";
//	strBuild += "</form>\n";
//	return strBuild;
//}

function createMeasureGrp() {
	var measureName = new Array("select", "Angstroms", "Bohr", "nanometers",
	"picometers");
	var measureValue = new Array("select", "angstroms", "BOHR", "nm", "pm");
	var textValue = new Array("0", "6", "8", "10", "12", "16", "20", "24", "30");
	var textText = new Array("select", "6 pt", "8 pt", "10 pt", "12 pt",
			"16 pt", "20 pt", "24 pt", "30 pt");
	
	var strMeas = "<form autocomplete='nope'  id='measureGroup' name='measureGroup' style='display:none'>";
	strMeas += "<table class='contents'><tr><td > \n";
	strMeas += "<h2>Measure and Info</h2>\n";
	strMeas += "</td></tr>\n";
	strMeas += "<tr><td colspan='2'>\n";
	strMeas += "Measure<br>\n";
	strMeas += createRadio("distance", "distance", 'checkMeasure(value)', '',
			0, "", "distance");
	strMeas += createSelectFunc('measureDist', 'setMeasureUnit(value)',
			'setTimeout("setMeasureUnit(value) ",50)', 0, 1, measureValue,
			measureName)
			+ " ";
	strMeas += createRadio("distance", "angle", 'checkMeasure(value)', '', 0,
			"", "angle");
	strMeas += createRadio("distance", "torsional", 'checkMeasure(value)', '',
			0, "", "torsional");
	strMeas += "<br><br> Measure value: <br>"
		+ createTextArea("textMeasure", "", 10, 60, "");
	strMeas += "<br>"
		+ createButton('resetMeasure', 'Delete Measure/s', 'mesReset()', '')
		+ "<br>";
	strMeas += "</td></tr>\n";
	strMeas += "<tr><td>Measure colour: "
		+ createButton("colorMeasure", "Default colour",
				'runJmolScriptWait("color measures none")', 0) + "</td><td >\n";
	strMeas += "<script align='left'>jmolColorPickerBox([setColorWhat, 'measures'],[255,255,255],'measureColorPicker')</script>";
	strMeas += "</td></tr>";
	strMeas += "<tr><td colspan='2'>";
	strMeas += createLine('blue', '');
	strMeas += "</td></tr>";
	strMeas += "<tr><td colspan='2'>";
	strMeas += "View coordinates: ";
	strMeas += createRadio("coord", "fractional", 'viewCoord(value)', '', 0, "", "fractional");
	strMeas += createRadio("coord", "cartesian", 'viewCoord(value)', '', 0, "", "cartesian");
	strMeas += createLine('blue', '');
	strMeas += "</td></tr>";
	strMeas += "<tr><td colspan='2'>";
	strMeas += "Font size ";
	strMeas += createSelect("fSize", "setMeasureSize(value)", 0, 1,
			textValue, textText);
	strMeas += createLine('blue', '');
	strMeas += "</td></tr>";
	strMeas += "</table></FORM>  \n";
	return strMeas;
}

function createOrientGrp() {
	var motionValueName = new Array("select", "translate", "rotate");
	var strOrient = "<form autocomplete='nope'  id='orientGroup' name='orientGroup' style='display:none'>\n";
	strOrient += "<table class='contents' ><tr><td><h2>Orientation and Views</td><tr>\n";
	strOrient += "<tr><td>\n";
	strOrient += "Spin "
		+ createRadio("spin", "x", 'runJmolScriptWait("spin x")', 0, 0, "", "") + "\n";
	strOrient += createRadio("spin", "y", 'runJmolScriptWait("spin y")', 0, 0, "", "")
	+ "\n";
	strOrient += createRadio("spin", "z", 'runJmolScriptWait("spin z")', 0, 0, "", "")
	+ "\n";
	strOrient += createRadio("spin", "off", 'runJmolScriptWait("spin off")', 0, 1, "", "")
	+ "\n";
	strOrient += createLine('blue', '');
	strOrient += "</td></tr>\n";
	strOrient += "<tr><td>\n";
	strOrient += "Zoom " + createButton('in', 'in', 'runJmolScriptWait("zoom in")', '')
	+ " \n";
	strOrient += createButton('out', 'out', 'runJmolScriptWait("zoom out")', '') + " \n";
	strOrient += createLine('blue', '');
	strOrient += "</td></tr>\n";
	strOrient += "<tr><td>\n";
	strOrient += "View from"
		+ createButton('top', 'top', 'runJmolScriptWait("moveto  0 1 0 0 -90")', '')
		+ " \n";
	strOrient += createButton('bottom', 'bottom', 'runJmolScriptWait("moveto  0 1 0 0 90")',
	'')
	+ " \n";
	strOrient += createButton('left', 'left', 'runJmolScriptWait("moveto  0 0 1 0 -90")', '')
	+ " \n";
	strOrient += createButton('right', 'right', 'runJmolScriptWait("moveto  0 0 1 0 90")',
	'')
	+ " \n";
	strOrient += "<br> Orient along ";
	strOrient += createButton(
			'a',
			'a',
			'runJmolScriptWait("moveto 1.0 front;var axisA = {1/1 0 0};var axisZ = {0 0 1};var rotAxisAZ = cross(axisA,axisZ);var rotAngleAZ = angle(axisA, {0 0 0}, rotAxisAZ, axisZ);moveto 1.0 @rotAxisAZ @{rotAngleAZ};var thetaA = angle({0 0 1}, {0 0 0 }, {1 0 0}, {1, 0, 1/});rotate z @{0-thetaA};")',
	'');
	strOrient += createButton(
			'b',
			'b',
			'runJmolScriptWait("moveto 1.0 front;var axisB = {0 1/1 0};var axisZ = {0 0 1};var rotAxisBZ = cross(axisB,axisZ);var rotAngleBZ = angle(axisB, {0 0 0}, rotAxisBZ, axisZ);moveto 1.0 @rotAxisBZ @{rotAngleBZ}")',
	'');
	strOrient += createButton(
			'c',
			'c',
			'runJmolScriptWait("moveto 1.0 front;var axisC = {0 0 1/1};var axisZ = {0 0 1};var rotAxisCZ = cross(axisC,axisZ);var rotAngleCZ = angle(axisC, {0 0 0}, rotAxisCZ, axisZ);moveto 1.0 @rotAxisCZ @{rotAngleCZ}")',
	'');
	strOrient += createLine('blue', '');
	strOrient += "</td></tr>\n";
	strOrient += "<tr><td>\n";
	strOrient += "Z-Clip functions<br>"
		+ createCheck("slabToggle", "Z-clip", 'toggleSlab()', 0, 0,
		"slabToggle");
	strOrient += "</td></tr>\n";
	strOrient += "<tr><td>\n";
	strOrient += "Front";
	strOrient += "</td></tr>\n";
	strOrient += "<tr><td>\n";
	strOrient += createSlider("slab");
	strOrient += "</td></tr>\n";
	strOrient += "<tr><td>\n";
	strOrient += "Back";
	strOrient += "</td></tr>\n";
	strOrient += "<tr><td>\n";
	strOrient += createSlider("depth");
	strOrient += "</td></tr>\n";
	strOrient += "<tr><td>\n";
	strOrient += createLine('blue', '');
	strOrient += "</td></tr>\n";
	strOrient += "<tr><td>\n";
	strOrient += "Fine orientation\n";
	strOrient += "<table class='contents'> \n";
	strOrient += "<tr><td colspan='3'>Motion "
		+ createSelectFunc('setmotion', 'setKindMotion(value)',
				'setTimeout("setKindMotion(value)",50)', 0, 1,
				motionValueName, motionValueName);
	strOrient += " magnitude\n";
	strOrient += "<input type='text' value='5' class='text' id='fineOrientMagn' size='3'> &#197 / degree;";
	strOrient += "</td></tr>\n";
	strOrient += "<tr><td colspan='2'> ";
	strOrient += createCheck(
			"moveByselection",
			"move only slected atom/s",
			"checkBoxStatus(this, 'byElementAtomMotion')  + checkBoxStatus(this, 'byAtomMotion')",
			0, 0, "moveByselection");
	strOrient += "</td></tr>\n";
	strOrient += "<tr><td colspan='2'> ";
	strOrient += "by element "
		+ createSelect2("byElementAtomMotion", "elementSelected(value)", false, 1) + "\n";
	// strOrient += "&nbsp;by atom &nbsp;"
	// + createSelect2('byAtomMotion', 'atomSelected(value)', '', 1) + "\n";
	strOrient += createCheck("byselectionOrient", "by picking &nbsp;",
			'setPicking(this)', 0, 0, "set picking");
	strOrient += "</td></tr><tr><td colspan='2'>\n";
	strOrient += createButton('orient_selectAll', 'select All', 'selectAll()', '')
	+ "\n";
	strOrient += createButton('unselect', 'unselect All',
			'runJmolScriptWait("select *; halos off")', '')
			+ "\n";
	strOrient += createButton('halooff', 'Halos off',
			'runJmolScriptWait("halos off; selectionhalos off" )', '')
			+ "\n";
	strOrient += createButton('labelon', 'Labels on',
			'runJmolScriptWait("label on;label display")', '')
			+ "\n";
	strOrient += createButton('labeloff', 'Hide Labels',
			'runJmolScriptWait("label hide")', '')
			+ "\n";
	strOrient += "</td></tr><td ><tr>\n";
	strOrient += "<table >\n";
	strOrient += "<tr><td>"
		+ createButton('-x', '-x', 'setMotion(id)', '', 'width:40px;')
		+ "</td><td>\n";
	strOrient += createButton('x', '+x', 'setMotion(id)', '', 'width:40px;')
	+ "</td></tr>\n";
	strOrient += "<tr><td>"
		+ createButton('-y', '-y', 'setMotion(id)', '', 'width:40px;')
		+ "</td><td>\n";
	strOrient += createButton('y', '+y', 'setMotion(id)', '', 'width:40px;')
	+ "</td></tr>\n";
	strOrient += "<tr><td>"
		+ createButton('-z', '-z', 'setMotion(id)', '', 'width:40px;')
		+ "</td><td>\n";
	strOrient += createButton('z', '+z', 'setMotion(id)', '', 'width:40px;')
	+ "</td></tr>\n";
	strOrient += "</table> \n";
	strOrient += "<tr><td>\n";
	strOrient += "</td></tr>\n";
	strOrient += "</table>\n";
	strOrient += createLine('blue', '');
	strOrient += "</form>\n";
	return strOrient;
}

function createCellGrp() {
	var unitcellName = new Array("0 0 0", "1/2 1/2 1/2", "1/2 0 0", "0 1/2 0",
			"0 0 1/2", "-1/2 -1/2 -1/2", "1 1 1", "-1 -1 -1", "1 0 0", "0 1 0",
	"0 0 1");
	var unitcellSize = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9",
			"10", "11", "12", "13", "14", "15", "16", "17", "18", "19");
	var strCell = "<form autocomplete='nope'  id='cellGroup' name='cellGroup' style='display:none'>";
	strCell += "<table class='contents'><tr><td><h2>Cell properties</h2></td></tr>\n";
	strCell += "<tr><td colspan='2'>"
		+ createCheck("cell", "View Cell",
				"setJmolFromCheckbox(this, this.value)", 0, 1, "unitcell");
	strCell += createCheck("axes", "View axes",
			"setJmolFromCheckbox(this, this.value)", 0, 1, "set showAxes");
	strCell += "</td></tr><tr><td> Cell style:  \n";
	strCell += "size "
		+ createSelectFunc('offsetCell',
				'runJmolScriptWait("set unitcell " + value + ";")',
				'setTimeout("runJmolScriptWait("set unitcell " + value +";")",50)', 0,
				1, unitcellSize, unitcellSize) + "\n";
	strCell += " dotted "
		+ createCheck("cellDott", "dotted, ", "setCellDotted()", 0, 0,
		"DOTTED") + "  color ";
	strCell += "</td><td align='left'>\n";
	strCell += "<script align='left'>jmolColorPickerBox([setColorWhat, 'unitCell'],[0,0,0],'unitcellColorPicker')</script>";
	strCell += "</td></tr>\n";
	// strCell += createLine('blue', '');
	strCell += "<tr><td colspan='2'>Set cell:  \n";

	strCell += createRadio("cella", "primitive", 'setCellType(value)', 0, 1,
			"primitive", "primitive")
			+ "\n";
	strCell += createRadio("cella", "conventional", 'setCellType(value)', 0, 0,
			"conventional", "conventional")
			+ "\n";
	strCell += "</td></tr>\n";
	strCell += "<tr><td> \n";
	strCell += createCheck('superPack', 'Auto Pack', 'uncheckPack()', 0, 1, '')
	+ " ";
	strCell += createCheck('chPack', 'Choose Pack Range',
			'checkPack() + toggleDiv(this,"packDiv")', '', '', '');
	strCell += "</td></tr>\n";
	strCell += "<tr><td> \n";
	strCell += "<div id='packDiv' style='display:none; margin-top:30px'>";
	strCell += createSlider("pack");
	strCell += "</div></td></tr>\n";
	strCell += "<tr><td colspan='2'> \n";
	strCell += createLine('blue', '');
	strCell += "Supercell: <br>";
	strCell += "</td></tr><tr><td colspan='2'>\n";
	strCell += "<i>a: </i>";
	strCell += "<input type='text'  name='par_a' id='par_a' size='1' class='text'>";
	strCell += "<i> b: </i>";
	strCell += "<input type='text' name='par_b' id='par_b' size='1' class='text'>";
	strCell += "<i> c: </i>";
	strCell += "<input type='text'  name='par_c' id='par_c' size='1' class='text'> &#197;";
	strCell += createCheck('supercellForce', 'force supercell (P1)', '', '',
			'', '')
			+ "<br>\n";
	strCell += createButton('set_pack', 'pack', 'setPackaging("packed")', '') + " \n";
	strCell += createButton('set_pack', 'centroid', 'setPackaging("centroid")', '') + " \n";
	strCell += createButton('set_pack', 'unpack', 'setPackaging("")', '') + " \n";
	strCell += createLine('blue', '');
	strCell += "</td></tr>\n";
	strCell += "<tr><td colspan='2'> \n";
	strCell += "Offset unitcell \n<br>";
	strCell += "Common offsets "
		+ createSelectFunc('offsetCell', 'setUnitCellOrigin(value)',
				'setTimeout("setUnitCellOrigin(value)",50)', 0, 1,
				unitcellName, unitcellName) + "\n";
	strCell += "<br>  \n"
		strCell += createButton('advanceCelloffset', '+',
				'toggleDivValue(true,"advanceCelloffDiv",this)', '')
				+ " Advanced cell-offset options <br>"
				strCell += "<div id='advanceCelloffDiv' style='display:none; margin-top:20px'>"
					+ createCheck("manualCellset", "Manual set",
							'checkBoxStatus(this, "offsetCell")', 0, 0, "manualCellset")
							+ "\n";
	strCell += " x: ";
	strCell += "<input type='text'  name='par_x' id='par_x' size='3' class='text'>";
	strCell += " y: ";
	strCell += "<input type='text'  name='par_y' id='par_y' size='3' class='text'>";
	strCell += " z: ";
	strCell += "<input type='text'  name='par_z' id='par_z' size='3' class='text'>";
	strCell += createButton('setnewOrigin', 'set', 'setManualOrigin()', '')
	+ " \n";
	strCell += "</div>";
	strCell += createLine('blue', '');
	strCell += "</td></tr>\n";
	strCell += "<tr ><td colspan='2'>\n";
	strCell += "Cell parameters (selected model)<br>\n";
	strCell += "Unit: "
		+ createRadio("cellMeasure", "&#197", 'setCellMeasure(value)', 0,
				1, "", "a") + "\n";
	strCell += createRadio("cellMeasure", "Bohr", 'setCellMeasure(value)', 0,
			0, "", "b")
			+ "\n <br>";
	strCell += "<i>a</i> " + createText2("aCell", "", 7, 1);
	strCell += "<i>b</i> " + createText2("bCell", "", 7, 1);
	strCell += "<i>c</i> " + createText2("cCell", "", 7, 1) + "<br><br>\n";
	strCell += "<i>&#945;</i> " + createText2("alphaCell", "", 7, 1);
	strCell += "<i>&#946;</i> " + createText2("betaCell", "", 7, 1);
	strCell += "<i>&#947;</i> " + createText2("gammaCell", "", 7, 1)
	+ " degrees <br><br>\n";
	strCell += "Voulme cell " + createText2("volumeCell", "", 10, 1)
	+ "  &#197<sup>3</sup><br><br>";
//	strCell += createButton('advanceCell', '+',
//			'toggleDivValue(true,"advanceCellDiv",this)', '')
//			+ " Advanced cell options <br>";
	strCell += "<div id='advanceCellDiv' style='display:block; margin-top:20px'>"
	strCell += "<i>b/a</i> " + createText2("bovera", "", 8, 1) + " ";
	strCell += "<i>c/a</i> " + createText2("covera", "", 8, 1);
	strCell += "</div>"
		strCell += createLine('blue', '');
	strCell += "</td></tr>\n";
	strCell += "<tr><td colspan='2'> \n";
	strCell += "Symmetry operators ";
	strCell += "<div id='syminfo'></div>";
	strCell += createLine('blue', '');
	strCell += "</td></tr>\n";
	strCell += "</table></FORM>\n";
	return strCell;
}

function createPolyGrp() {
	var polyEdgeName = new Array("select", "4, 6", "4 ", "6", "8", "10", "12");
	var polyStyleName = new Array("select", "flat", "collapsed edges",
			"no edges", "edges", "frontedges");
	var polyStyleValue = new Array("NOEDGES", "noedges", "collapsed",
			"noedges", "edges", "frontedges");
	var polyFaceName = new Array("0.0", "0.25", "0.5", "0.9", "1.2");
	var strPoly = "<form autocomplete='nope'  id='polyGroup' name='polyGroup' style='display:none'>\n";
	strPoly += "<table class='contents'>\n";
	strPoly += "<tr><td>\n";
	strPoly += "<h2>Polyhedron</h2>\n";
	strPoly += "</td></tr>\n";
	strPoly += "<tr><td colspan='2'>\n";
	strPoly += "Make polyhedra: \n";
	strPoly += "</td></tr>\n";
	strPoly += "<tr><td  colspan='2'>\n";
	strPoly += "</td></tr>\n";
	strPoly += "<tr><td colspan='2'>\n";
	strPoly += "&nbsp;a) Select central atom:  <br>\n";
	strPoly += "&nbsp;&nbsp;  by element "
		+ createSelect2('polybyElementList', "", false, 0);
	// strPoly+=createCheck("byselectionPoly", "&nbsp;by picking &nbsp;",
	// 'setPolybyPicking(this)', 0, 0, "set picking") + "<br>\n";
	strPoly += "<br>&nbsp;&nbsp;just central atom"
		+ createCheck("centralPoly", "",
				'checkBoxStatus(this, "poly2byElementList")', 0, 0, "");
	strPoly += "</td></tr>\n";
	strPoly += "<tr><td colspan='2'>\n";
	strPoly += "&nbsp; b) select vertex atoms:  <br>\n";
	strPoly += "&nbsp;&nbsp;  by element "
		+ createSelect2('poly2byElementList', "", false, 0) + "\n";
	strPoly += "</td></tr>\n";
	strPoly += "<tr><td colspan='2'>\n";
	strPoly += "&nbsp; c) based on <br>";
	strPoly += "&nbsp;"
		+ createRadio("bondPoly", "bond", 'makeDisable("polyDistance") ',
				0, 0, "bondPoly", "off");
	strPoly += createRadio("bondPoly", " max distance ",
			' makeEnable("polyDistance")', 0, 0, "bondPoly1", "on");
	strPoly += createText2("polyDistance", "2.0", "3", "") + " &#197;";
	strPoly += "</td></tr>\n";
	strPoly += "<tr><td colspan='2'>\n";
	strPoly += "&nbsp;d) number of vertex "
		+ createSelect('polyEdge', '', 0, 0, polyEdgeName) + "\n";
	strPoly += createLine('blue', '');
	strPoly += "</td></tr>\n";
	strPoly += "<tr><td colspan='2'>\n";
	strPoly += "Polyedra style:<br>\n";
	strPoly += "</td></tr><tr><td > &nbsp;a) colour polyhedra\n";
	strPoly += createButton("polyColor", "Default colour",
			'runJmolScriptWait("set defaultColors Jmol")', 0);
	strPoly += "</td><td align='left'><script>\n";
	strPoly += "jmolColorPickerBox([setColorWhat,'polyhedra'],'','polyColorPicker');";
	strPoly += "</script> </td></tr>";
	strPoly += "<tr><td colspan='2'>\n";
	strPoly += createButton('advancePoly', '+',
			'toggleDivValue(true,"advancePolyDiv",this)', '')
			+ " Advanced style options"
			strPoly += "<div id='advancePolyDiv' style='display:none; margin-top:20px'>"
				strPoly += "<br> &nbsp;b)"
					+ createRadio("polyFashion", "opaque",
							'runJmolScriptWait("color polyhedra opaque") ', 0, 1, "opaque", "opaque")
							+ "\n";
	strPoly += createRadio("polyFashion", "translucent",
			'runJmolScriptWait("color polyhedra translucent") ', 0, 0, "translucent",
	"translucent")
	+ "\n<br><br>";
	strPoly += "&nbsp;c) style edges\n"
		+ createSelect('polyVert', 'checkPolyValue(this.value)', 0, 0,
				polyStyleValue, polyStyleName) + "\n";
	strPoly += "<br>"
		strPoly += "&nbsp;&nbsp;collapsed faces Offset \n"
			+ createSelect('polyFace', '', 0, 0, polyFaceName) + "\n";
	strPoly += "</div>";
	strPoly += createLine('blue', '');
	strPoly += "</td></tr>\n";
	strPoly += "<tr><td colspan='2'>\n";
	strPoly += createButton('createPoly', 'create', 'createPolyedra()', '');
	strPoly += createButton('createpoly', 'create auto',
			'runJmolScriptWait("polyhedra 4,6 " + getValue("polyVert"))', '');
	strPoly += createButton('deletePoly', 'delete', 'runJmolScriptWait("polyhedra DELETE")',
	'');
	strPoly += "</td></tr>\n";
	strPoly += "</table>\n";
	strPoly += "</FORM>\n";
	return strPoly;
}

function createIsoGrp() {
	var isoName = new Array("select a surface type",
			"from CUBE or JVXL file",
			"isosurface OFF",
			"isosurface ON",
			"Van der Waals", 
			"periodic VdW",
			"solvent accessible", 
			"molecular"
			// BH: TODO: Note that these do not allow mapping
//			,"geodesic VdW", "geodesic IONIC", "dots VdW", "dots IONIC"
			);
	var isoValue = new Array('',
			'isosurface "?"',
			'isosurface OFF',
			'isosurface ON',
			SURFACE_VDW, 
			SURFACE_VDW_PERIODIC,
//			SURFACE_VDW_MEP,
//			SURFACE_VDW_MEP_PERIODIC,
			'isosurface SASURFACE',
			'isosurface MOLSURFACE resolution 0 molecular'
//			,
//			'geoSurface VANDERWAALS', 
//			'geoSurface IONIC',
//			'dots VANDERWAALS', 
//			'dots IONIC'
			);
	var colSchemeName = new Array("Rainbow (default)", "Black & White",
			"Blue-White-Red", "Red-Green", "Green-Blue");
	var colSchemeValue = new Array("roygb", "bw", "bwr", "low", "high");
	/*
	 * TODO slab unitcell. /
	 * http://chemapps.stolaf.edu/jmol/docs/examples-11/new.htm isosurface /
	 * lattice {a b c}
	 */
	var strIso = "<form autocomplete='nope'  id='isoGroup' name='isoGroup' style='display:none'>\n";
	strIso += "<table class='contents'>\n";
	strIso += "<tr><td colspan='2'>\n";
	strIso += "<h2>IsoSurface</h2>\n";
	strIso += "</td></tr>\n";
	strIso += "<tr><td colspan='2'>\n";
	//strIso += "Molecular (classic) isoSurfaces: \n <br>";
	strIso += createSelect('createIso', 'onClickCreateIso(this.value)', 0, 0,
			isoValue, isoName)
			+ "&nbsp;";
	strIso += createButton('removeIso', 'remove iso', 'runJmolScriptWait("isosurface OFF")','');
	strIso += createLine('blue', '');
	strIso += "</td></tr><tr><td colspan='2'>\n";
	strIso += createButton('mapMEP', 'map charges', 'onClickMapMEP()','');
	strIso += createButton('mapCube', 'map from CUBE file', 'onClickMapCube()','');
	strIso += createButton('mapPlane', 'map plane', 'onClickPickPlane(null, surfacePickPlaneCallback)','');
	strIso += "<br>Color map settings<br>\n ";
	strIso += "<img src='images/band.png'><br><br>";
	strIso += "- " + createText2("dataMin", "", "12", 0) + " + "
	+ createText2("dataMax", "", "12", 0) + " e- *bohr^-3<br>";
	strIso += "<br> Colour-scheme "
		+ createSelect('isoColorScheme', 'setIsoColorscheme()', 0, 0,
				colSchemeValue, colSchemeName) + "&nbsp<br>";
	strIso += createButton('up', 'Update map', 'setIsoColorRange()', '');
	// + createButton('reverseColor', 'Reverse colour', 'setIsoColorReverse()',
	// '');
	strIso += createLine('blue', '');
	strIso += "<td><tr>\n";
	// strIso+="Volume isoSurface<br>"
	// strIso+=createButton('volIso', 'calculate', 'runJmolScriptWait('isosurface
	// VOLUME')', '') + " \n";
	// strIso+=createText3('isoVol','','','',"");
	// strIso+=createLine('blue' , '');
	// strIso+="</td></tr>\n";
	strIso += "<tr><td colspan='2'>\n";
	strIso += "Expand isoSurface periodically <br>";
	strIso += "<i>a: </i>";
	strIso += "<input type='text'  name='iso_a' id='iso_a' size='1' class='text'>";
	strIso += "<i> b: </i>";
	strIso += "<input type='text'  name='iso_b' id='iso_b' size='1' class='text'>";
	strIso += "<i> c: </i>";
	strIso += "<input type='text'  name='iso_c' id='iso_c' size='1' class='text'>";
	strIso += createButton('set_Isopack', 'packIso', 'setIsoPack()', '')
	+ " \n";
	strIso += createLine('blue', '');
	strIso += "</td></tr>\n";
	strIso += "<tr><td colspan='2'>\n";
	strIso += "Style isoSurface:<br>";
	strIso += "</td></tr>\n";
	strIso += "<tr><td colspan='2'>\n";
	strIso += createRadio("isofashion", "opaque",
			'runJmolScriptWait("color isosurface opaque") ', 0, 1, "", "");
	strIso += createRadio("isofashion", "translucent",
			'runJmolScriptWait("color isosurface translucent") ', 0, 0, "", "")
			+ "<br>";
	strIso += createRadio("isofashion", "dots", 'runJmolScriptWait("isosurface  dots;") ',
			0, 0, "", "");
	strIso += createRadio("isofashion", "no-fill mesh",
			'runJmolScriptWait("isosurface nofill mesh") ', 0, 0, "", "");
	strIso += "</td></tr>\n";
	strIso += "<tr><td>\n";
	strIso += "Color Isosurface:\n";
	strIso += "</td><td><script>\n";
	strIso += "jmolColorPickerBox([setColorWhat,'isosurface'], '','surfaceColorPicker');";
	strIso += "</script>";
	strIso += "</td></tr>";
	strIso += "<tr><td>\n";
	strIso += createLine('blue', '');
	strIso += createCheck("measureIso", "Measure value", "pickIsoValue()", 0,
			0, "measureIso")
			+ "\n";
	// strIso += "<input type='text' name='isoMeasure' id='isoMeasure' size='5'
	// class='text'> a.u.\n";
	strIso += "</td></tr>\n";
	strIso += "<tr><td colspan='2'>\n";
	strIso += createCheck("removeStr", "Show structure beneath",
			"removeStructure()", 0, 1, "")
			+ " \n";
	strIso += createCheck("removeCellI", "Show cell", "removeCellIso()", 0, 1,
	"")
	+ " \n";
	strIso += createLine('blue', '');
	strIso += "</td></tr>\n";
	strIso += "</table>\n";
	strIso += "</FORM>\n";
	return strIso;
}

function createGeometryGrp() {
	var vecAnimValue = new Array("", "set animationFps 5",
			"set animationFps 10", "set animationFps 15",
			"set animationFps 20", "set animationFps 25",
			"set animationFps 30", "set animationFps 35");
	var vecAnimText = new Array("select", "5", "10", "15", "20", "25", "30",
	"35");
	var vecUnitEnergyVal = new Array("h", "e", "r", "kj", "kc");
	var vecUnitEnergyText = new Array("Hartree", "eV", "Rydberg", "kJ*mol-1",
	"kcal*mol-1");
	var strGeom = "<form autocomplete='nope'  id='geometryGroup' name='modelsGeom' style='display:none'>";
	strGeom += "<table class='contents'><tr><td>";
	strGeom += "<h2>Geometry optimization</h2>\n";
	strGeom += "</td></tr>"
		strGeom += "<tr><td>\n";
	strGeom += createButton("<<", "<<",
			'runJmolScriptWait("model FIRST");  selectListItem(document.modelsGeom.models, "0")', 0)
			+ "\n";
	strGeom += createButton(">", ">", 'runJmolScriptWait("animation ON")'/* + selectFrame'*/, 0) + "\n";
	// BH: note that "selectFrame()" does not exist in the Java, either
	strGeom += createButton("||", "||", 'runJmolScriptWait("frame PAUSE")', 0) + "\n";
	strGeom += createButton(">>", ">>", 'runJmolScriptWait("model LAST")', 0) + "\n";
	strGeom += createButton(
			"loop",
			"loop",
			'runJmolScriptWait("frame REWIND; animation off;animation mode loop;animation on")',
			0)
			+ "\n";
	strGeom += createButton(
			"palindrome",
			"palindrome",
			'runJmolScriptWait("frame REWIND; animation off;  animation mode palindrome;animation on")',
			0)
			+ "\n";
	strGeom += "<br>"
		+ createSelect("framepersec", "runJmolScriptWait(value)", 0, 1, vecAnimValue,
				vecAnimText) + " motion speed | ";
// this is problematic in JavaScript -- too many files created
//	strGeom += createCheck('saveFrames', ' save video frames', 'saveFrame()',
//			0, 0, "");
	strGeom += "<br> Energy unit measure: ";
	strGeom += createSelect("unitMeasureEnergy", "convertPlot(value)", 0, 1,
			vecUnitEnergyVal, vecUnitEnergyText);
	strGeom += "</td></tr><tr><td>";
	strGeom += "<select id='geom' name='models' onchange='showFrame(value)'  class='selectmodels' size='10'></select>";
	strGeom += "</td></tr><tr><td style='margin=0px; padding=0px;'><div id='appletdiv' style='display:none'>\n";
	strGeom += createDiv("graphdiv",
	"width:180;height:180;background-color:#EFEFEF; margin-left:0px;display:none")
	+ "\n";
	strGeom += createDiv("plottitle", "display:none")
	+ "&#916E (kJ/mol)</div>\n";
	strGeom += createDiv("plotarea",
	"width:180px;height:180px;background-color:#EFEFEF; display:none")
	+ "</div>\n";
	strGeom += "<div id='appletdiv1' style='display:none'>\n";
	strGeom += createDiv("graphdiv1",
	"width:180;height:180;background-color:#EFEFEF; margin-left:0px;display:none")
	+ "\n";
	strGeom += createDiv("plottitle1", "display:none") + "ForceMax </div>\n";
	strGeom += createDiv("plotarea1",
	"width:180px;height:180px;background-color:#efefEF;display:none")
	+ "</div>\n";
	strGeom += "</div></div></div>\n";
	strGeom += "</table></form>\n";
	return strGeom;
}

function createFreqGrp() {
	// TODO -- move this into _m_spectra.js
	var vibAmplitudeValue = new Array("", "vibration Scale 1",
			"vibration Scale 2", "vibration Scale 5", "vibration Scale 7", "vibration Scale 10");
	var vecscaleValue = new Array("", "vectors SCALE 1", "vectors SCALE 3",
			"vectors SCALE 5", "vectors SCALE 7", "vectors SCALE 10",
			"vectors SCALE 15", "vectors SCALE 19");
	var vecsizeValue = new Array("", "vectors 1", "vectors  3", "vectors  5",
			"vectors  7", "vectors 10", "vectors 15", "vectors  19");
	var vecscaleText = new Array("select", "1", "3", "5", "7", "10", "15", "19");
	var vibAmplitudeText = new Array("select", "1", "2", "5", "7", "10");

	var strFreq = "<table class='contents'><tr><td valign='top'><form autocomplete='nope'  id='freqGroup' name='modelsVib' style='display:none'>";
	strFreq += "<h2>IR-Raman Frequencies</h2>\n";
	strFreq += "<select id='vib' name='models' OnClick='onClickSelectVib(value)' class='selectmodels' size=15 style='width:120px; overflow: auto;'></select>";
	strFreq += "<BR>\n";
	strFreq += createRadio("modSpec", "All", "onClickModSpec()", 0, 1, "",
	"all");
	strFreq += createRadio("modSpec", "IR", "onClickModSpec()", 0, 0, "",
	"ir");
	strFreq += createRadio("modSpec", "Raman", "onClickModSpec()", 0, 0, "",
	"raman");
	strFreq += "<BR>\n";
	strFreq += "Symmetry <select id='sym' name='vibSym' onchange='onChangeListSym(value)' onkeypress='onChangeListSym()' CLASS='select' >";
	strFreq += "</select> ";
	strFreq += "<BR>\n";
	strFreq += "vibration ";
	strFreq += createRadio("vibration", "on", 'onClickFreqParams()', 0, 1,
			"radVibrationOn", "on");
	strFreq += createRadio("vibration", "off", 'onClickFreqParams()', 0, 0,
			"radVibrationOff", "off");
	strFreq += "<BR>\n";
	strFreq += createSelect("vecsamplitude", "onClickFreqParams()", 0, 1,
			vibAmplitudeValue, vibAmplitudeText,[0,1])
			+ " vib. amplitude";
	strFreq += "<BR>\n";
	strFreq += createCheck("vectors", "view vectors",
			"onClickFreqParams()", 0, 1, "vectors");
	strFreq += "<BR>\n";
	strFreq += createSelect("vecscale", "onClickFreqParams()", 0, 1, vecscaleValue,
			vecscaleText,[0,0,1])
			+ " vector scale";
	strFreq += "<BR>\n";
	strFreq += createSelect("sizevec", "onClickFreqParams()", 0, 1, vecsizeValue,
			vecscaleText,[0,0,0,1])
			+ " vector size";
	strFreq += "<BR>\n";
	strFreq += "<table class='contents'> <tr><td>vector color</td> <td><script>jmolColorPickerBox([setColorWhat,'vectors'],[255,255,255],'vectorColorPicker')</script></td>";
	strFreq += "</tr><tr><td>"
		+ createButton("vibVectcolor", "Default color",
				'onClickFreqParams()', 0) + "</td></tr></table>";
	strFreq += "</td><td valign='top'><div id='freqdiv' style='display:none'>\n";
	strFreq += createDiv("graphfreqdiv",
	"width:200;height:200;background-color:#EFEFEF; margin-left:5px; display:none")
	+ "\n";
	strFreq += createDiv("plottitlefreq", ";display:none")
	+ "IR - Raman  dispersion </div>\n";
	strFreq += createDiv("plotareafreq",
	"width:210;height:210px;background-color:#EFEFEF;display:none")
	+ "</div>\n";
	strFreq += "Raman intensities set to 0.0 kmMol<sup>-1</sup>";
	strFreq += "<br>\n";
	strFreq += createLine('blue', '');
	strFreq += "Simulate spectrum<br>";
	strFreq += createRadio("kindspectra", "IR", '', 0, 1, "", "ir");
	strFreq += createRadio("kindspectra", "Raman", '', 0, 1, "", "raman");
	strFreq += createRadio("kindspectra", "Both", '', 0, 1, "", "both");
	strFreq += "<br>Convolution with<br>";
	strFreq += createRadio("convol", "Stick", '', 0, 1, "", "stick");
	strFreq += createRadio("convol", "Gaussian", '', 0, 0, "", "gaus");
	strFreq += createRadio("convol", "Lorentzian", '', 0, 0, "", "lor");
	strFreq += "<br>Specrum setting <br>\n";
	strFreq += "band width " + createText2("sigma", "15", "3", "")
	+ " (cm<sup>-1</sup>)<br>";
	strFreq += "Min freq. " + createText2("nMin", "", "4", "");
	strFreq += " Max " + createText2("nMax", "", "4", "")
	+ "(cm<sup>-1</sup>)<br>";
	strFreq += createButton("simSpectra", "Simulate spectrum", "simSpectrum()",
			0)
			+ " ";
	strFreq += createCheck("rescaleSpectra", "Re-scale", "", 0, 1, "");
	strFreq += "</div></div>\n";
	strFreq += "</form></td></tr></table>";

	return strFreq;
}

function createElecpropGrp() {

	var colSchemeName = new Array("Rainbow (default)", "Black & White",
			"Blue-White-Red", "Red-Green", "Green-Blue");
	var colSchemeValue = new Array('roygb', 'bw', 'bwr', 'low', 'high');
	var strElec = "<form autocomplete='nope'  id='elecGroup' name='elecGroup' style='display:none'>\n";
	strElec += "<table class='contents'><tr><td ><h2>Electronic - Magnetic properties</h2> \n";
	strElec += "</td></tr>\n";
	strElec += "<tr><td>\n";
	strElec += "Mulliken population analysis\n <br>";
	strElec += createButton("mulliken", "view Mulliken",
			'runJmolScriptWait("script scripts/mulliken.spt")', 0);
	strElec += "<br> Colour-scheme "
		+ createSelect('chergeColorScheme', 'setColorMulliken(value)', 0, 0,
				colSchemeValue, colSchemeName)
				+ "&nbsp<br>";
	strElec += "</td></tr>\n";
	strElec += "<tr><td>\n";
	strElec += "Spin arrangment\n <br>";
	strElec += createButton("spin", "view Spin",
			'runJmolScriptWait("script scripts/spin.spt")', 0);
	strElec += " ";
	strElec += createButton("magnetiMoment", "view Magnetic Moment",
			'runJmolScript("script scripts/spin.spt")', 0);
	strElec += "<br> View only atoms with spin "
		+ createButton("spindown", "&#8595",
				'runJmolScriptWait("display property_spin <= 0")', 0);
	strElec += createButton("spinup", "&#8593",
			'runJmolScriptWait("display property_spin >= 0")', 0);
	// strElec+=createButton("magneticMoment","magn. Moment",'',0);
	strElec += "</td></tr>\n";
	strElec += "<tr><td>\n";
	strElec += createLine('blue', '');
	strElec += createButton("Removeall", "Remove", 'removeCharges()', 0);
	strElec += "</td></tr>\n";
	strElec += "<tr><td>\n";
	strElec += createLine('blue', '');
	strElec += "</td></tr>\n";
	strElec += "</table></form> \n";
	return strElec;
}

function createMainGrp() {
	var textValue = new Array("0", "6", "8", "10", "12", "16", "20", "24", "30");
	var textText = new Array("select", "6 pt", "8 pt", "10 pt", "12 pt",
			"16 pt", "20 pt", "24 pt", "30 pt");

	var shadeName = new Array("select", "1", "2", "3")
	var shadeValue = new Array("0", "1", "2", "3")
	var strOther = "<form autocomplete='nope'  id='otherpropGroup' name='otherpropGroup' style='display:none' >";
	strOther += "<table class='contents'><tr><td> \n";
	strOther += "<h2>Other properties</h2></td></tr>\n";
	strOther += "<tr><td>Background colour:</td>\n";
	strOther += "<td align='left'><script>jmolColorPickerBox([setColorWhat,'background'],[255,255,255],'backgroundColorPicker')</script></td></tr> \n";
	strOther += "<tr><td>"
		+ createLine('blue', '')
		+ createCheck(
				"perspective",
				"Perspective",
				'setJmolFromCheckbox(this, this.value)+toggleDiv(this,"perspectiveDiv")',
				0, 0, "set perspectiveDepth");
	strOther += "</td></tr><tr><td>"
	strOther += "<div id='perspectiveDiv' style='display:none; margin-top:20px'>";
	strOther += createSlider("cameraDepth");
	strOther += "</div></td></tr>\n";
	strOther += "<tr><td>"
		+ createCheck("z-shade", "Z-Fog", "setJmolFromCheckbox(this, this.value)",
				0, 0, "set zShade");
	strOther += " ";
	strOther += createSelect(
			'setzShadePower ',
			'runJmolScriptWait("set zShade; set zShadePower " + value + " ;") + setJmolFromCheckbox("z-shade","")',
			0, 1, shadeValue, shadeName)
			+ " Fog level";
	strOther += "</td></tr>\n";
	strOther += "<tr><td colspan='2'> Antialiasing"
		+ createRadio("aa", "on",
				'setAntialias(true)', 0,
				0, "");
	strOther += createRadio("aa", "off",
			'setAntiAlias(false)', 0, 1, "");
	strOther += createLine('blue', '');
	strOther += "</td></tr>";
	strOther += "<tr><td>";
	strOther += "Light settings";
	strOther += "</td></tr>";
	strOther += "<tr><td>";
	strOther += createSlider("SpecularPercent", "Reflection");
	strOther += "</td></tr><tr><td>";
	strOther += createSlider("AmbientPercent", "Ambient");
	strOther += "</td></tr><tr><td>";
	strOther += createSlider("DiffusePercent", "Diffuse");
	strOther += "</td></tr><tr><td colspan='2'>" + createLine('blue', '');
	strOther += "</tr><tr><td colspan='2'>"
		strOther += "3D stereo settings <br>"
			+ createRadio("stereo", "R&B", 'runJmolScriptWait("stereo REDBLUE")', 0, 0, "")
			+ "\n";
	strOther += createRadio("stereo", "R&C", 'runJmolScriptWait("stereo REDCYAN")', 0, 0, "")
	+ "\n";
	strOther += createRadio("stereo", "R&G", 'runJmolScriptWait("stereo REDGREEN")', 0, 0,
	"")
	+ "<br>\n";
	strOther += createRadio("stereo", "side-by-side", 'runJmolScriptWait("stereo ON")', 0,
			0, "")
			+ "\n";
	strOther += createRadio("stereo", "3D off", 'runJmolScriptWait("stereo off")', 0, 1, "")
	+ createLine('blue', '') + "</td></tr>\n";
	strOther += "<tr><td colspan='2'>";
	strOther += "Label controls <br>"
		strOther += createCheck("frameName", "Name model", "setFrameTitle(this)", 0,
				1, "frame title")
				+ " ";
	strOther += createCheck("jmollogo", "Jmol Logo",
			"setJmolFromCheckbox(this, this.value)", 0, 1, "set showFrank")
			+ "</td></tr>\n";
	strOther += "<tr><td colspan='2'>";
	strOther += "Font size ";
	strOther += createSelect("fontSize", "setTextSize(value)", 0, 1,
			textValue, textText);
	strOther += "</td></tr>";
	strOther += "<tr><td colspan='2'>"
		+ createButton("removeText", "Remove Messages", 'runJmolScriptWait("echo")', 0);
	strOther += createLine('blue', '')
		+ "</td></tr>\n";
	strOther += "</td></tr></table></FORM>  \n";
	return strOther;
}

///////////////////////////// create History Grp 

//function createHistGrp() {
//	var strHist = "<form autocomplete='nope'  id='HistoryGroup' name='HistoryGroup' style='display:none'>";
//	strHist += "History<BR>\n";
//	strHist += "Work in progress<BR>\n";
//	strHist += "</form>";
//	return strHist;
//}


