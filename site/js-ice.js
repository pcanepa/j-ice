
      		
///js// Js/init.js /////
// note that JmolColorPicker is customized -- BH 2018

function doClickSaveCurrentState() {
	warningMsg("This option only saves the state temporarily. To save your work, use File...Export...image+state(PNGJ). The image created can be dragged back into Jmol or JSmol or sent to a colleague to reproduce the current state exactly as it appears in the image.");
	runJmolScriptWait('save ORIENTATION orask; save STATE stask; save BOND bask');
}

function doClickReloadCurrentState() {
	runJmolScriptWait('restore ORIENTATION orask; restore STATE stask; restore BOND bask;');
}


// BH 2018.09.21 never used
//Array.prototype.max = function() {
//	var max = this[0];
//	var len = this.length;
//	for (var i = 1; i < len; i++)
//		if (this[i] > max)
//			max = this[i];
//	return max;
//}
//
//Array.prototype.min = function() {
//	var min = this[0];
//	var len = this.length;
//	for (var i = 1; i < len; i++)
//		if (this[i] < min)
//			min = this[i];
//	return min;
//}

runJmolScript = function(script) {
	debugSay(script);
	jmolScript(script);	
}

runJmolScriptWait = function(script) {
	debugSay(script);
	jmolScriptWait(script);	
}

createApplet = function() {
	Jmol.Info || (Jmol.Info = {});
	Jmol.Info.serverUrl = "https://chemapps.stolaf.edu/jmol/jsmol/php/jmol.php"
	jmolSetAppletColor("white");
	jmolApplet(
			[ "570", "570" ],
			"script scripts/init.spt;"
			+ getCallbackSettings()
			+ ";script scripts/reset.spt;"
			);
}

setAntialias = function(isON) {
	runJmolScriptWait(isOn? 
			"antialiasDisplay = true;set hermiteLevel 5"
			: "antialiasDisplay = false;set hermiteLevel 0"
	);
}

function setStatus(status) {
	setTextboxValue("statusLine", status); 
}
		
function warningMsg(msg) {
	alert("WARNING: " + msg);
}

function errorMsg(msg) {
	if (msg.indexOf("#CANCELED#") < 0) {
		alert("ERROR: " + msg);
	} else {
		runJmolScript("echo");
	}
	return false;
}

function messageMsg(msg) {
	alert(msg);
}

function docWriteTabs() {
	document.write(createTabMenu());
}

function docWriteBottomFrame() {
	document.write("<br> ");	
	document.write(createText5('statusLine', '', '108', '', '', "disab"));
	document.write("<br>");
	document.write(createButton1("reload", "Reload",
			'onChangeLoad("reload")', 0,
			"specialbutton"));
	document.write(createButton1("reset", "Reset",
			'runJmolScriptWait("script ./scripts/reset.spt")', 0, "specialbutton"));
	document.write(createButton1("Console", "Console", 'runJmolScriptWait("console")', 0,
			"specialbutton"));
	document.write(createButton("NewWindow", "New window", "newAppletWindow()", 0));
	document.write(createButton("viewfile", "File content", "printFileContent()", 0));
	document.write(createButton1("saveState", 'Save state', 'doClickSaveCurrentState()',
			0, "savebutton"));
	document.write(createButton1("restoreState", 'Restore state',
			'doClickReloadCurrentState()', 0, "restorebutton"));
	document.write(createButton("Feedback", 'Feedback', 'newAppletWindowFeed()', 0));
}

function docWriteRightFrame() {
	document.write(createAllMenus());
}


function docWriteSpectrumHeader() {
	// for spectrum.html
	var s = "Min Freq. " + createTextSpectrum("minValue", "", "5", "")
	+ " Max " + createTextSpectrum("maxValue", "", "5", "")
	+ " cm<sup>-1</sup> ";
	s += createButton("rescaleSpectraButton", "Rescale", "replotSpectrumHTML()", "");
	s += createButton("savespectra", "Save spectrum", "writeSpectumHTML()", "");
	document.write(s);
}

      		
///js// Js/_m__tabs.js /////
/*  J-ICE library 

 based on:
 *
 * Copyright (C) 2010-2014 Pieremanuele Canepa http://j-ice.sourceforge.net/
 *
 * ** Contact: pierocanepa@sourceforge.net
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

//tabmenus.js includes older tabs.js and menu.js
//last modified 16th Mar 2011 
///////////////////////////////// menu object definition
function Menu(name, grp, link) {
	this.name = name;
	this.grp = grp;
	this.link = link;
}

var tabMenu = [];

function addTab(name, group, link) {
	tabMenu.push(new Menu(name, group, link));
}

// Note: These numbers must reflect the order of addition in defineMenu()

MENU_FILE     = 0;
MENU_CELL     = 1;
MENU_SHOW     = 2;
MENU_EDIT     = 3;
//MENU_BUILD    = x;
MENU_MEASURE  = 4;
MENU_ORIENT   = 5;
MENU_POLY     = 6;
MENU_SURFACE  = 7;
MENU_OPTIMIZE = 8;
MENU_SPECTRA  = 9;
MENU_EM       =10;
MENU_OTHER    =11;

var menuNames = [
	"File", "Cell", "Show" ,"Edit" /*, "Build"*/, 
	"Measure", "Orient", "Polyhedra", "Surface", 
	"Optimize", "Spectra", "Elec", "Other" 
	];

function defineMenu() {
	/* 0 */ addTab("File", "fileGroup", "Import, Export files.");
	/* 1 */ addTab("Cell", "cellGroup", "Modify cell features and symmetry.");
	/* 2 */ addTab("Show", "showGroup", "Change atom, bond colours, and dimensions.");
	/* 3 */ addTab("Edit", "editGroup", "Change connectivity and remove atoms.");
	/* x */ //addTab("Build", "builGroup", "Modify and optimize structure.");
	/* 4 */ addTab("Measure", "measureGroup", "Measure bond distances, angles, and torsionals.");
	/* 5 */ addTab("Orient", "orientGroup", "Change orientation and views.");
	/* 6 */ addTab("Poly", "polyGroup", "Create polyhedra.");
	/* 7 */ addTab("Surface", "isoGroup", "Modify and create isosurface maps.");
	/* 8 */ addTab("Optimize", "geometryGroup", "Geometry optimizations.");
	/* 9 */ addTab("Spectra", "freqGroup", "IR/Raman frequencies and spectra.");
	/* 10 */ addTab("E&M", "elecGroup", "Mulliken charges, spin, and magnetic moments.");
	/* 11 */ addTab("Other", "otherpropGroup", "Change background, light settings and other.");
}

var thisMenu = -1;

var showMenu = function(menu) {
	if (thisMenu >= 0)
		self["exit" + menuNames[menu]]();
	thisMenu = menu;
	exitTab();
	hideArrays(menu);
	self["enter" + menuNames[menu]]();
}


var exitTab = function() {
	cancelPicking();
	runJmolScriptWait('select *;color atoms opaque; echo; draw off;set selectionHalos off;halos off;');
}


var tabTimeouts = [];
var tabDelayMS = 1000;

var TAB_OVER  = 0;
var TAB_CLICK = 1;
var TAB_OUT   = 2;

function grpDisp(n) {
	grpDispDelayed(n, TAB_CLICK);
}

var grpDispDelayed = function(n, mode) {
	for (var i = tabTimeouts.length; --i >= 0;) {
		if (tabTimeouts[i])
			clearTimeout(tabTimeouts[i]);
		tabTimeouts = [];
	}	
	switch(mode) {
	case TAB_OVER:
		tabTimeouts[n] = setTimeout(function(){grpDispDelayed(n,1)},tabDelayMS);
		break;
	case TAB_CLICK:
		for (var i = 0; i < tabMenu.length; i++) {
			getbyID(tabMenu[i].grp).style.display = "none";
			tabMenu[i].disp = 0;
		}
		getbyID(tabMenu[n].grp).style.display = "inline";
		tabMenu[n].disp = 1;
		showMenu(n);
		break;
	case TAB_OUT:
		break;
	}
}

var arrayGeomObjects = new Array(
		"appletdiv", 
		"graphdiv", 
		"plottitle",
		"plotarea", 
		"appletdiv1", 
		"graphdiv1", 
		"plottitle1", 
		"plotarea1");
var arrayFreqObjects = new Array(
		"freqdiv", 
		"graphfreqdiv", 
		"plottitlefreq",
		"plotareafreq");

var hideArrays = function(menu) {
	for (var i = 0; i < arrayGeomObjects.length; i++)
		getbyID(arrayGeomObjects[i]).style.display = (menu == MENU_OPTIMIZE ? "block" : "none");
	for (var j = 0; j < arrayFreqObjects.length; j++)
		getbyID(arrayFreqObjects[j]).style.display = (menu == MENU_SPECTRA ? "block" : "none");
}

function createTabMenu() {
	var strMenu = "<ul class='menu' id='menu'>";
	for (var menuIndex = 0; menuIndex < tabMenu.length; menuIndex++) {
		strMenu += createMenuCell(menuIndex);
	}
	strMenu += "</ul>";
	return strMenu;
}

function createMenuCell(i) {

	var sTab = "<li id='menu'+ i +' "; // Space is mandatory between i and "
	sTab += "onClick='grpDispDelayed(" + i + ",TAB_CLICK)' onmouseover='grpDispDelayed("+i+",TAB_OVER)' onmouseout='grpDispDelayed("+i+",TAB_OUT)'"; // BH 2018
	sTab += "class = 'menu' ";
	sTab += ">";
	sTab += "<a class = 'menu'>";
	sTab += tabMenu[i].name;
	sTab += "<span>" + tabMenu[i].link + "</span>"
	sTab += "</a></li>"
		return sTab;
}

      		
///js// Js/_m_file.js /////
function enterFile() {
	
}

function exitFile() {
}


// was "flagCif"
// used only in crystal, gulp, and quantumespresso 
// in symmetry.js#figureOutSpaceGroup() 
// to set the frame to the first frame 
var flagCif = false; 

var flagCrystal = false; 
var flagGromos = false;
var flagGulp = false;
var flagOutcar = false;
var flagGaussian = false;
var flagQuantumEspresso = false;
var flagSiesta = false;
var flagDmol = false;
var flagMolden = false;
var flagCastep = false;

var freqData = [];
var geomData = [];
var counterFreq = 0;

reload = function(packing, filter, more) {	
	packing || (packing = "");
	filter = (filter ? " FILTER '" + filter + "'" : "");
	more || (more = "");
	runJmolScriptWait("zap;set echo top left; echo reloading...;");
	runJmolScriptWait("load '' " + packing + filter + ";" + more + ';echo;frame all;frame title "@{_modelName}";frame FIRST;');
	setFileName();
	getUnitcell(1);
}

loadUser = function(packing, filter) {
	packing || (packing = "");
	filter = (filter ? " FILTER '" + filter + "'" : "");
	runJmolScriptWait("zap;");
	runJmolScript("load ? " + packing + filter + ";");
}


function setDefaultJmolSettings() {
	runJmolScriptWait('select visible; wireframe 0.15; spacefill 20% ;cartoon off; backbone off;');
	radiiSlider.setValue(20);
	bondSlider.setValue(15);
	// radiiConnectSlider.setValue(20);
//	getbyID('radiiMsg').innerHTML = 20 + "%";
//	getbyID('bondMsg').innerHTML = 0.15 + " &#197";

	/*
	 * getbyID('globalAtomicRadii').innerHTML = 20 ;
	 * getbyID('sliderGlobalAtomicRadii').style.left=20+'px';
	 * getbyID('globalBondWidths').innerHTML = 0.20;
	 * getbyID('sliderGlobalBondWidths').style.left=20+'px';
	 * getbyID('sepcLight').innerHTML = 22 + " % ";
	 * getbyID('sliderSepcLight').style.left=20+'px';
	 * getbyID('Ambient').innerHTML = 45 + " % ";
	 * getbyID('sliderAmbient').style.left=45+'px'; getbyID('Diffuse').innerHTML =
	 * 45 + " % "; getbyID('sliderDiffuse').style.left=45+'px';
	 * getbyID('sliderPerspective').style.left= 66+'px';
	 * getbyID('sliderGlobalBond').style.left= 20 + 'px';
	 * getbyID('globalBondCon').innerHTML = 2 + " ";
	 */

	// getbyID("packrange").innerHTML = 0 + " &#197"
	// getbyID('Perspective').innerHTML = 3;
}

function onChangeLoad(load) {
//	formResetAll();
	switch (load) {
	case "loadC":
	case "loadaimsfhi":
	case "loadOutcastep":
	case "loadcastep":
	case "loadDmol":
	case "loadgauss":
	case "loadgromacs":
	case "loadGulp":
	case "loadmaterial":
	case "loadMolden":
	case "loadpdb":
	case "loadShel": //??
	case "loadSiesta":
	case "loadstate":
	case "loadVasp":
	case "loadVASPoutcar":
	case "loadWien":
	case "loadXcrysden":
	case "loadxyz":
		loadUser();
		break;
	case "loadcif":
	case "loadcrystal":
	case "loadQuantum":
		loadUser("packed");
		break;
	case "reload":
		reload();
		break;
// BH 2018 moved to surface
//	case "loadCUBE":
//		cubeLoad();
//		break;
//	case "loadJvxl":
//		loadMapJvxl();
//		break;
	}
	document.fileGroup.reset();
}

function postLoad(type) {
	freqData = [];
	geomData = [];
	resetGraphs();
	counterFreq = 0;
	InfoFreq = null;
	extractAuxiliaryJmol();
	setFlags(type);
	setFileName();
	getUnitcell(1);
	runJmolScriptWait('unitcell on');
	cleanAndReloadForm();
}

function cleanAndReloadForm() {
	// this method was called for castep, dmol, molden, quantumespresso, vasp loading	
	setDefaultJmolSettings();
	document.fileGroup.reset();
//	formResetAll();
	cleanLists();
	updateElementLists();
	getUnitcell("1");
	setFrameValues("1");
	setTitleEcho();
}

resetLoadFlags = function(isCrystal) {
	if (isCrystal)
		typeSystem = "crystal";
	flagCrystal = 
	flagGromos = 
	flagGulp = 
	flagOutcar = 
	flagGaussian = 
	flagQuantumEspresso = 
	flagCif = 
	flagSiesta = 
	flagDmol = 
	flagMolden =
	flagCastep = false;
}

setFlags = function(type) {
	// BH TODO: missing xmlvasp?
	type = type.replace('load', '').toLowerCase();
	switch (type) {
	default:
	case "xyz":
		break;
	case "shelx":
	case "shel":
		resetLoadFlags(true); // BH 2018 added -- Q: Why no clearing of flags?
		flagCif = true;
		break;
	case "crystal":
		resetLoadFlags();
		flagCrystal = true;
		break;
	case "cube":
		break;
	case "aims":
	case "aimsfhi":
		resetLoadFlags(true);
		flagCif = true;
		break;
	case "castep":
		resetLoadFlags(true);
		flagCif = true;
		break;
	case "vasp":
		resetLoadFlags(true);
		break;
	case "vaspoutcar":
		resetLoadFlags(true);
		flagOutcar = true;
		break;
	case "dmol":
		resetLoadFlags();
		flagDmol = true;
		break;
	case "espresso":
	case "quantum":
		resetLoadFlags(true);
		flagQuantumEspresso = true;
		break;
	case "gulp":
		resetLoadFlags();
		flagGulp = true;
		break;
	case "material":
		resetLoadFlags(); // BH Added
		break;
	case "wien":
		resetLoadFlags(true); // BH Added
		flagCif = true;
		break;
	case "cif":
		resetLoadFlags(true); // BH Added
		flagCif = true;
		break;
	case "siesta":
		resetLoadFlags(true); // BH Added
		flagSiesta = true;
		break;
	case "pdb":
		resetLoadFlags(true); // BH Added
		flagCif = true;
		break;
	case "gromacs":
		resetLoadFlags(); // BH Added
		flagGromos = true;
		break;
	case "gaussian":
	case "gauss":
		resetLoadFlags(); // BH Added
		flagGaussian = true;
		typeSystem = "molecule";
		break;
	case "molden":
		// WE USE SAME SETTINGS AS VASP
		// IT WORKS
		resetLoadFlags(); // BH Added
		typeSystem = "molecule";
		flagOutcar = true;
		break;
	case "crysden":
		resetLoadFlags(true); // BH Added
		flagCif = true;
		break;
	case "castep":
	case "outcastep":
		resetLoadFlags(true); // BH Added
		flagCastep = true;
		break;
	}
	symmetryModeAdd_type = self["symmetryModeAdd_" + type];
}

var sampleOptionArr = ["Load a Sample File", 
	"MgO slab", 
	"urea single-point calculation", 
	"benzene single-point calculation", 
	"NH3 geometry optimization", 
	"NH3 vibrations", 
	"quartz CIF", 
	"=AMS/rutile (11 models)"
]

function onChangeLoadSample(value) {
	var fname = null;
	switch(value) {
	case "=AMS/rutile (11 models)":
		fname = "output/rutile.cif";
		break;
	case "quartz CIF":
		fname = "output/quartz.cif";
		break;
	case "MgO slab":
		fname = "output/cube_mgo_slab/mgo_slab_100_5l.out";
		break;
	case "urea single-point calculation":
		fname = "output/cube_urea_diff/urea-test12.out";
		break;
	case "benzene single-point calculation":
		fname = "output/single-point/c6h6_b3_631gdp.out";
		break;
	case "NH3 geometry optimization":
		fname = "output/geom-opt/nh3_pbe_631gdp_opt.out";
		break;
	case "NH3 vibrations":
		fname = "output/vib-freq/nh3_pbe_631gdp_freq.out";
		break;
	}
	if (fname) {
		runJmolScriptWait("zap;set echo top left; echo loading " + fname +"...");
		runJmolScript("load '" + fname + "' " + getValue("modelNo") + " packed");
	}
}

//var LOAD_ISO_ONLY     = 0;
//var LOAD_ISO_MAP_ONLY = 1;
//var LOAD_ISO_WITH_MAP = 2;
//
//function loadCube(mode, msg) {
//	// this should work in JavaScript, because the script will wait for the ? processing to complete
//	setMessageMode(MESSAGE_MODE_SAVE_ISO);	
//	runJmolScript('set echo top left; echo loading CUBE...'
//			+ (mode != LOAD_ISO_MAP_ONLY ? "isosurface ?.CUBE;" : "")
//			+ (mode != LOAD_ISO_ONLY ? "isosurface  map ?.CUBE;" : "")
//			+ "message " + msg + ";");
//}
//

var quantumEspresso = false;
function onChangeSave(save) {
	// see menu.js
	switch (save) {
	case "savePNG":
		runJmolScript('write PNG "jice.png"');
		break;
	case "savePNGJ":
		runJmoLScript('write PNGJ "jice.png"');
		break;
	case "saveXYZ":
		runJmoLScript('write COORDS XYZ jice.xyz');
		break;
	case "saveFrac":
		saveFractionalCoordinate();
		break;
	case "saveCRYSTAL":
		//flagCrystal = true;
		exportCRYSTAL();
		break;
	case "saveVASP":
		//flagCrystal = false;
		exportVASP();
		break;
	case "saveGROMACS":
		exportGromacs();
		break;
	case "saveCASTEP":
		exportCASTEP();
		break;
	case "saveQuantum":
		quantumEspresso = true;
		//flagCrystal = false;
		exportQuantum();
		break;
	case "savePOV":
		runJmoLScript('write POVRAY jice.pov');
		break;
	case "savepdb":
		runJmoLScript('write PDB jice.pdb');
		break;
	case "saveState":
		runJmoLScript('write STATE jice.spt');
		break;
	case "saveGULP":
		flagGulp = true;
		flagCrystal = false;
		exportGULP();
		break;
	case "savefreqHtml":
		newAppletWindowFreq();
		break;
	}
	document.fileGroup.reset();
}


function printFileContent() {
	runJmolScript("console; getProperty fileContents;");
}


function setTitleEcho() {
	var titleFile = extractInfoJmolString("fileHeader").split("\n")[0];
	runJmolScriptWait('set echo top right; echo "' + titleFile + ' ";');
}


function setFileName() {
	setStatus(jmolEvaluate("_modelFile"));
}

function saveStateAndOrientation_a() {
	// used in castep, gulp, and vasp output methods, and in symmetry#figureOutSpacegroup
	runJmolScriptWait("save ORIENTATION orienta; save STATE status;");
}

function restoreStateAndOrientation_a() {
	runJmolScriptWait("restore ORIENTATION orienta; restore STATE status;");
}



//refresh = function() {
//saveState();
//setLoadingMode(LOADING_MODE_PLOT_ENERGIES);
//reload();
//restoreState();
//}
//
//refreshFreq = function() {
//saveState();
//setLoadingMode(LOADING_MODE_PLOT_FREQUENCIES);
//reload();
//}

      		
///js// Js/_m_cell.js /////
function enterCell() {
	getUnitcell(frameValue);
	getSymInfo();
}

function exitCell() {
}

function saveFractionalCoordinate() {
	warningMsg("Make sure you have selected the model you would like to export.");

	if (frameSelection == null)
		getUnitcell("1");

	var x = "var cellp = [" + roundNumber(aCell) + ", " + roundNumber(bCell)
	+ ", " + roundNumber(cCell) + ", " + roundNumber(alpha) + ", "
	+ roundNumber(beta) + ", " + roundNumber(gamma) + "];"
	+ 'var cellparam = cellp.join(" ");' + 'var xyzfrac = '
	+ frameSelection + '.label("%a %16.9[fxyz]");'
	+ 'var lista = [cellparam, xyzfrac];'
	+ 'WRITE VAR lista "?.XYZfrac" ';
	runJmolScriptWait(x);
}

//This reads out cell parameters given astructure.
var aCell, bCell, cCell, alpha, beta, gamma, typeSystem;
function getUnitcell(i) {
	// document.cellGroup.reset();
	typeSystem = "";
	i || (i = 1);
	var StringUnitcell = "auxiliaryinfo.models[" + i + "].infoUnitCell";

	var cellparam = extractInfoJmol(StringUnitcell);

	aCell = roundNumber(cellparam[0]);
	bCell = roundNumber(cellparam[1]);
	cCell = roundNumber(cellparam[2]);
	dimensionality = parseFloat(cellparam[15]);
	volumeCell = roundNumber(cellparam[16]);

	var bOvera = roundNumber(parseFloat(bCell / cCell));
	var cOvera = roundNumber(parseFloat(cCell / aCell));

	if (dimensionality == 1) {
		bCell = 0.000;
		cCell = 0.000;
		makeEnable("par_a");
		setValue("par_a", "");
		makeDisable("par_b");
		setValue("par_b", "1");
		makeDisable("par_c");
		setValue("par_c", "1");
		setValue("bovera", "0");
		setValue("covera", "0");
		typeSystem = "polymer";
	} else if (dimensionality == 2) {
		cCell = 0.000;
		typeSystem = "slab";
		makeEnable("par_a");
		setValue("par_a", "");
		makeEnable("par_b");
		setValue("par_b", "");
		makeDisable("par_c");
		setValue("par_c", "1");
		setValue("bovera", bOvera);
		setValue("covera", "0");
	} else if (dimensionality == 3) {
		typeSystem = "crystal";
		alpha = cellparam[3];
		beta = cellparam[4];
		gamma = cellparam[5];
		makeEnable("par_a");
		setValue("par_a", "");
		makeEnable("par_b");
		setValue("par_b", "");
		makeEnable("par_c");
		setValue("par_c", "");
		setValue("bovera", bOvera);
		setValue("covera", cOvera);
	} else if (!cellparam[0] && !cellparam[1] && !cellparam[2] && !cellparam[4]) {
		aCell = 0.00;
		bCell = 0.00;
		cCell = 0.00;
		alpha = 0.00;
		beta = 0.00;
		gamma = 0.00;
		typeSystem = "molecule";
		setValue("bovera", "0");
		setValue("covera", "0");
	}
	setValue("aCell", roundNumber(aCell));
	setValue("bCell", roundNumber(bCell));
	setValue("cCell", roundNumber(cCell));
	setValue("alphaCell", roundNumber(alpha));
	setValue("betaCell", roundNumber(beta));
	setValue("gammaCell", roundNumber(gamma));
	setValue("volumeCell", roundNumber(volumeCell));

}

function setUnitCell() {
	getUnitcell(frameValue);
	if (frameSelection == null || frameSelection == "" || frameValue == ""
		|| frameValue == null) {
		frameSelection = "{1.1}";
		frameNum = 1.1;
		getUnitcell("1");
	}
}
////END OPEN SAVE FUNCTIONS

///////////////
//////////////CELL AND ORIENTATION FUNCTION
/////////////

function setCellMeasure(value) {
	typeSystem = "";
	var StringUnitcell = "auxiliaryinfo.models[" + i + "].infoUnitCell";

	if (i == null || i == "")
		StringUnitcell = " auxiliaryInfo.models[1].infoUnitCell ";

	var cellparam = extractInfoJmol(StringUnitcell);
	aCell = cellparam[0];
	bCell = cellparam[1];
	cCell = cellparam[2];
	if (value == "a") {
		setValue("aCell", roundNumber(aCell));
		setValue("bCell", roundNumber(bCell));
		setValue("cCell", roundNumber(cCell));
	} else {
		aCell = aCell * 1.889725989;
		bCell = bCell * 1.889725989;
		cCell = cCell * 1.889725989;
		setValue("aCell", roundNumber(aCell));
		setValue("bCell", roundNumber(bCell));
		setValue("cCell", roundNumber(cCell));
	}

}
function setCellDotted() {
	var cella = checkBoxX('cellDott');
	if (cella == "on") {
		runJmolScriptWait("unitcell DOTTED ;");
	} else {
		runJmolScriptWait("unitcell ON;");
	}
}

getCurrentPacking = function() {
	// BH 2018
	getValue("par_a") || setValue("par_a", 1);
	getValue("par_b") || setValue("par_b", 1);
	getValue("par_c") || setValue("par_c", 1);
	return '{ ' + getValue("par_a") + ' ' + getValue("par_b") + ' ' + getValue("par_c") + '} ';
}

getCurrentUnitCell = function() {
	return '[ ' + parseFloat(getValue('a_frac')) + ' '
		+ parseFloat(getValue('b_frac')) + ' '
		+ parseFloat(getValue('c_frac')) + ' '
		+ parseFloat(getValue('alpha_frac')) + ' '
		+ parseFloat(getValue('beta_frac')) + ' '
		+ parseFloat(getValue('gamma_frac')) + ' ]'
}
//This gets values from textboxes using them to build supercells
function setPackaging(packMode) {
	var filter = getKindCell();
	var cell = getCurrentPacking();
	// BH 2018 adds save/restore orientation
	runJmolScriptWait('save orientation o;');
	var checkboxSuper = checkBoxX("supercellForce");
	if (checkboxSuper == "on") {
		warningMsg("You decided to constrain your original supercell to form a supercell. \n The symmetry was reduced to P1.");
		reload("{1 1 1} SUPERCELL " + cell + packMode, filter);
	} else {
		reload(cell + packMode, filter);
	}
	runJmolScriptWait("restore orientation o;");
	setUnitCell();
}


getKindCell = function() {
	var kindCell = getbyName("cella");
	var kindCellfinal = null;
	for (var i = 0; i < kindCell.length; i++)
		if (kindCell[i].checked)
			return kindCell[i].value;
	return "";
}

function setPackRangeAndReload(val) {
	packRange = val;
	reload("{1 1 1} RANGE " + val, getKindCell());
	cellOperation();
}

function checkPack() {
	uncheckBox("superPack");
	// This initialize the bar
	getbyID("packMsg").innerHTML = 0 + " &#197";
}

function uncheckPack() {
	uncheckBox("chPack");
	getbyID("packDiv").style.display = "none";
	setCellType(getKindCell());
}

function setCellType(value) {
	// BH 2018 Q: logic here?
	var valueConv = checkBoxX("superPack");
	var checkBoxchPack = checkBoxX("chPack");
	if (valueConv == "on" && checkBoxchPack == "off") {
		reload(null, value);
	} else if (valueConv == "off" && checkBoxchPack == "on") {
		reload("{1 1 1} RANGE " + packRange, value);
	} else {
		reload(null, value);
	}
	cellOperation();
}

function applyPack(range) {
	setPackRangeAndReload(parseFloat(range).toPrecision(2));
	getbyID("packMsg").innerHTML = packRange + " &#197";
}

function setManualOrigin() {

	var x = getValue("par_x");
	var y = getValue("par_y");
	var z = getValue("par_z");

	if (x == "" || y == "" || z == "") {
		errorMsg("Please, check values entered in the textboxes");
		return false;
	}
	runJmolScriptWait("unitcell { " + x + " " + y + " " + z + " };");
	cellOperation();
}

function setFashionAB(valueList) {

	var radio = getbyName("abFashion");
	for (var i = 0; i < radio.length; i++) {
		if (radio[i].checked == true)
			var radioValue = radio[i].value;
	}

	var fashion = (radioValue == "on") ? 'OPAQUE' : 'TRANSLUCENT';

	if (valueList != "select")
		runJmolScriptWait('color ' + valueList + ' ' + fashion);
}

function setUnitCellOrigin(value) {
	runJmolScriptWait("unitcell { " + value + " }");
	var aval = value.split(" ");
	setValue("par_x", eval(aval[0]));
	setValue("par_y", eval(aval[1]));
	setValue("par_z", eval(aval[2]));
}

function getSymInfo() {

	// update all of the model-specific page items

	SymInfo = {};
	var s = "";
	var info = jmolEvaluate('script("show spacegroup")');
	if (info.indexOf("x,") < 0) {
		s = "no space group";
	} else {
		var S = info.split("\n");
		var hm = "?";
		var itcnumber = "?";
		var hallsym = "?";
		var latticetype = "?";
		var nop = 0;
		var slist = "";
		for (var i = 0; i < S.length; i++) {
			var line = S[i].split(":");
			if (line[0].indexOf("Hermann-Mauguin symbol") == 0)
				s += "<br>"
					+ S[i]
			.replace(
					/Hermann\-Mauguin/,
			"<a href=http://en.wikipedia.org/wiki/Hermann%E2%80%93Mauguin_notation target=_blank>Hermann-Mauguin</a>");
			else if (line[0].indexOf("international table number") == 0)
				s += "<br>"
					+ S[i]
			.replace(
					/international table number/,
			"<a href=http://it.iucr.org/ target=_blank id='prova'>international table</a> number");
			else if (line[0].indexOf("lattice type") == 0)
				s += "<br>"
					+ S[i]
			.replace(
					/lattice type/,
			"<a href=http://cst-www.nrl.navy.mil/bind/static/lattypes.html target=_blank>lattice type</a>");
			else if (line[0].indexOf(" symmetry operation") >= 0)
				nop = parseInt(line[0]);
			else if (nop > 0 && line[0].indexOf(",") >= 0)
				slist += "\n" + S[i];

		}

		s += "<br> Symmetry operators: " + nop;

		var S = slist.split("\n");
		var n = 0;
		var i = -1;
		while (++i < S.length && S[i].indexOf(",") < 0) {
		}
		s += "<br><select id='symselect' onchange=getSelect() onkeypress=\"setTimeout('getSelect()',50)\" class='select'><option value=0>select a symmetry operation</option>";
		for (; i < S.length; i++)
			if (S[i].indexOf("x") >= 0) {
				var sopt = S[i].split("|")[0].split("\t");
				SymInfo[sopt[1]] = S[i].replace(/\t/, ": ").replace(/\t/, "|");
				sopt = sopt[0] + ": " + sopt[2] + " (" + sopt[1] + ")";
				s += "<option value='" + parseInt(sopt) + "'>" + sopt
				+ "</option>";
			}
		s += "</select>";

		var info = jmolEvaluate('{*}.label("#%i %a {%[fxyz]/1}")').split("\n");
		var nPoints = info.length;
		var nBase = jmolEvaluate('{symop=1555}.length');
		s += "<br><select id='atomselect' onchange=getSelect() onkeypress=\"setTimeout('getSelect()',50)\"  class='select'><option value=0>base atoms</option>";
		s += "<option value='{0 0 0}'>{0 0 0}</option>";
		s += "<option value='{1/2 1/2 1/2}'>{1/2 1/2 1/2}</option>";
		for (var i = 0; i < nPoints; i++)
			s += "<option value=" + i + (i == 0 ? " selected" : "") + ">"
			+ info[i] + "</option>";
		s += "</select>";

		s += "</br><input type=checkbox id=chkatoms onchange=getSelect() checked=true />superimpose atoms";
		s += " opacity:<select id=selopacity onchange=getSelect() onkeypress=\"setTimeout('getSelect()',50)\"  class='select'>"
			+ "<option value=0.2 selected>20%</option>"
			+ "<option value=0.4>40%</option>"
			+ "<option value=0.6>60%</option>"
			+ "<option value=1.0>100%</option>" + "</select>";

	}
	getbyID("syminfo").innerHTML = s;
}

function getSelect(symop) {
	var d = getbyID("atomselect");
	var atomi = d.selectedIndex;
	var pt00 = d[d.selectedIndex].value;
	var showatoms = (getbyID("chkatoms").checked || atomi == 0);
	runJmolScriptWait("display " + (showatoms ? "all" : "none"));
	var d = getbyID("symselect");
	var iop = parseInt(d[d.selectedIndex].value);
	// if (!iop && !symop) symop = getbyID("txtop").value
	if (!symop) {
		if (!iop) {
			runJmolScriptWait("select *;color opaque;draw sym_* delete");
			return

		}
		symop = d[d.selectedIndex].text.split("(")[1].split(")")[0];
		// getbyID("txtop").value
		// = symop
	}
	if (pt00.indexOf("{") < 0)
		pt00 = "{atomindex=" + pt00 + "}";
	var d = getbyID("selopacity");
	var opacity = parseFloat(d[d.selectedIndex].value);
	if (opacity < 0)
		opacity = 1;
	var script = "select *;color atoms translucent " + (1 - opacity);
	script += ";draw symop \"" + symop + "\" " + pt00 + ";";
	if (atomi == 0) {
		script += ";select symop=1555 or symop=" + iop + "555;color opaque;";
	} else if (atomi >= 3) {
		script += ";pt1 = "
			+ pt00
			+ ";pt2 = all.symop(\""
			+ symop
			+ "\",pt1).uxyz.xyz;select within(0.2,pt1) or within(0.2, pt2);color opaque;";
	}
	secho = SymInfo[symop];
	if (!secho) {
		secho = jmolEvaluate("all.symop('" + symop + "',{0 0 0},'draw')")
		.split("\n")[0];
		if (secho.indexOf("//") == 0) {
			secho = secho.substring(2);
		} else {
			secho = symop;
		}
	}
	script = "set echo top right;echo " + secho + ";" + script;
	runJmolScriptWait(script);
}

function deleteSymmetry() {
	getbyID("syminfo").removeChild;
}

cellOperation = function(){
	deleteSymmetry();
	getSymInfo();
	setUnitCell();
}


      		
///js// Js/_m_show.js /////
function enterShow() {
	if (firstTimeBond) {
		bondSlider.setValue(20);
		radiiSlider.setValue(22);
		getbyID('radiiMsg').innerHTML = 20 + " %";
		getbyID('bondMsg').innerHTML = 0.20 + " &#197";
	}
	firstTimeBond = false;
}

function exitShow() {
}

function showPickPlaneCallback() {
	var distance = prompt('Enter the distance (in \305) within you want to select atoms. \n Positive values mean from the upper face on, negative ones the opposite.', '1');
	if (distance != null && distance != "") {
		runJmolScriptWait('select within(' + distance + ',plane,$plane1)');
//			hideMode = " hide selected";
//			deleteMode = " delete selected";
		colorWhat = "color atoms";
	}
}

var firstTimeBond = true;

var colorWhat = "";


function setColorWhat(rgb, colorscript) {
	var colorcmd = (colorscript[1] == "colorwhat" ? colorWhat : "color " + colorscript[1]);
	runJmolScriptWait(colorcmd + " " + rgb);// BH?? should be elsewhere + ";draw off");
}

function elementSelected(element) {
	selectElement(element);
	colorWhat = "color atom ";
	return colorWhat;
}

function applyTrans(t) {
	getbyID('transMsg').innerHTML = t + " %"
	runJmolScript("color " + getValueSel("setFashion") + " TRANSLUCENT " + (t/100));
}

function applyRadii(rpercent) {
	getbyID('radiiMsg').innerHTML = rpercent.toPrecision(2) + " %"
	runJmolScript("cpk " + rpercent + " %;");
}

function onClickCPK() {
	getbyID('radiiMsg').innerHTML = "100%";
	getbyID('bondMsg').innerHTML = 0.3 + " &#197";
	radiiSlider.setValue(100);
	bondSlider.setValue(30);
	runJmolScript("wireframe 0.30; spacefill 100% ;cartoon off;backbone off; draw off");
}

function onClickWire() {
	getbyID('radiiMsg').innerHTML = "0.0 %";
	getbyID('bondMsg').innerHTML = 0.01 + " &#197";
	radiiSlider.setValue(0);
	bondSlider.setValue(1);
	// BH Q: why spacefill 1%?
	runJmolScript('wireframe 0.01; spacefill off;ellipsoids off;cartoon off;backbone off;');
}

function onClickIonic() {
	getbyID('radiiMsg').innerHTML = parseFloat(0).toPrecision(2) + " %";
	getbyID('bondMsg').innerHTML = 0.30 + " &#197";
	radiiSlider.setValue(0);
	bondSlider.setValue(30);
	runJmolScript("spacefill IONIC; wireframe 0.15; draw off");
}

function onStickClick() {
	getbyID('radiiMsg').innerHTML = "1%";
	getbyID('bondMsg').innerHTML = 0.30 + " &#197";
	radiiSlider.setValue(0);
	bondSlider.setValue(30);
	runJmolScript("wireframe 0.15;spacefill 1%;cartoon off;backbone off; draw off");
}

function onClickBallAndStick() {
	getbyID('radiiMsg').innerHTML = "20%";
	getbyID('bondMsg').innerHTML = 0.20 + " &#197";
	radiiSlider.setValue(20);
	bondSlider.setValue(20);
	runJmolScript("wireframe 0.15; spacefill 20%;cartoon off;backbone off; draw off");

}

function onClickBall() {
	getbyID('radiiMsg').innerHTML = "20%";
	getbyID('bondMsg').innerHTML = 0.00 + " &#197";
	radiiSlider.setValue(20);
	bondSlider.setValue(0);
	runJmolScript("select *; spacefill 20%; wireframe off ; draw off");
}

      		
///js// Js/_m_edit.js /////
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


      		
///js// Js/_m_measure.js /////
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
///js// Js/_m_orient.js /////
function enterOrient() {
	slabSlider.setValue(100 - jmolEvaluate("slab"));
	depthSlider.setValue(100 - jmolEvaluate("depth"));
	if (jmolEvaluate("slabEnabled") == "true")
		checkBox("slabToggle");
	else
		uncheckBox("slabToggle");
}

function exitOrient() {
}

function applySlab(x) {
	getbyID('slabMsg').innerHTML = x + "%" // display
	runJmolScriptWait("slab " + (100 - x) + ";")
}

function applyDepth(x) { // alternative displays:
	getbyID('depthMsg').innerHTML = (100 - x) + "%" // 100%
	runJmolScriptWait("depth " + (100 - x) + ";")
}

function toggleSlab() {
	var ctl = getbyID("slabToggle")
	if (ctl.checked) {
		runJmolScriptWait("slab on;");
//		applySlab(slabSlider.getValue());
//		applyDepth(depthSlider.getValue());
//		slabSlider.setValue(20);
//		applySlab(defaultFront);
//		depthSlider.setValue(defaultBack);
//		applyDepth(defaultBack);
	} else {
		runJmolScriptWait("slab off; ")
//		slabSlider.setValue(0);
//		depthSlider.setValue(0);
	}
}

//This controls the refined motion of the structure
var motion = "";
function setKindMotion(valueList) {
	motion = valueList;
	if (motion == "select")
		errorMsg("Please select the motion");
	return motion;
}

function setMotion(axis) {
	var magnitudeMotion = getbyID("fineOrientMagn").value;

	if (motion == "select" || motion == "") {
		errorMsg("Please select the motion");
		return false;
	}

	// /(motion == "translate" )? (makeDisable("-z") + makeDisable("z")) :
	// (makeEnable("-z") + makeEnable("z"))

	if (magnitudeMotion == "") {
		errorMsg("Please, check value entered in the textbox");
		return false;
	}

	var stringa = "Selected" + " " + axis + " " + magnitudeMotion;
	if (motion == "translate" && (axis == "-x" || axis == "-y" || axis == "-z")) {
		axis = axis.replace("-", "");
		stringa = "Selected" + " " + axis + " -" + magnitudeMotion;
	}

	stringa = motion + (getbyID("moveByselection").checked ? "Selected " : " ") + stringa;
	 
	runJmolScriptWait(stringa);


}

      		
///js// Js/_m_polyhedra.js /////
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
      		
///js// Js/_m_surface.js /////
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

function enterSurface() {
	selectListItem(document.isoGroup.createIso, '');
}

function exitSurface() {
	cancelPicking();
}

SURFACE_VDW   			 = "isosurface VDW"; // BH Q: Why was this VDW + 2.0 ?
SURFACE_VDW_PERIODIC     = "isosurface lattice _CELL_ VDW";
//SURFACE_VDW_MEP			 = "isosurface resolution 7 VDW map MEP"; // why SOLVENT, which is VDW + 1.2?
//SURFACE_VDW_MEP_PERIODIC = "isosurface lattice _CELL_ resolution 7 VDW map MEP";

function onClickCreateIso(value) {
	if (!value)
		return;
	if (value.indexOf("?") >= 0)
		messageMsg("Select or drag-drop your density cube or JVXL file onto the 'browse' button, then press the 'load' button.");
	createSurface(value, true);
}

var canMapIsosurface = function() {
	if (jmolEvaluate("isosurface list").trim())
		return true;	
	messageMsg("First create an isosurface.")
	return false;
}
function onClickMapCube() {
	if (!canMapIsosurface())
		return;
	messageMsg("Select or drag-drop your potential cube file onto the 'browse' button, then press the 'load' button.");
	createSurface("isosurface map '?'", false);	
}

function onClickMapMEP() {
	if (!canMapIsosurface())
		return;
	createSurface("isosurface map mep;isosurface cache;", false)
}

function onClickMapPlane() {
	pickPlane(null, surfacePickPlaneCallback);
}

function surfacePickPlaneCallback() {
	createSurface('isosurface PLANE $plane1 MAP color range 0.0 2.0 "?";', true);
}

var createSurface = function(cmd, doClear) {
	if (cmd.indexOf("_CELL_") >= 0)
		cmd = cmd.replace("_CELL_", getCurrentCell()); 
//	setMessageMode(MESSAGE_MODE_SAVE_ISO)
	runJmolScript((doClear ? "isosurface delete;" : "") 
			+ "set echo top left; echo creating ISOSURFACE...; refresh;" + cmd + '; echo;javascript getIsoInfo()');
}

//function sendSurfaceMessage() {
//	warningMsg("If the surface doesn't look like what you were expected, go to the menu' voice Isosur. for more options.");
//}
//
//function saveIsoJVXL() {
//	messageMsg("Now, save your surface in a compact format *.JVXL");	
//	runJmolScript("write crystal_map.jvxl;");
//}

function getIsoInfo() {
	if (!jmolEvaluate("isosurface list").trim())
		return;
	
	// generate JVXL equivalent immediately
//	runJmolScriptWait("isosurface cache");
	
	// Extract the maximum and minimum of the color range
	
	var isoInfo = jmolGetPropertyAsString("shapeinfo.isosurface[1].jvxlinfo");
	var dataMinimum = parseFloat(isoInfo.substring(
			isoInfo.indexOf("data") + 14, isoInfo.indexOf("data") + 26)); // dataMinimum
	var dataMaximum = parseFloat(isoInfo.substring(
			isoInfo.indexOf("dataMax") + 14, isoInfo.indexOf("dataMax") + 26)); // dataMaximum
	setValue("dataMin", dataMinimum);
	setValue("dataMax", dataMaximum);
}

function setIsoColorscheme() {
	runJmolScriptWait('color $isosurface1 "' + getValue("isoColorScheme") + '"');
}

function setIsoColorRange() {
	if (getbyID("dataMin") == "" || getbyID("dataMax") == "") {
		errorMsg("Please, check values entered in the textboxes");
		return false;
	}
	var min = getValue("dataMin");
	var max = getValue("dataMax");
	var colorScheme = getValue("isoColorScheme");
	if (colorScheme != "bw") {
		runJmolScriptWait('color $isosurface1 "' + colorScheme + '" range ' + min + ' '
				+ max);
	} else {
		warningMsg("Colorscheme not available for CUBE files!");
	}
}

function setIsoColorReverse() {
	if (getbyID("dataMin") == "" || getbyID("dataMax") == "") {
		errorMsg("Please, check values entered in the textboxes");
		return false;
	}

	var min = getValue("dataMin");
	var max = getValue("dataMax");
	var colorScheme = getValue("isoColorScheme");

	runJmolScriptWait('color $isosurface1 reversecolor "' + colorScheme + '" range ' + min
			+ ' ' + max);
}

function pickIsoValue() {
	var check = isChecked("measureIso");
	if (check) {
		messageMsg("Value are shown by hovering on the surface. Values are in e- *bohr^-3. Make sure your isosurface is completely opaque.");
		runJmolScriptWait("set drawHover TRUE");
	} else {
		runJmolScriptWait("set drawHover OFF");
	}
}

function removeStructure() {
	var check = isChecked("removeStr");
	if (!check) {
		runJmolScriptWait("select *; hide selected");
	} else {
		runJmolScriptWait("display *");
	}
}

function removeCellIso() {
	var check = isChecked("removeCellI");
	if (!check) {
		runJmolScriptWait("unitcell OFF");
	} else {
		runJmolScriptWait("unitcell ON");
	}
}

function setIsoPack() {
	if (getValue("iso_a") == "" || getValue("iso_b") == ""
			|| getValue("iso_c") == "") {
		errorMsg("Please, check values entered in the textboxes");
		return false;
	}

	runJmolScriptWait('isosurface LATTICE {' + getValue("iso_a") + ' ' + getValue("iso_b")
			+ ' ' + getValue("iso_c") + '}');
}

////////////////END ISOSURFACE FUNCTIONS
      		
///js// Js/_m_optimize.js /////
function enterOptimize() {
	plotEnergies();		
}

function exitOptimize() {
}

//function saveFrame() {
// TODO: Not something we can do in JavaScript -- too many files, unless we zip them up (which we can do)
//	messageMsg("This is to save frame by frame your geometry optimization.");
//	var value = checkBoxX("saveFrames");
//	if (value == "on")
//		runJmolScriptWait('write frames {*} "fileName.jpg"');
//}

      		
///js// Js/_m_spectra.js /////
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

//This simulates the IR - Raman spectrum given an input 

function enterSpectra() {
	if (!InfoFreq) {
		getInfoFreq();
		freqCount = (flagOutcar? freqData.length - 1 : flagGaussian ? freqGauss.length - 1 : InfoFreq.length);
		setMaxMinPlot();
		onClickModSpec();
	}
}

function exitSpectra() {
	runJmolScriptWait('vibration off; vectors off');
}

var intTot = [];
var irFreq = [];
var RamanFreq = [];
var intTotNewboth = [];
var newRamanInt = [];
var newInt = [];
var summedInt = [];
var sortInt = [];

var irData, ramanData, unknownData;

var freqCount;


function onClickSelectVib(value) {
	showFrame(value);	
	updateJmolForFreqParams();
}


function onClickModSpec() {
	// all, ir, or raman radio buttons
	if (!InfoFreq[2] || !InfoFreq[2].modelProperties.Frequency) {
		//errorMsg("No vibrations available")
		return;
	}

	cleanLists();
	resetFreq();
	symmetryModeAdd();
	var rad_val;
	for (var i = 0; i < document.modelsVib.modSpec.length; i++) {
		if (document.modelsVib.modSpec[i].checked) {
			rad_val = document.modelsVib.modSpec[i].value;
			break;
		}
	}	
	var vib = getbyID('vib');	
	//MP 09/19/18 Changed i+1 to InfoFreq[i].modelNumber		
	switch (rad_val) {
	case "all":
		for (var i = 0; i < InfoFreq.length; i++) {
			if (InfoFreq[i].modelProperties.Frequency != null) {
				addOption(vib, i + " " + InfoFreq[i].name, InfoFreq[i].modelNumber);
			}
		}
		break;	
	case "ir":
		for (var i = 0; i < InfoFreq.length; i++) {
			if (InfoFreq[i].modelProperties.Frequency != null) {
				if (InfoFreq[i].modelProperties.IRactivity == "A") {
					addOption(vib, i + " " + InfoFreq[i].name, InfoFreq[i].modelNumber);
				}
			}
		}
		break;	
	case "raman":
		for (var i = 0; i < InfoFreq.length; i++) {
			if (InfoFreq[i].modelProperties.Frequency != null) {
				if (InfoFreq[i].modelProperties.Ramanactivity == "A") {
					addOption(vib, i + " " + InfoFreq[i].name, InfoFreq[i].modelNumber);
				}
			}
		}
		break;
	}
	plotFrequencies(true);
}

function getKindSpectrum() {
	for (var i = 0; i < document.modelsVib.kindspectra.length; i++) {
		if (document.modelsVib.kindspectra[i].checked)
			return document.modelsVib.kindspectra[i].value;
	}
}

function getConvolve() {
	for (var i = 0; i < document.modelsVib.convol.length; i++) {
		if (document.modelsVib.convol[i].checked)
			return document.modelsVib.convol[i].value;
	}	
}

function simSpectrum() {
	var win = "menubar=yes,resizable=1,scrollbars,alwaysRaised,width=800,height=600,left=50";
	var irInt = [];
	var RamanInt = [];
	var freqTot = [];
	var convoluzione = getConvolve();
	var radvalue = getKindSpectrum();
	var drawGaussian = true;
	var sigma = getValue("sigma");
	intTot = [];
	var sortInt = [];
	var rescale = isChecked("rescaleSpectra");
	switch (convoluzione) {
	case "stick":
		switch (radvalue) {
		case "ir": // IR + Raman
			irInt = extractFreqData(freqCount, null, null, sortInt);
			var maxInt = maxValue(sortInt);
			var max0 = (maxInt == 0);
			if (max0) {
				maxInt = 200;
				rescale = true;
			}
			for (var i = 0; i < 4000; i++) {
				if (intTot[i] == null)
					intTot[i] = 0.000;
				else {
					if (max0 && intTot[i] == 0)
						intTot[i] = maxInt / 2; 
					if (rescale) {
						if (intTot[i] != 0.00)
							intTot[i] = (intTot[i] / maxInt) * 100.00;
					}
				}
			}
			break;
		case "raman":// Raman
			RamanInt = extractRamanData(freqCount);
			for (var i = 0; i < 4000; i++) {
				for (var k = 0; k < freqCount - 1; k++) {
					if (RamanFreq[k] == i)
						intTot[i] = 100;
				}
				if (intTot[i] == null)
					intTot[i] = 0;
			}
			break;
		case "both":
			irInt = extractFreqData(freqCount, null, null, sortInt);
			if (flagCrystal) {
				RamanInt = extractRamanData(freqCount);
				var maxInt = maxValue(sortInt);
				var max0 = (maxInt == 0);
				if (max0) {
					maxInt = 200;
					rescale = true;
				}
				for (var i = 0; i < 4000; i++) {

					if (newRamanInt[i] == null)
						newRamanInt[i] = 0;

					if (intTot[i] == null)
						intTot[i] = 0.000;
					else {
						if (max0 && intTot[i] == 0)
							intTot[i] = maxInt / 2; 
						if (rescale) {
							if (intTot[i] != 0.00)
								intTot[i] = (intTot[i] / maxInt) * 100.00;
						}						
					}
					intTot[i] = newRamanInt[i] + intTot[i];
				}

			} else if (flagOutcar) {
				var maxInt = 100.00;
				for (var i = 0; i < 4000; i++) {
					newInt[i] = 100.00;
					if (intTot[i] == null)
						intTot[i] = 0.000;

					if (rescale) {
						if (intTot[i] != 0.00)
							intTot[i] = (intTot[i] / maxInt) * 100.00;
					}

					intTot[i] = intTot[i];

				}

			} else if (flagDmol) {
				var maxInt = 100.00;
				for (var i = 0; i < 4000; i++) {
					newInt[i] = 100.00;
					if (intTot[i] == null)
						intTot[i] = 0.000;

					if (rescale) {
						if (intTot[i] != 0.00)
							intTot[i] = (intTot[i] / maxInt) * 100.00;
					}

					intTot[i] = intTot[i];

				}
			} else if (flagGaussian) {
				var maxInt = 100.00;
				for (var i = 0; i < 4000; i++) {
					if (intTot[i] == null)
						intTot[i] = 0.000;

					if (rescale) {
						if (intTot[i] != 0.00)
							intTot[i] = (intTot[i] / maxInt) * 100.00;
					}
					intTot[i] = intTot[i];
				}
			}
			break;
		} 
		break;
	case "gaus":
		createSpectrum(radvalue, freqCount, sigma, true);
		break;
	case "lor":
		createSpectrum(radvalue, freqCount, sigma, false);
		break;
	}

	// this opens the window that contains the spectrum
	var newwin = open("spectrum.html");

}

function createSpectrum(radvalue, freqCount, sigma, drawGaussian) {
		var RamanInt = [];
		var sortInt = [];
		var irInt = extractFreqData(freqCount, null, null, sortInt);
		var maxInt;
		if (flagCrystal) {
			RamanInt = extractRamanData(freqCount);
		 	maxInt = maxValue(sortInt);
			if (maxInt == 0)
				maxInt = 200;
		} else if (flagOutcar) {
		 	maxInt = 100.00;
		} else if (flagGaussian || flagDmol) {
			maxInt = maxR;
		} else {
			return;
		}
		defineSpectrum(radvalue, freqCount, irInt, RamanInt, maxInt, sigma,
					drawGaussian);
}

//
//function extractIrData(freqCount) {
//	var irInt = [];
//	for (var i = 0; i < freqCount - 1; i++) { // populate IR array
//		if (Info[i].name != null) {
//			if (Info[i].modelProperties.IRactivity == "A") {
//				irFreq[i] = roundoff(
//						substringFreqToFloat(Info[i].modelProperties.Frequency),
//						0);
//				irInt[i] = roundoff(
//						substringIntFreqToFloat(Info[i].modelProperties.IRintensity),
//						0);
//				sortInt[i] = roundoff(
//						substringIntFreqToFloat(Info[i].modelProperties.IRintensity),
//						0);
//				intTot[irFreq[i]] = roundoff(
//						substringIntFreqToFloat(Info[i].modelProperties.IRintensity),
//						0);
//				intTotNewboth[irFreq[i]] = roundoff(
//						substringIntFreqToFloat(Info[i].modelProperties.IRintensity),
//						0);
//				// if(irInt[i]== 0.0){
//				// irInt[i] = 100.00;
//				// intTot[irFreq[i]]= 100.00;
//				// intTotNewboth[irFreq[i]] = 100.00;
//				// }
//			}
//		}
//	}
//	return irInt;
//}

function extractFreqData(freqCount, intData, unknownData, sortInt) {
	var irInt = [];
	if (flagCrystal) {
		for (var i = 0; i < freqCount - 1; i++) { // populate IR array
			irFreq[i] = Math.round(substringFreqToFloat(InfoFreq[i].modelProperties.Frequency));
			var int = InfoFreq[i].modelProperties.IRintensity;
			irInt[i] = Math.round(substringIntFreqToFloat(int));
			if (intData && (irInt[i] || irInt[i]==0)) {
				intData[0].push(irFreq[i]);
				intData[1].push(irInt[i]);
			}
			sortInt[i] = irInt[i];
			intTot[irFreq[i]] = irInt[i];
		}
	} else if (flagOutcar) {
		for (var i = 0; i < freqCount; i++) {
			irFreq[i] = Math.round(substringFreqToFloat(freqData[i]));
			if (unknownData) {
				unknownData[0].push(irFreq[i]);
				unknownData[1].push(100);
			}
			intTot[irFreq[i]] = 100.00;
			irInt[i] = 100.00;
			if (i == 0)
				irInt[i] = 0.00;
		}
	} else if (flagGaussian) {
		for (var i = 0; i < freqCount; i++) {
			irFreq[i] = Math.round(substringFreqToFloat(freqGauss[i]));
			intTot[irFreq[i]] = freqIntensGauss[i].substring(1,
					freqIntensGauss[i].indexOf("K") - 1);
			irInt[i] = freqIntensGauss[i].substring(1, freqIntensGauss[i].indexOf("K") - 1);
			if (unknownData && (irInt[i] || irInt[i]==0)) {
				unknownData[0].push(irFreq[i]);
				unknownData[1].push(irInt[i]);				
			}
		}
	}
	return irInt;
}

function extractRamanData(freqCount, RamanData) {
	var RamanInt = [];
	for (var i = 0, freq; i < (freqCount - 1); i++) {
		if (Info[i].name != null) {
			RamanInt[i] = 0.000;
			if (Info[i].modelProperties.Ramanactivity == "A") {
				RamanFreq[i] = roundoff(freq = substringFreqToFloat(Info[i].modelProperties.Frequency), 0);
				RamanInt[i] = 100.00;
				RamanData && (RamanData.push([freq, 100]));
				newRamanInt[RamanFreq[i]] = 100;
			}
		}
	}
	return RamanInt;
}

function defineSpectrum(radvalue, freqCount, irInt, RamanInt, maxInt, sigma,
		drawGaussian) {
	var rescale = isChecked("rescaleSpectra");
	var max0 = (maxInt == 0);
	var sp = 0.000;
	// Gaussian Convolution
	var cx = 4 * Math.LN2;
	var ssa = sigma * sigma / cx;
	var sb = Math.sqrt(cx) / (sigma * Math.sqrt(Math.PI));

	// Lorentzian Convolution
	var xgamma = sigma;
	var ssc = xgamma * 0.5 / Math.PI; // old ss1
	var ssd = (xgamma * 0.5) ^ 2; // old ss2
	var radvalue;
	var summInt = [];
	sortInt = [];
	if (drawGaussian) {
		for (var i = 0; i < 4000; i++) {
			sp = 0.000;
			if (intTot[i] == null)
				intTot[i] = 0;
			else if (max0 && intTot[i] == 0)
				intTot[i] = maxInt / 2; 
			for (var k = 0; k < freqCount - 1; k++) {
				switch (radvalue) {
				case "ir":
					if (irInt[k] == null)
						irInt[k] == 0.00;
					summInt[k] = irInt[k];
					break;
				case "raman":
					if (RamanInt[k] == null)
						RamanInt[k] == 0.00;
					summInt[k] = RamanInt[k];
					break;
				case "both":
					if (irInt[k] == null)
						irInt[k] == 0.00;
					if (flagCrystal) { // CRYSTAL
						if (RamanInt[k] == null)
							RamanInt[k] == 0.00;
						summInt[k] = irInt[k] + RamanInt[k];
					} else if (flagOutcar || flagGaussian) {
						summInt[k] = irInt[k]
						// OUTCAR
						// or
						// GAUSSIAN
						// summInt[k]
						// =
						// irInt[k];
					}

					break;
				} // end switch
				if (irFreq[k] != null) {
					var xnn = i - irFreq[k];
					var f1 = Math.exp(-xnn * xnn / ssa) * summInt[k] * sb;
					if (rescale == true)
						var f1 = Math.exp(-xnn * xnn / ssa) * summInt[k]
					/ maxInt * 100 * sb;
					sp = sp + f1;

				}

			}
			intTot[i] = sp;
		}
	} else {

		for (var i = 0; i < 4000; i++) {
			sp = 0.000;
			if (intTot[i] == null)
				intTot[i] = 0;
			for (var k = 0; k < freqCount - 1; k++) {
				switch (radvalue) {
				case "ir":
					if (irInt[k] == null)
						irInt[k] == 0.00;
					summInt[k] = irInt[k];
					break;
				case "raman":
					if (RamanInt[k] == null)
						RamanInt[k] == 0.00;
					summInt[k] = RamanInt[k];
					break;
				case "both":
					if (irInt[k] == null)
						irInt[k] == 0.00;
					if (flagCrystal) {
						if (RamanInt[k] == null)
							RamanInt[k] == 0.00;
						summInt[k] = irInt[k] + RamanInt[k];
					} else if (flagOutcar || flagGaussian) { // VASP
						// OUTCAR
						// or
						// GAUSSIAN
						summInt[k] = irInt[k]
					}
					break;
				} // end switch
				if (irFreq[k] != null) {
					var xnn = i - irFreq[k];
					var f1 = ssc * summInt[k] / (xnn * xnn + ssd);
					if (rescale == true)
						var f1 = ssc * summInt[k] / maxInt * 100
						/ (xnn * xnn + ssd);
					sp = sp + f1;
				}

				intTot[i] = sp;
			}
		}
	}
}

/*
 * function scaleSpectrum(){
 * 
 * var vecorFreq = []; var vecorChk = []; var counter; for(var
 * i =0 ; i < Info.length; i++){ vecorFreq[i] = Info[i].name; vecorChk[i] = 0
 * if(i == 0) vecorChk[i] = 1 counter++ }
 * 
 * var s = " Shift spectrum "; s+= createSelect("Frequencies", "", 0, 1, counter ,
 * vecorFreq, vecorFreq, vecorChk) + "" s+=
 * createText2("rescaleSpectra","0.00","5","") + " cm<sup>-1</sup>"; s+=
 * createButton("rescaleSpectraButton","Shift","","") document.write(s); }
 */

function sortNumber(a, b) {
	return a - b;
}

function maxValue(a) {
	// BH 2018
	a.sort(sortNumber);
	var n = 0;
	while (a.length > 0 && isNaN(n = parseInt(a[a.length - 1]))){
		a.pop();
	}
	return (isNaN(n) ? 0 : n);
}

function minValue(irInt) {
	return parseInt(irInt.sort(sortNumber)[0]);
}

function symmetryModeAdd() {
	cleanList('sym');
	if (Info[3].modelProperties) {
		if (symmetryModeAdd_type)
			return symmetryModeAdd_type();
		var symm = [];
		for (var i = 1; i < Info.length; i++)
			if (Info[i].name != null)
				symm[i] = Info[i].modelProperties.vibrationalSymmetry;
	
		var sortedSymm = unique(symm);
		for (var i = 0; i < sortedSymm.length; i++) {
			if (sortedSymm[i] != null)
				addOption(getbyID('sym'), sortedSymm[i], sortedSymm[i])
		}
	}
	
}

function setVibrationOn(isON) {
	if (isON)
		checkBox("radVibrationOn");
	else
		checkBox("radVibrationOff");
	updateJmolForFreqParams();
}

function onClickFreqParams() {
	updateJmolForFreqParams();
}

function updateJmolForFreqParams() {
	var c = jmolColorPickerBoxes["vectorColorPicker"].getJmolColor();
	var vectorsON = isChecked("vectors");
	var script = "vibration " + isChecked("radVibrationOn")
					+ ";vectors " + vectorsON
					+ ";" + getValueSel("vecsamplitude")
					+ ";" + getValueSel("vecscale")
					+ ";color vectors " + (isChecked("vibVectcolor") ? "none" :  c);
	if (vectorsON)
		script += ";" + getValueSel("sizevec");
	runJmolScriptWait(script)
}

//function onClickVibrate(select) {
//	switch (radioval) {
//	case "on":
//		// TODO
//		runJmolScriptWait("vibration on; vectors SCALE 3; vector 5; vibration SCALE 1;");
//		break;
//	case "off":
//		runJmolScriptWait("vibration off;");
//		break;
//	}
//}

//This listens the action change the irep
function onChangeListSym(irep) {
	resetFreq();
	cleanLists()
	if (flagGaussian) {
		changeIrepGauss(irep);
	} else {
		for (var i = 1; i < Info.length; i++) {
			if (Info[i].modelProperties.vibrationalSymmetry != null) {
				var value = Info[i].modelProperties.vibrationalSymmetry;
				if (irep == value)
					addOption(getbyID('vib'), i + " " + Info[i].name, i + 1);
			}
		}
	}
}

//This resets the frequency state
function resetFreq() {
	checkBox("radVibrationOff");
	uncheckBox("vectors");
}

var maxR = 0;
function setMaxMinPlot() {
	var localFreqCount = InfoFreq.length
	var irFrequency = [];	
	try { 
		for (var i = 0; i < localFreqCount; i++) { // populate IR array
			if (InfoFreq[i].modelProperties && InfoFreq[i].modelProperties.Frequency) {
				irFrequency[i] = roundoff(substringFreqToFloat(InfoFreq[i].modelProperties.Frequency), 0);
			}
		}
		maxR = maxValue(irFrequency);
	} catch (err){
			maxR = 3700
	}
	
	var max = maxR + 300;
	min = 0;
	setValue("nMax", max)
	setValue("nMin", min)
}


      		
///js// Js/_m_elec.js /////
function enterElec() {
//	saveOrientation_e();

}

function exitElec() {
}


function setColorMulliken(value) {
	runJmolScriptWait('set propertyColorScheme "' + value + '";select *;font label 18; color {*} property partialCharge; label %5.3P');
}



//function exitMenu() {
//runJmolScriptWait('label off; select off');
//}

function removeCharges() {

// BH TODO - need to clear this without reloading
//runJmolScriptWait('script scripts/reload.spt');
//restoreOrientation_e();
}




      		
///js// Js/_m_other.js /////
function enterOther() {
	setValuesOther();	
}

function exitOther() {
}


function setValuesOther() {
// show lighting
//	  set ambientPercent 45;
//	  set diffusePercent 84;
//	  set specular true;
//	  set specularPercent 22;
//	  set specularPower 40;
//	  set specularExponent 6;
//	  set celShading false;
//	  set celShadingPower 10;
//	  set zShadePower 3;
//	  set zDepth 0;
//	  set zSlab 50;
//	  set zShade false;
	
	cameraDepthSlider.setValue(jmolEvaluate("cameraDepth") * 25);
	SpecularPercentSlider.setValue(jmolEvaluate("specularPercent"));
	AmbientPercentSlider.setValue(jmolEvaluate("ambientPercent"));
	DiffusePercentSlider.setValue(jmolEvaluate("diffusePercent"));
//	getbyID("SpecularPercentMsg").innerHTML = 40 + " %";
//	getbyID("AmbientPercentMsg").innerHTML = 40 + " %";
//	getbyID("DiffusePercentMsg").innerHTML = 40 + " %";

}

function applyCameraDepth(depth) {
	runJmolScriptWait("set cameraDepth " + depth + ";")
	getbyID("cameraDepthMsg").innerHTML = depth
}

function applySpecularPercent(x) {
	runJmolScriptWait(" set specularPercent " + x + ";");
	getbyID("SpecularPercentMsg").innerHTML = x + "%";
}

function applyAmbientPercent(x) {
	runJmolScriptWait(" set ambientPercent " + x + ";");
	getbyID("AmbientPercentMsg").innerHTML = x + "%";
}

function applyDiffusePercent(x) {
	runJmolScriptWait(" set diffusePercent " + x + ";");
	getbyID("DiffusePercentMsg").innerHTML = x + "%";
}

function setTextSize(value) {
	runJmolScriptWait("select *; font label " + value + " ;");
}

function setFrameTitle(chkbox) {
	runJmolScriptWait(chkbox.checked ? "frame title" : "frame title ''");
}


      		
///js// Js/callback.js /////
// BH 2018

getCallbackSettings = function() {
	return  "set messageCallback 'myMessageCallback';" +
			"set errorCallback 'myErrorCallback';" +
			"set loadStructCallback 'myLoadStructCallback';" +
			"set measureCallback 'myMeasurementCallback';" +
			"set pickCallback 'myPickCallback';" +
			"set minimizationCallback 'myMinimizationCallback';"
}

function myMeasuramentCallback(app, msg, type, state, value) {
	// BH 2018
	if (state == "measurePicked")
		setMeasureText(msg);
}

LOADING_MODE_NONE = 0;

loadingMode = LOADING_MODE_NONE;

setLoadingMode = function(mode) {
	loadingMode = mode;	
}

myLoadStructCallback = function(applet,b,c,d) {
	// run xxxDone() if it exists, otherwise just loadDone()
	var type = jmolEvaluate("_fileType").toLowerCase();
	postLoad(type);
	if (window[type+"Done"])
		window[type+"Done"]();
	else
		loadDone();
}

loadDone = function(fDone) {
	fDone && fDone();
	setFileName();
	setTitleEcho();
}

MESSAGE_MODE_NONE                   = 0;
//MESSAGE_MODE_SAVE_ISO               = 101;

var messageMode = MESSAGE_MODE_NONE;

setMessageMode = function(mode) {
	messageMode = mode;
}

myMessageCallback = function (applet, msg) {	
	switch(messageMode) {
	default:
//	case MESSAGE_MODE_SAVE_ISO:
//		saveIsoMessageCallback(msg);
		break;
	}
	messageMode = MESSAGE_MODE_NONE;
}

myErrorCallback = function(applet, b, msg, d) {
	errorMsg(msg);
}

var fPick = null;

setPickingCallbackFunction = function(f) {
	fPick = f;
}

myPickCallback = function(applet, b, c, d) {
	fPick && fPick(b,c,d);
}

fMinim = null;
setMinimizationCallbackFunction = function(f) {
	fMinim = f;
}

myMinimizationCallback = function(applet,b,c,d) {
	fMinim && fMinim(b, c, d);
}

      		
///js// Js/constant.js /////
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


var version = "3.0.0"; // BH 2018

var eleSymb = [];
eleSymb[0] = "select";
eleSymb[1] = "H";
eleSymb[2] = "He";
eleSymb[3] = "Li";
eleSymb[4] = "Be";
eleSymb[5] = "B";
eleSymb[6] = "C";
eleSymb[7] = "N";
eleSymb[8] = "O";
eleSymb[9] = "F";
eleSymb[10] = "Ne";
eleSymb[11] = "Na";
eleSymb[12] = "Mg";
eleSymb[13] = "Al";
eleSymb[14] = "Si";
eleSymb[15] = "P";
eleSymb[16] = "S";
eleSymb[17] = "Cl";
eleSymb[18] = "Ar";
eleSymb[19] = "K";
eleSymb[20] = "Ca";
eleSymb[21] = "Sc";
eleSymb[22] = "Ti";
eleSymb[23] = "V";
eleSymb[24] = "Cr";
eleSymb[25] = "Mn";
eleSymb[26] = "Fe";
eleSymb[27] = "Co";
eleSymb[28] = "Ni";
eleSymb[29] = "Cu";
eleSymb[30] = "Zn";
eleSymb[31] = "Ga";
eleSymb[32] = "Ge";
eleSymb[33] = "As";
eleSymb[34] = "Se";
eleSymb[35] = "Br";
eleSymb[36] = "No";
eleSymb[37] = "Rb";
eleSymb[38] = "Sr";
eleSymb[39] = "Y";
eleSymb[40] = "Zr";
eleSymb[41] = "Nb";
eleSymb[42] = "Mo";
eleSymb[43] = "Tc";
eleSymb[44] = "Ru";
eleSymb[45] = "Rh";
eleSymb[46] = "Pd";
eleSymb[47] = "Ag";
eleSymb[48] = "Cd";
eleSymb[49] = "In";
eleSymb[50] = "Sn";
eleSymb[51] = "Sb";
eleSymb[52] = "Te";
eleSymb[53] = "I";
eleSymb[54] = "Xe";
eleSymb[55] = "Cs";
eleSymb[56] = "Ba";
eleSymb[57] = "La";
eleSymb[58] = "Ce";
eleSymb[59] = "Lr";
eleSymb[60] = "Md";
eleSymb[61] = "Pr";
eleSymb[62] = "Sm";
eleSymb[63] = "Eu";
eleSymb[64] = "Gd";
eleSymb[65] = "Tb";
eleSymb[66] = "Dy";
eleSymb[67] = "Ho";
eleSymb[68] = "Er";
eleSymb[69] = "Tm";
eleSymb[70] = "Yb";
eleSymb[71] = "Lu";
eleSymb[72] = "Hf";
eleSymb[73] = "Ta";
eleSymb[74] = "W";
eleSymb[75] = "Re";
eleSymb[76] = "Os";
eleSymb[77] = "Ir";
eleSymb[78] = "Pt";
eleSymb[79] = "Au";
eleSymb[80] = "Hg";
eleSymb[81] = "Tl";
eleSymb[82] = "Pb";
eleSymb[83] = "Bi";
eleSymb[84] = "Po";
eleSymb[85] = "At";
eleSymb[86] = "Rd";
eleSymb[87] = "Fr";
eleSymb[88] = "Rn";
eleSymb[89] = "Ac";
eleSymb[90] = "Th";
eleSymb[91] = "Pa";
eleSymb[92] = "Sg";
eleSymb[93] = "Np";
eleSymb[94] = "Pu";
eleSymb[95] = "Am";
eleSymb[96] = "Cm";
eleSymb[97] = "Bk";
eleSymb[98] = "Cf";
eleSymb[99] = "Es";

////Arrays elements : 594
var spaceGroupName = new Array("select", "1, P1", "2, P-1", "3:b, P121",
		"3:b, P2", "3:c, P112", "3:a, P211", "4:b, P1211", "4:b, P21",
		"4:b*, P1211*", "4:c, P1121", "4:c*, P1121*", "4:a, P2111",
		"4:a*, P2111*", "5:b1, C121", "5:b1, C2", "5:b2, A121", "5:b3, I121",
		"5:c1, A112", "5:c2, B112", "5:c3, I112", "5:a1, B211", "5:a2, C211",
		"5:a3, I211", "6:b, P1m1", "6:b, Pm", "6:c, P11m", "6:a, Pm11",
		"7:b1, P1c1", "7:b1, Pc", "7:b2, P1n1", "7:b2, Pn", "7:b3, P1a1",
		"7:b3, Pa", "7:c1, P11a", "7:c2, P11n", "7:c3, P11b", "7:a1, Pb11",
		"7:a2, Pn11", "7:a3, Pc11", "8:b1, C1m1", "8:b1, Cm", "8:b2, A1m1",
		"8:b3, I1m1", "8:b3, Im", "8:c1, A11m", "8:c2, B11m", "8:c3, I11m",
		"8:a1, Bm11", "8:a2, Cm11", "8:a3, Im11", "9:b1, C1c1", "9:b1, Cc",
		"9:b2, A1n1", "9:b3, I1a1", "9:-b1, A1a1", "9:-b2, C1n1",
		"9:-b3, I1c1", "9:c1, A11a", "9:c2, B11n", "9:c3, I11b", "9:-c1, B11b",
		"9:-c2, A11n", "9:-c3, I11a", "9:a1, Bb11", "9:a2, Cn11", "9:a3, Ic11",
		"9:-a1, Cc11", "9:-a2, Bn11", "9:-a3, Ib11", "10:b, P12/m1",
		"10:b, P2/m", "10:c, P112/m", "10:a, P2/m11", "11:b, P121/m1",
		"11:b, P21/m", "11:b*, P121/m1*", "11:c, P1121/m", "11:c*, P1121/m*",
		"11:a, P21/m11", "11:a*, P21/m11*", "12:b1, C12/m1", "12:b1, C2/m",
		"12:b2, A12/m1", "12:b3, I12/m1", "12:b3, I2/m", "12:c1, A112/m",
		"12:c2, B112/m", "12:c3, I112/m", "12:a1, B2/m11", "12:a2, C2/m11",
		"12:a3, I2/m11", "13:b1, P12/c1", "13:b1, P2/c", "13:b2, P12/n1",
		"13:b2, P2/n", "13:b3, P12/a1", "13:b3, P2/a", "13:c1, P112/a",
		"13:c2, P112/n", "13:c3, P112/b", "13:a1, P2/b11", "13:a2, P2/n11",
		"13:a3, P2/c11", "14:b1, P121/c1", "14:b1, P21/c", "14:b2, P121/n1",
		"14:b2, P21/n", "14:b3, P121/a1", "14:b3, P21/a", "14:c1, P1121/a",
		"14:c2, P1121/n", "14:c3, P1121/b", "14:a1, P21/b11", "14:a2, P21/n11",
		"14:a3, P21/c11", "15:b1, C12/c1", "15:b1, C2/c", "15:b2, A12/n1",
		"15:b3, I12/a1", "15:b3, I2/a", "15:-b1, A12/a1", "15:-b2, C12/n1",
		"15:-b2, C2/n", "15:-b3, I12/c1", "15:-b3, I2/c", "15:c1, A112/a",
		"15:c2, B112/n", "15:c3, I112/b", "15:-c1, B112/b", "15:-c2, A112/n",
		"15:-c3, I112/a", "15:a1, B2/b11", "15:a2, C2/n11", "15:a3, I2/c11",
		"15:-a1, C2/c11", "15:-a2, B2/n11", "15:-a3, I2/b11", "16, P222",
		"17, P2221", "17*, P2221*", "17:cab, P2122", "17:bca, P2212",
		"18, P21212", "18:cab, P22121", "18:bca, P21221", "19, P212121",
		"20, C2221", "20*, C2221*", "20:cab, A2122", "20:cab*, A2122*",
		"20:bca, B2212", "21, C222", "21:cab, A222", "21:bca, B222",
		"22, F222", "23, I222", "24, I212121", "25, Pmm2", "25:cab, P2mm",
		"25:bca, Pm2m", "26, Pmc21", "26*, Pmc21*", "26:ba-c, Pcm21",
		"26:ba-c*, Pcm21*", "26:cab, P21ma", "26:-cba, P21am", "26:bca, Pb21m",
		"26:a-cb, Pm21b", "27, Pcc2", "27:cab, P2aa", "27:bca, Pb2b",
		"28, Pma2", "28*, Pma2*", "28:ba-c, Pbm2", "28:cab, P2mb",
		"28:-cba, P2cm", "28:-cba*, P2cm*", "28:bca, Pc2m", "28:a-cb, Pm2a",
		"29, Pca21", "29:ba-c, Pbc21", "29:cab, P21ab", "29:-cba, P21ca",
		"29:bca, Pc21b", "29:a-cb, Pb21a", "30, Pnc2", "30:ba-c, Pcn2",
		"30:cab, P2na", "30:-cba, P2an", "30:bca, Pb2n", "30:a-cb, Pn2b",
		"31, Pmn21", "31:ba-c, Pnm21", "31:cab, P21mn", "31:-cba, P21nm",
		"31:bca, Pn21m", "31:a-cb, Pm21n", "32, Pba2", "32:cab, P2cb",
		"32:bca, Pc2a", "33, Pna21", "33*, Pna21*", "33:ba-c, Pbn21",
		"33:ba-c*, Pbn21*", "33:cab, P21nb", "33:cab*, P21nb*",
		"33:-cba, P21cn", "33:-cba*, P21cn*", "33:bca, Pc21n",
		"33:a-cb, Pn21a", "34, Pnn2", "34:cab, P2nn", "34:bca, Pn2n",
		"35, Cmm2", "35:cab, A2mm", "35:bca, Bm2m", "36, Cmc21", "36*, Cmc21*",
		"36:ba-c, Ccm21", "36:ba-c*, Ccm21*", "36:cab, A21ma",
		"36:cab*, A21ma*", "36:-cba, A21am", "36:-cba*, A21am*",
		"36:bca, Bb21m", "36:a-cb, Bm21b", "37, Ccc2", "37:cab, A2aa",
		"37:bca, Bb2b", "38, Amm2", "38:ba-c, Bmm2", "38:cab, B2mm",
		"38:-cba, C2mm", "38:bca, Cm2m", "38:a-cb, Am2m", "39, Abm2",
		"39:ba-c, Bma2", "39:cab, B2cm", "39:-cba, C2mb", "39:bca, Cm2a",
		"39:a-cb, Ac2m", "40, Ama2", "40:ba-c, Bbm2", "40:cab, B2mb",
		"40:-cba, C2cm", "40:bca, Cc2m", "40:a-cb, Am2a", "41, Aba2",
		"41:ba-c, Bba2", "41:cab, B2cb", "41:-cba, C2cb", "41:bca, Cc2a",
		"41:a-cb, Ac2a", "42, Fmm2", "42:cab, F2mm", "42:bca, Fm2m",
		"43, Fdd2", "43:cab, F2dd", "43:bca, Fd2d", "44, Imm2", "44:cab, I2mm",
		"44:bca, Im2m", "45, Iba2", "45:cab, I2cb", "45:bca, Ic2a", "46, Ima2",
		"46:ba-c, Ibm2", "46:cab, I2mb", "46:-cba, I2cm", "46:bca, Ic2m",
		"46:a-cb, Im2a", "47, Pmmm", "48:01:00, Pnnn", "48:02:00, Pnnn",
		"49, Pccm", "49:cab, Pmaa", "49:bca, Pbmb", "50:01:00, Pban",
		"50:02:00, Pban", "50:1cab, Pncb", "50:2cab, Pncb", "50:1bca, Pcna",
		"50:2bca, Pcna", "51, Pmma", "51:ba-c, Pmmb", "51:cab, Pbmm",
		"51:-cba, Pcmm", "51:bca, Pmcm", "51:a-cb, Pmam", "52, Pnna",
		"52:ba-c, Pnnb", "52:cab, Pbnn", "52:-cba, Pcnn", "52:bca, Pncn",
		"52:a-cb, Pnan", "53, Pmna", "53:ba-c, Pnmb", "53:cab, Pbmn",
		"53:-cba, Pcnm", "53:bca, Pncm", "53:a-cb, Pman", "54, Pcca",
		"54:ba-c, Pccb", "54:cab, Pbaa", "54:-cba, Pcaa", "54:bca, Pbcb",
		"54:a-cb, Pbab", "55, Pbam", "55:cab, Pmcb", "55:bca, Pcma",
		"56, Pccn", "56:cab, Pnaa", "56:bca, Pbnb", "57, Pbcm",
		"57:ba-c, Pcam", "57:cab, Pmca", "57:-cba, Pmab", "57:bca, Pbma",
		"57:a-cb, Pcmb", "58, Pnnm", "58:cab, Pmnn", "58:bca, Pnmn",
		"59:01:00, Pmmn", "59:02:00, Pmmn", "59:1cab, Pnmm", "59:2cab, Pnmm",
		"59:1bca, Pmnm", "59:2bca, Pmnm", "60, Pbcn", "60:ba-c, Pcan",
		"60:cab, Pnca", "60:-cba, Pnab", "60:bca, Pbna", "60:a-cb, Pcnb",
		"61, Pbca", "61:ba-c, Pcab", "62, Pnma", "62:ba-c, Pmnb",
		"62:cab, Pbnm", "62:-cba, Pcmn", "62:bca, Pmcn", "62:a-cb, Pnam",
		"63, Cmcm", "63:ba-c, Ccmm", "63:cab, Amma", "63:-cba, Amam",
		"63:bca, Bbmm", "63:a-cb, Bmmb", "64, Cmca", "64:ba-c, Ccmb",
		"64:cab, Abma", "64:-cba, Acam", "64:bca, Bbcm", "64:a-cb, Bmab",
		"65, Cmmm", "65:cab, Ammm", "65:bca, Bmmm", "66, Cccm", "66:cab, Amaa",
		"66:bca, Bbmb", "67, Cmma", "67:ba-c, Cmmb", "67:cab, Abmm",
		"67:-cba, Acmm", "67:bca, Bmcm", "67:a-cb, Bmam", "68:01:00, Ccca",
		"68:02:00, Ccca", "68:1ba-c, Cccb", "68:2ba-c, Cccb", "68:1cab, Abaa",
		"68:2cab, Abaa", "68:1-cba, Acaa", "68:2-cba, Acaa", "68:1bca, Bbcb",
		"68:2bca, Bbcb", "68:1a-cb, Bbab", "68:2a-cb, Bbab", "69, Fmmm",
		"70:01:00, Fddd", "70:02:00, Fddd", "71, Immm", "72, Ibam",
		"72:cab, Imcb", "72:bca, Icma", "73, Ibca", "73:ba-c, Icab",
		"74, Imma", "74:ba-c, Immb", "74:cab, Ibmm", "74:-cba, Icmm",
		"74:bca, Imcm", "74:a-cb, Imam", "75, P4", "76, P41", "76*, P41*",
		"77, P42", "77*, P42*", "78, P43", "78*, P43*", "79, I4", "80, I41",
		"81, P-4", "82, I-4", "83, P4/m", "84, P42/m", "84*, P42/m*",
		"85:01:00, P4/n", "85:02:00, P4/n", "86:01:00, P42/n",
		"86:02:00, P42/n", "87, I4/m", "88:01:00, I41/a", "88:02:00, I41/a",
		"89, P422", "90, P4212", "91, P4122", "91*, P4122*", "92, P41212",
		"93, P4222", "93*, P4222*", "94, P42212", "95, P4322", "95*, P4322*",
		"96, P43212", "97, I422", "98, I4122", "99, P4mm", "100, P4bm",
		"101, P42cm", "101*, P42cm*", "102, P42nm", "103, P4cc", "104, P4nc",
		"105, P42mc", "105*, P42mc*", "106, P42bc", "106*, P42bc*",
		"107, I4mm", "108, I4cm", "109, I41md", "110, I41cd", "111, P-42m",
		"112, P-42c", "113, P-421m", "114, P-421c", "115, P-4m2", "116, P-4c2",
		"117, P-4b2", "118, P-4n2", "119, I-4m2", "120, I-4c2", "121, I-42m",
		"122, I-42d", "123, P4/mmm", "124, P4/mcc", "125:01:00, P4/nbm",
		"125:02:00, P4/nbm", "126:01:00, P4/nnc", "126:02:00, P4/nnc",
		"127, P4/mbm", "128, P4/mnc", "129:01:00, P4/nmm", "129:02:00, P4/nmm",
		"130:01:00, P4/ncc", "130:02:00, P4/ncc", "131, P42/mmc",
		"132, P42/mcm", "133:01:00, P42/nbc", "133:02:00, P42/nbc",
		"134:01:00, P42/nnm", "134:02:00, P42/nnm", "135, P42/mbc",
		"135*, P42/mbc*", "136, P42/mnm", "137:01:00, P42/nmc",
		"137:02:00, P42/nmc", "138:01:00, P42/ncm", "138:02:00, P42/ncm",
		"139, I4/mmm", "140, I4/mcm", "141:01:00, I41/amd",
		"141:02:00, I41/amd", "142:01:00, I41/acd", "142:02:00, I41/acd",
		"143, P3", "144, P31", "145, P32", "146:h, R3", "146:r, R3",
		"147, P-3", "148:h, R-3", "148:r, R-3", "149, P312", "150, P321",
		"151, P3112", "152, P3121", "153, P3212", "154, P3221", "155:h, R32",
		"155:r, R32", "156, P3m1", "157, P31m", "158, P3c1", "159, P31c",
		"160:h, R3m", "160:r, R3m", "161:h, R3c", "161:r, R3c", "162, P-31m",
		"163, P-31c", "164, P-3m1", "165, P-3c1", "166:h, R-3m", "166:r, R-3m",
		"167:h, R-3c", "167:r, R-3c", "168, P6", "169, P61", "170, P65",
		"171, P62", "172, P64", "173, P63", "173*, P63*", "174, P-6",
		"175, P6/m", "176, P63/m", "176*, P63/m*", "177, P622", "178, P6122",
		"179, P6522", "180, P6222", "181, P6422", "182, P6322", "182*, P6322*",
		"183, P6mm", "184, P6cc", "185, P63cm", "185*, P63cm*", "186, P63mc",
		"186*, P63mc*", "187, P-6m2", "188, P-6c2", "189, P-62m", "190, P-62c",
		"191, P6/mmm", "192, P6/mcc", "193, P63/mcm", "193*, P63/mcm*",
		"194, P63/mmc", "194*, P63/mmc*", "195, P23", "196, F23", "197, I23",
		"198, P213", "199, I213", "200, Pm-3", "201:01:00, Pn-3",
		"201:02:00, Pn-3", "202, Fm-3", "203:01:00, Fd-3", "203:02:00, Fd-3",
		"204, Im-3", "205, Pa-3", "206, Ia-3", "207, P432", "208, P4232",
		"209, F432", "210, F4132", "211, I432", "212, P4332", "213, P4132",
		"214, I4132", "215, P-43m", "216, F-43m", "217, I-43m", "218, P-43n",
		"219, F-43c", "220, I-43d", "221, Pm-3m", "222:01:00, Pn-3n",
		"222:02:00, Pn-3n", "223, Pm-3n", "224:01:00, Pn-3m",
		"224:02:00, Pn-3m", "225, Fm-3m", "226, Fm-3c", "227:01:00, Fd-3m",
		"227:02:00, Fd-3m", "228:01:00, Fd-3c", "228:02:00, Fd-3c",
		"229, Im-3m", "230, Ia-3d");

var spaceGroupValue = new Array("select", "1", "2", "3:b", "3:b", "3:c", "3:a",
		"4:b", "4:b", "4:b*", "4:c", "4:c*", "4:a", "4:a*", "5:b1", "5:b1",
		"5:b2", "5:b3", "5:c1", "5:c2", "5:c3", "5:a1", "5:a2", "5:a3", "6:b",
		"6:b", "6:c", "6:a", "7:b1", "7:b1", "7:b2", "7:b2", "7:b3", "7:b3",
		"7:c1", "7:c2", "7:c3", "7:a1", "7:a2", "7:a3", "8:b1", "8:b1", "8:b2",
		"8:b3", "8:b3", "8:c1", "8:c2", "8:c3", "8:a1", "8:a2", "8:a3", "9:b1",
		"9:b1", "9:b2", "9:b3", "9:-b1", "9:-b2", "9:-b3", "9:c1", "9:c2",
		"9:c3", "9:-c1", "9:-c2", "9:-c3", "9:a1", "9:a2", "9:a3", "9:-a1",
		"9:-a2", "9:-a3", "10:b", "10:b", "10:c", "10:a", "11:b", "11:b",
		"11:b*", "11:c", "11:c*", "11:a", "11:a*", "12:b1", "12:b1", "12:b2",
		"12:b3", "12:b3", "12:c1", "12:c2", "12:c3", "12:a1", "12:a2", "12:a3",
		"13:b1", "13:b1", "13:b2", "13:b2", "13:b3", "13:b3", "13:c1", "13:c2",
		"13:c3", "13:a1", "13:a2", "13:a3", "14:b1", "14:b1", "14:b2", "14:b2",
		"14:b3", "14:b3", "14:c1", "14:c2", "14:c3", "14:a1", "14:a2", "14:a3",
		"15:b1", "15:b1", "15:b2", "15:b3", "15:b3", "15:-b1", "15:-b2",
		"15:-b2", "15:-b3", "15:-b3", "15:c1", "15:c2", "15:c3", "15:-c1",
		"15:-c2", "15:-c3", "15:a1", "15:a2", "15:a3", "15:-a1", "15:-a2",
		"15:-a3", "16", "17", "17*", "17:cab", "17:bca", "18", "18:cab",
		"18:bca", "19", "20", "20*", "20:cab", "20:cab*", "20:bca", "21",
		"21:cab", "21:bca", "22", "23", "24", "25", "25:cab", "25:bca", "26",
		"26*", "26:ba-c", "26:ba-c*", "26:cab", "26:-cba", "26:bca", "26:a-cb",
		"27", "27:cab", "27:bca", "28", "28*", "28:ba-c", "28:cab", "28:-cba",
		"28:-cba*", "28:bca", "28:a-cb", "29", "29:ba-c", "29:cab", "29:-cba",
		"29:bca", "29:a-cb", "30", "30:ba-c", "30:cab", "30:-cba", "30:bca",
		"30:a-cb", "31", "31:ba-c", "31:cab", "31:-cba", "31:bca", "31:a-cb",
		"32", "32:cab", "32:bca", "33", "33*", "33:ba-c", "33:ba-c*", "33:cab",
		"33:cab*", "33:-cba", "33:-cba*", "33:bca", "33:a-cb", "34", "34:cab",
		"34:bca", "35", "35:cab", "35:bca", "36", "36*", "36:ba-c", "36:ba-c*",
		"36:cab", "36:cab*", "36:-cba", "36:-cba*", "36:bca", "36:a-cb", "37",
		"37:cab", "37:bca", "38", "38:ba-c", "38:cab", "38:-cba", "38:bca",
		"38:a-cb", "39", "39:ba-c", "39:cab", "39:-cba", "39:bca", "39:a-cb",
		"40", "40:ba-c", "40:cab", "40:-cba", "40:bca", "40:a-cb", "41",
		"41:ba-c", "41:cab", "41:-cba", "41:bca", "41:a-cb", "42", "42:cab",
		"42:bca", "43", "43:cab", "43:bca", "44", "44:cab", "44:bca", "45",
		"45:cab", "45:bca", "46", "46:ba-c", "46:cab", "46:-cba", "46:bca",
		"46:a-cb", "47", "48:01:00", "48:02:00", "49", "49:cab", "49:bca",
		"50:01:00", "50:02:00", "50:1cab", "50:2cab", "50:1bca", "50:2bca",
		"51", "51:ba-c", "51:cab", "51:-cba", "51:bca", "51:a-cb", "52",
		"52:ba-c", "52:cab", "52:-cba", "52:bca", "52:a-cb", "53", "53:ba-c",
		"53:cab", "53:-cba", "53:bca", "53:a-cb", "54", "54:ba-c", "54:cab",
		"54:-cba", "54:bca", "54:a-cb", "55", "55:cab", "55:bca", "56",
		"56:cab", "56:bca", "57", "57:ba-c", "57:cab", "57:-cba", "57:bca",
		"57:a-cb", "58", "58:cab", "58:bca", "59:01:00", "59:02:00", "59:1cab",
		"59:2cab", "59:1bca", "59:2bca", "60", "60:ba-c", "60:cab", "60:-cba",
		"60:bca", "60:a-cb", "61", "61:ba-c", "62", "62:ba-c", "62:cab",
		"62:-cba", "62:bca", "62:a-cb", "63", "63:ba-c", "63:cab", "63:-cba",
		"63:bca", "63:a-cb", "64", "64:ba-c", "64:cab", "64:-cba", "64:bca",
		"64:a-cb", "65", "65:cab", "65:bca", "66", "66:cab", "66:bca", "67",
		"67:ba-c", "67:cab", "67:-cba", "67:bca", "67:a-cb", "68:01:00",
		"68:02:00", "68:1ba-c", "68:2ba-c", "68:1cab", "68:2cab", "68:1-cba",
		"68:2-cba", "68:1bca", "68:2bca", "68:1a-cb", "68:2a-cb", "69",
		"70:01:00", "70:02:00", "71", "72", "72:cab", "72:bca", "73",
		"73:ba-c", "74", "74:ba-c", "74:cab", "74:-cba", "74:bca", "74:a-cb",
		"75", "76", "76*", "77", "77*", "78", "78*", "79", "80", "81", "82",
		"83", "84", "84*", "85:01:00", "85:02:00", "86:01:00", "86:02:00",
		"87", "88:01:00", "88:02:00", "89", "90", "91", "91*", "92", "93",
		"93*", "94", "95", "95*", "96", "97", "98", "99", "100", "101", "101*",
		"102", "103", "104", "105", "105*", "106", "106*", "107", "108", "109",
		"110", "111", "112", "113", "114", "115", "116", "117", "118", "119",
		"120", "121", "122", "123", "124", "125:01:0", "125:02:0", "126:01:0",
		"126:02:0", "127", "128", "129:01:0", "129:02:0", "130:01:0",
		"130:02:0", "131", "132", "133:01:0", "133:02:0", "134:01:0",
		"134:02:0", "135", "135*", "136", "137:01:0", "137:02:0", "138:01:0",
		"138:02:0", "139", "140", "141:01:0", "141:02:0", "142:01:0",
		"142:02:0", "143", "144", "145", "146:h", "146:r", "147", "148:h",
		"148:r", "149", "150", "151", "152", "153", "154", "155:h", "155:r",
		"156", "157", "158", "159", "160:h", "160:r", "161:h", "161:r", "162",
		"163", "164", "165", "166:h", "166:r", "167:h", "167:r", "168", "169",
		"170", "171", "172", "173", "173*", "174", "175", "176", "176*", "177",
		"178", "179", "180", "181", "182", "182*", "183", "184", "185", "185*",
		"186", "186*", "187", "188", "189", "190", "191", "192", "193", "193*",
		"194", "194*", "195", "196", "197", "198", "199", "200", "201:01:0",
		"201:02:0", "202", "203:01:0", "203:02:0", "204", "205", "206", "207",
		"208", "209", "210", "211", "212", "213", "214", "215", "216", "217",
		"218", "219", "220", "221", "222:01:0", "222:02:0", "223", "224:01:0",
		"224:02:0", "225", "226", "227:01:0", "227:02:0", "228:01:0",
		"228:02:0", "229", "230");

var eleSymbMass = [];
eleSymbMass[0] = "select";
eleSymbMass[1] = 1.00;
eleSymbMass[2] = 4.00;
eleSymbMass[3] = 6.94;
eleSymbMass[4] = 9.01;
eleSymbMass[5] = 10.81;
eleSymbMass[6] = 12.01;
eleSymbMass[7] = 14.01;
eleSymbMass[8] = 16.00;
eleSymbMass[9] = 19.00;
eleSymbMass[10] = 20.18;
eleSymbMass[11] = 22.99;
eleSymbMass[12] = 24.31;
eleSymbMass[13] = 26.98;
eleSymbMass[14] = 28.09;
eleSymbMass[15] = 30.97;
eleSymbMass[16] = 32.06;
eleSymbMass[17] = 35.45;
eleSymbMass[18] = 39.95;
eleSymbMass[19] = 39.10;
eleSymbMass[20] = 40.08;
eleSymbMass[21] = 44.96;
eleSymbMass[22] = 47.88;
eleSymbMass[23] = 50.94;
eleSymbMass[24] = 52.00;
eleSymbMass[25] = 54.94;
eleSymbMass[26] = 55.85;
eleSymbMass[27] = 58.93;
eleSymbMass[28] = 58.69;
eleSymbMass[29] = 63.55;
eleSymbMass[30] = 65.38;
eleSymbMass[31] = 69.72;
eleSymbMass[32] = 72.59;
eleSymbMass[33] = 74.92;
eleSymbMass[34] = 78.96;
eleSymbMass[35] = 79.90;
eleSymbMass[36] = 83.80;
eleSymbMass[37] = 85.47;
eleSymbMass[38] = 87.62;
eleSymbMass[39] = 88.91;
eleSymbMass[40] = 91.22;
eleSymbMass[41] = 92.91;
eleSymbMass[42] = 95.94;
eleSymbMass[43] = 98.00;
eleSymbMass[44] = 101.07;
eleSymbMass[45] = 102.91;
eleSymbMass[46] = 106.42;
eleSymbMass[47] = 107.87;
eleSymbMass[48] = 112.41;
eleSymbMass[49] = 114.82;
eleSymbMass[50] = 118.69;
eleSymbMass[51] = 121.75;
eleSymbMass[52] = 127.60;
eleSymbMass[53] = 126.90;
eleSymbMass[54] = 131.29;
eleSymbMass[55] = 132.91;
eleSymbMass[56] = 137.34;
eleSymbMass[57] = 138.91;
eleSymbMass[58] = 140.12;
eleSymbMass[59] = 140.91;
eleSymbMass[60] = 144.24;
eleSymbMass[61] = 145.00;
eleSymbMass[62] = 150.36;
eleSymbMass[63] = 151.96;
eleSymbMass[64] = 157.25;
eleSymbMass[65] = 158.93;
eleSymbMass[66] = 162.50;
eleSymbMass[67] = 164.93;
eleSymbMass[68] = 167.26;
eleSymbMass[69] = 168.93;
eleSymbMass[70] = 173.04;
eleSymbMass[71] = 174.97;
eleSymbMass[72] = 178.49;
eleSymbMass[73] = 180.95;
eleSymbMass[74] = 183.85;
eleSymbMass[75] = 186.21;
eleSymbMass[76] = 190.20;
eleSymbMass[77] = 192.22;
eleSymbMass[78] = 195.09;
eleSymbMass[79] = 196.97;
eleSymbMass[80] = 200.59;
eleSymbMass[81] = 204.38;
eleSymbMass[82] = 207.19;
eleSymbMass[83] = 208.98;
eleSymbMass[84] = 209.00;
eleSymbMass[85] = 210.00;
eleSymbMass[86] = 222.00;
eleSymbMass[87] = 223.00;
eleSymbMass[88] = 226.00;
eleSymbMass[89] = 227.00;
eleSymbMass[90] = 232.04;
eleSymbMass[91] = 231.04;
eleSymbMass[92] = 238.04;
eleSymbMass[93] = 237.05;
eleSymbMass[94] = 244.00;
eleSymbMass[95] = 243.00;
eleSymbMass[96] = 247.00;
eleSymbMass[97] = 247.00;
eleSymbMass[98] = 251.00;
eleSymbMass[99] = 252.00;
      		
///js// Js/conversion.js /////
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

//////////////////////////////////////VALUE conversion AND ROUNDOFF

var finalGeomUnit = ""
var unitGeomEnergy = "";

var radiant = Math.PI / 180;

function substringEnergyToFloat(value) {
	if (value != null) {
		var grab = parseFloat(
				value.substring(value.indexOf('=') + 1, value.indexOf('H') - 1))
				.toPrecision(12); // Energy = -5499.5123027313 Hartree
		grab = grab * 2625.50;
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function substringFreqToFloat(value) {
	if (value != null) {
		var grab = parseFloat(value.substring(0, value.indexOf('c') - 1));
		// BH 2018 looking out for "F 300.2" in frequencies
		if (isNaN(grab))
			grab= parseFloat(value.substring(1, value.indexOf('c') - 1));
		if (isNaN(grab))
			return NaN;
		else
		grab = Math.round(grab.toPrecision(8) * 100000000) / 100000000;
	}
	return grab;
}

function substringIntGaussToFloat(value) {
	if (value != null) {
		var grab = parseFloat(value.substring(0, value.indexOf('K') - 1))
		.toPrecision(8);
		grab = Math.round(grab * 100000000) / 100000000;
	}
	return grab;
}

function substringIntFreqToFloat(value) {
	if (value != null) {
		var grab = parseFloat(value.substring(0, value.indexOf('k') - 1))
		.toPrecision(5);
		grab = Math.round(grab * 10000) / 10000;
	}
	return grab;
}

function cosRadiant(value) {
	if (value != null) {
		var angle = parseFloat(value).toPrecision(7);
		angle = Math.cos(value * radiant);
		angle = Math.round(angle * 10000000) / 10000000;
	}
	return angle;
}

roundNumber = function(value) { //BH 2018 was 10000000
	return Math.round(value * 10000) / 10000;
}

function roundoff(value, precision) {
	value = "" + value
	precision = parseInt(precision)

	var whole = "" + Math.round(value * Math.pow(10, precision))
	var decPoint = whole.length - precision;

	if (decPoint != 0) {
		result = whole.substring(0, decPoint);
		result += "."
			result += whole.substring(decPoint, whole.length);
	} else {
		result = whole;
	}

	return result;
}


////////////////////////////////ENERGY CONV

function convertPlot(value) {
	var unitEnergy = value;

	// ////var vecUnitEnergyVal = new Array ("h", "e", "r", "kj", "kc");
	setconversionParam();
	switch (unitEnergy) {

	case "h": // Hartree
		finalGeomUnit = " Hartree";
		if (flagQuantumEspresso) {
			convertGeomData(fromRydbergtohartree);
		} else if (!flagCrystal || flagOutcar || flagGulp) {
			convertGeomData(fromevToHartree);
		} else if (flagCrystal || flagDmol) {
			convertGeomData(fromHartreetoHartree);
		}
		break;
	case "e": // eV
		finalGeomUnit = " eV";
		if (flagCrystal || flagDmol) {
			convertGeomData(fromHartreetoEv);
		} else if (flagQuantumEspresso) {
			convertGeomData(fromRydbergtoEv);
		} else if (!flagCrystal || flagOutcar || flagGulp) {
			convertGeomData(fromevtoev);
		}

		break;

	case "r": // Rydberg
		finalGeomUnit = " Ry";
		if (flagCrystal || flagDmol) {
			convertGeomData(fromHartreetoRydberg);
		} else if (!flagCrystal || flagOutcar || flagGulp) {
			convertGeomData(fromevTorydberg);
		} else if (flagQuantumEspresso) {
			convertGeomData(fromRydbergTorydberg);
		}
		break;

	case "kj": // Kj/mol
		finalGeomUnit = " kJ/mol"

			if (flagCrystal || flagDmol) {
				convertGeomData(fromHartreetokJ);
			} else if (!flagCrystal || flagOutcar || flagGulp) {
				convertGeomData(fromevTokJ);
			} else if (flagQuantumEspresso) {
				convertGeomData(fromRydbergToKj);
			}
		break;

	case "kc": // Kcal*mol
		finalGeomUnit = " kcal/mol"
			
			if (flagCrystal || flagDmol) {
				convertGeomData(fromHartreetokcalmol);
			} else if (!flagCrystal || flagOutcar || flagGulp) {
				convertGeomData(fromevtokcalmol);
			} else if (flagQuantumEspresso) {
				convertGeomData(fromRytokcalmol);
			}
		break;
	}
}

function setconversionParam() {
	if (flagCrystal || flagDmol) {
		unitGeomEnergy = "H"; // Hartree
	} else if ((!flagCrystal && !flagQuantumEspresso) || (flagOutcar && !flagQuantumEspresso)) {
		unitGeomEnergy = "e"; // VASP
	} else if (flagGulp) {
		unitGeomEnergy = "k";
	} else if (flagQuantumEspresso || !flagOutcar) {
		unitGeomEnergy = "R";
	}
}

function convertGeomData(f) {
	// The required value is the end of the string Energy = -123.456 Hartree.
	var geom = getbyID('geom');
	if (geom != null)
		cleanList('geom');

	var arraynewUnit = [];

	var n = 0;
	if (flagQuantumEspresso)
		n = 1;
	for (var i = n; i < geomData.length; i++) {
		var data = geomData[i];
		arraynewUnit[i] = f(data.substring(data.indexOf('=') + 1, 
				data.indexOf(unitGeomEnergy) - 1));
		addOption(geom, i + " E = " + arraynewUnit[i] + finalGeomUnit, i + 1);
	}

}

///Hartree
function fromHartreetoEv(value) { // 1 Hartree = 27.211396132eV
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = grab * 27.211396132;
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromHartreetoHartree(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromHartreetokJ(value) { // From hartree to kJmol-1
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = grab * 2625.50;
		grab = Math.round(grab * 1000) / 1000;
	}
	return grab;
}

function fromHartreetoRydberg(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = grab * 2;
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromHartreetokcalmol(value) { // 1Hartree == 627.509 kcal*mol-1
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = grab * 627.509;
		grab = Math.round(grab * 1000) / 1000;
	}
	return grab;
}

/// end Hartree

////ev

function fromevTokJ(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromevToHartree(grab);
		grab = fromHartreetokJ(grab)
		grab = Math.round(grab * 1000) / 1000;
	}
	return grab;
}

function fromevToHartree(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromHartreetoEv(1 / grab);
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromevTorydberg(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = grab * 0.073498618;
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromevtoev(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromevtokcalmol(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromevToHartree(grab);
		grab = fromHartreetokcalmol(grab);
		grab = Math.round(grab * 1000) / 1000;
	}
	return grab;
}

////end ev

//rydberg

function fromRydbergtohartree(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromHartreetoRydberg(1 / grab);
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromRydbergtoEv(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromevTorydberg(1 / grab);
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;

}

function fromRydbergToKj(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromHartreetokJ(grab / 2);
		grab = Math.round(grab * 1000) / 1000;
	}
	return grab;
}

function fromRytokcalmol(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromRydbergtohartree(grab);
		grab = fromHartreetokcalmol(grab);
		grab = Math.round(grab * 1000) / 1000;
	}
	return grab;
}

function fromRydbergTorydberg(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

//1 Angstrom = 1.889725989 Bohr
function fromAngstromtoBohr(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(7);
		grab = grab * 1.889725989;
		grab = Math.round(grab * 10000000) / 10000000;
	}
	return grab;
}

/////////////////////////////////END ENERGY conversion
      		
///js// Js/debug.js /////
debugSay = function(script) {
	// BH 2018
	var div = getbyID("debugdiv");
	var area = getbyID("debugarea");
	if (script === null) {
		script = "";
	} else {
		console.log(script);
		if (isChecked("debugMode")) {
			div.style.display = "block";
			script = area.value + script + "\n";
		} else {
			div.style.display = "none";
			script = "";
		}
	}
	area.value = script;
	area.scrollTop = area.scrollHeight;
}

debugShowCommands = function(isOn) {
	getbyID("debugdiv").style.display = (isOn ? "block" : "none");
}

debugShowHistory = function() {
 	debugSay(jmolEvaluate("show('history')"));
}

      		
///js// Js/export.js /////

function setVacuum() {
	switch (typeSystem) {
	case "slab":
		vaccum = prompt("Please enter the vacuum thickness (\305).", "");
		(vaccum == "") ? (errorMsg("Vacuum not entered!"))
				: (messageMsg("Vacuum set to: " + vaccum + " \305."));

		var zMaxCoord = parseFloat(jmolEvaluate(frameSelection + '.fz.max'));
		vaccum = parseFloat(vaccum);
		newcCell = (zMaxCoord * 2) + vaccum;
		var factor = roundNumber(zMaxCoord + vaccum);
		if (fractionalCoord == true) {
			runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; ( i.z +'
					+ factor + ') /' + newcell + ')');
		} else {
			runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z +'
					+ factor + ')');
		}
		fromfractionaltoCartesian(null, null, newcCell, null, 90, 90);
		break;
	case "polymer":
		vaccum = prompt("Please enter the vacuum thickness (\305).", "");
		(vaccum == "") ? (errorMsg("Vacuum not entered!"))
				: (messageMsg("Vacuum set to: " + vaccum + "  \305."));

		var zMaxCoord = parseFloat(jmolEvaluate(frameSelection + '.fz.max'));
		vaccum = parseFloat(vaccum);
		newcCell = (zMaxCoord * 2) + vaccum;
		var factor = roundNumber(zMaxCoord + vaccum);
		runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z +' + factor
				+ ')');
		runJmolScriptWait(frameSelection + '.y = for(i;' + frameSelection + '; i.y +' + factor
				+ ')');
		fromfractionaltoCartesian(null, newcCell, newcCell, 90, 90, 90);
		break;
	case "molecule":
		vaccum = prompt("Please enter the vacuum thickness (\305).", "");
		(vaccum == "") ? (errorMsg("Vacuum not entered!"))
				: (messageMsg("Vacuum set to: " + vaccum + " \305."));

		var zMaxCoord = parseFloat(jmolEvaluate(frameSelection + '.fz.max'));
		vaccum = parseFloat(vaccum);
		newcCell = (zMaxCoord * 2) + vaccum;
		var factor = roundNumber(zMaxCoord + vaccum);
		runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z +' + factor
				+ ')');
		runJmolScriptWait(frameSelection + '.y = for(i;' + frameSelection + '; i.y +' + factor
				+ ')');
		runJmolScriptWait(frameSelection + '.x = for(i;' + frameSelection + '; i.x +' + factor
				+ ')');
		fromfractionaltoCartesian(newcCell, newcCell, newcCell, 90, 90, 90);
		break;

	}
}

function fromfractionaltoCartesian(aparam, bparam, cparam, alphaparam,
		betaparam, gammaparam) {
	//From fractional to Cartesian -- returns a 3x3 matrix
	var xx, xy, xz, 
	    yx, yy, yz, 
	    zx, zy, zz;
	if (aparam != null)
		aCell = aparam;
	if (bparam != null)
		bCell = bparam;
	if (cparam != null)
		cCell = cparam;
	if (alphaparam != null)
		alpha = alphaparam;
	if (betaparam != null)
		beta = betaparam;
	if (gammaparam != null)
		gamma = gammaparam;
	// formula repeated from
	// http://en.wikipedia.org/wiki/Fractional_coordinates
	var v = Math.sqrt(1
			- (Math.cos(alpha * radiant) * Math.cos(alpha * radiant))
			- (Math.cos(beta * radiant) * Math.cos(beta * radiant))
			- (Math.cos(gamma * radiant) * Math.cos(gamma * radiant))
			+ 2
			* (Math.cos(alpha * radiant) * Math.cos(beta * radiant) * Math
					.cos(gamma * radiant)));
	xx = aCell * Math.sin(beta * radiant);
	xy = parseFloat(0.000);
	xz = aCell * Math.cos(beta * radiant);
	yx = bCell
	* (((Math.cos(gamma * radiant)) - ((Math.cos(beta * radiant)) * (Math
			.cos(alpha * radiant)))) / Math.sin(beta * radiant));
	yy = bCell * (v / Math.sin(beta * radiant));
	yz = bCell * Math.cos(alpha * radiant);
	zx = parseFloat(0.000);
	zy = parseFloat(0.000);
	zz = cCell;
	return [[xx, xy, xz], [yx, yy, yz], [zx, zy, zz]];

}

      		
///js// Js/form.js /////
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


function updateElementLists(x) {
	for (var i = (getbyID('colourbyElementList').options.length - 1); i >= 0; i--)
		getbyID('colourbyElementList').remove(i);
	for (var i = (getbyID('polybyElementList').options.length - 1); i >= 0; i--)
		getbyID('polybyElementList').remove(i);
	for (var i = (getbyID("poly2byElementList").options.length - 1); i >= 0; i--)
		getbyID("poly2byElementList").remove(i);
	for (var i = (getbyID("byElementAtomMotion").options.length - 1); i >= 0; i--)
		getbyID("byElementAtomMotion").remove(i);
	for (var i = (getbyID("deletebyElementList").options.length - 1); i >= 0; i--)
		getbyID("deletebyElementList").remove(i);
	for (var i = (getbyID("connectbyElementList").options.length - 1); i >= 0; i--)
		getbyID("connectbyElementList").remove(i);
	for (var i = (getbyID("connectbyElementListone").options.length - 1); i >= 0; i--)
		getbyID("connectbyElementListone").remove(i);
	
	var sortedElement = getElementList(["select"]);

	for (var i = 0; i < sortedElement.length; i++) {
		addOption(getbyID('colourbyElementList'), sortedElement[i],
				sortedElement[i]);
		addOption(getbyID('polybyElementList'), sortedElement[i],
				sortedElement[i]);
		addOption(getbyID("poly2byElementList"), sortedElement[i],
				sortedElement[i]);
		addOption(getbyID("byElementAtomMotion"), sortedElement[i],
				sortedElement[i]);
		addOption(getbyID("deletebyElementList"), sortedElement[i],
				sortedElement[i]);
		addOption(getbyID("connectbyElementList"), sortedElement[i],
				sortedElement[i]);
		addOption(getbyID("connectbyElementListone"), sortedElement[i],
				sortedElement[i]);
	}
}

function formResetAll() {

	setStatus("");
	setUnitCell();
	document.fileGroup.reset();
	document.showGroup.reset();
	document.orientGroup.reset();
	document.measureGroup.reset();
	document.cellGroup.reset();
	document.polyGroup.reset();
	document.isoGroup.reset();
	document.modelsGeom.reset();
	document.modelsVib.reset();
	document.elecGroup.reset();
	document.otherpropGroup.reset();
	document.editGroup.reset();
	// document.HistoryGroup.reset();
	// this disables antialias option BH: NOT - or at least not generally. We need a switch for this
	runJmolScriptWait('antialiasDisplay = true;set hermiteLevel 0');
	resetFreq();
	resetOptimize();
}

function createSlider(name, label) {
	var s = '<div tabIndex="1" class="slider" id="_Slider-div" style="float:left;width:150px;" >'
		+ '<input class="slider-input" id="_Slider-input" name="_Slider-input" />'
	    + '</div>'
	    + (label || "") 
	    + ' <span id="_Msg" class="msgSlider"></span>';
	return s.replace(/_/g, name);
	
}

function createButton(name, text, onclick, disab, style) {
	return createButton1(name, text, onclick, disab, "button", style);
}

//This includes the class
function createButton1(name, text, onclick, disab, myclass, style) {
	var s = "<INPUT TYPE='BUTTON'";
	s += "NAME='" + name + "' ";
	s += "VALUE='" + text + "' ";
	s += "ID='" + name + "' ";
	if (style)
		s += "style='" + style + "'";
	s += "CLASS='" + myclass + "'";
	if (disab) {
		s += "DISABLED "
	}
	s += "OnClick='" + onclick + "'> ";
	return s;
}


function createText(name, text, onclick, disab) {
	var s = "<INPUT TYPE='TEXT'";
	s += "NAME='" + name + "' ";
	s += "VALUE='" + text + "' ";
	s += "ID='" + name + "' ";
	s += "CLASS='text'";
	if (disab) {
		s += "DISABLED "
	}
	s += "OnChange='" + onclick + "'> ";
	return s;
}
function createCheck(name, text, onclick, disab, def, value) {
	var s = "<INPUT TYPE='CHECKBOX' ";
	s += " NAME='" + name + "' ";
	s += " ID='" + name + "' ";
	s += " VALUE='" + value + "' ";
	s += " CLASS='checkbox'";
	if (def) {
		s += " CHECKED "
	}
	if (disab) {
		s += " DISABLED "
	}
	s += "OnClick='" + onclick + "'> ";
	s += text;
	// var i=tabForm.length;
	// tabForm[i]=new formItem();
	// tabForm[i].Id=name;
	// tabForm[i].def=def;
	return s;
}
function createRadio(name, text, onclick, disab, def, id, value) {
	var s = "<INPUT TYPE='RADIO' ";
	s += " NAME='" + name + "' ";
	s += " ID='" + id + "' ";
	s += " VALUE='" + value + "'";
	s += " CLASS='checkbox'";
	if (def) {
		s += " CHECKED "
	}
	if (disab) {
		s += " DISABLED "
	}
	s += "OnClick='" + onclick + "'> ";
	s += text;
	// var i=tabForm.length;
	// tabForm[i]=new formItem();
	// tabForm[i].Id=id;
	// tabForm[i].def=def;
	return s;
}

function createSelect(name, onclick, disab, size, optionValue, optionText, optionCheck, type, onkey) {
	optionText || (optionText = optionValue);
	optionCheck || (optionCheck = [1]);
	if (optionValue.length != optionText.length)
		alert("form.js#createSelect optionValue not same length as optionText: " + name);
	var optionN = optionValue.length
	var s = "<SELECT ";
	s += "NAME='" + name + "' ";
	s += "ID='" + name + "' ";
	s += "SIZE='" + size + "' ";	
	if (disab) {
		s += "DISABLED ";
	}
	s += "OnChange='" + onclick + "' ";
	if (onkey)
		s += "OnKeypress='" + onkey + "' ";
	s += " CLASS='select";
	switch (type) {
	case "menu":
		s += "menu' resizable='yes";
		break;
	case "elem":
		return s + "'><option value=0>select</option></SELECT>";
	case "func":
	default:
		break;
	}
	s += "'>";
	for (var n = 0; n < optionN; n++) {
		s += "<OPTION VALUE='" + optionValue[n] + "'";
		if (optionCheck[n] == 1) {
			s += " selected";
		}
		s += ">";
		s += optionText[n];
		s += "</OPTION>";
	}
	s += "</SELECT>";
	return s;
}

function createSelectFunc(name, onclick, onkey, disab, size, optionValue, optionText, optionCheck) {
	return createSelect(name, onclick, disab, size, optionValue, optionText, optionCheck, "func", onkey);
}

function createSelectmenu(name, onclick, disab, size, optionValue, optionText, optionCheck) {
	return createSelect(name, onclick, disab, size, optionValue, optionText, optionCheck, "menu");
}

function createSelect2(name, onclick, disab, size) {
	return createSelect(name, onclick, disab, size, []);
}

function createSelectKey(name, onclick, onkey, disab, size) {
	return createSelect(name, onclick, disab, size, [], [], [], "key", onkey)
}

function createSelectElement(name, onclick, onkey, disab, size, ) {
	return createSelect(name, onclick, disab, size, [], [], [], "elem", onkey)
}

function createTextArea(name, text, rows, cols, disab) {
	var s = "<TEXTAREA ";
	s += "NAME='" + name + "' ";
	s += "ID='" + name + "' ";
	s += "CLASS='text'";
	if (disab) {
		s += "readonly "
	}
	s += " ROWS=" + rows + " ";
	s += " COLS=" + cols + " >";
	s += text;
	s += "</TEXTAREA> ";
	return s;
}

function createText2(name, text, size, disab) {
	var s = "<INPUT TYPE='TEXT'";
	s += "NAME='" + name + "' ";
	s += "VALUE='" + text + "' ";
	s += "ID='" + name + "' ";
	s += "CLASS='text'";
	if (disab) {
		s += "readonly "
	}
	s += "SIZE=" + size + "> ";
	return s;
}

function createTextSpectrum(name, text, size, disab) {
	var s = "<INPUT TYPE='TEXT'";
	s += "NAME='" + name + "' ";
	s += "VALUE='" + text + "' ";
	s += "ID='" + name + "' ";
	s += "style='background-color:6a86c4;'"
	if (disab) {
		s += "readonly ";
	}
	s += "SIZE=" + size + "> ";
	return s;
}

function createText3(name, text, value, onchange, disab) {
	var s = "<INPUT TYPE='TEXT'";
	s += "NAME='" + name + "' ";
	s += "VALUE='" + text + "' ";
	s += "ID='" + name + "' ";
	s += "CLASS='text'";
	s += "onChange='" + onchange + "'";
	if (disab) {
		s += "readonly "
	}
	s += "> ";
	return s;
}

function createText4(name, text, size, value, onchange, disab) {
	var s = "<INPUT TYPE='TEXT'";
	s += "NAME='" + name + "' ";
	s += "VALUE='" + text + "' ";
	s += "ID='" + name + "' ";
	s += "CLASS='text'";
	s += "SIZE=" + size;
	s += "onChange='" + onchange + "'";
	if (disab) {
		s += "readonly "
	}
	s += "> ";
	return s;
}

function createText5(name, text, size, value, onchange, disab) {
	var s = "<INPUT TYPE='TEXT'";
	s += "NAME='" + name + "' ";
	s += "VALUE='" + text + "' ";
	s += "ID='" + name + "' ";
	s += "CLASS='textwhite'";
	s += "SIZE=" + size;
	s += "onChange='" + onchange + "'";
	if (disab) {
		s += "readonly "
	}
	s += "> ";
	return s;
}

function createDiv(name, style) {
	var s = "<DIV ";
	s += "NAME='" + name + "'";
	s += "ID='" + name + "'";
	s += "STYLE='" + style + "'>";
	return s;
}

function createLine(color, style) {
	var s = "<HR ";
	s += "COLOR='#D8E4F8' "
	s += "STYLE='" + style + "' >";
	return s;
}


function getValue(id) {
	return getbyID(id).value;
}

function setValue(id, val) {
	getbyID(id).value = val;
}

function getValueSel(id) {
	return getbyID(id)[getbyID(id).selectedIndex].value;
}

function isChecked(id) {
	return getbyID(id).checked;
}

function checkBox(id) {
	getbyID(id).checked = true;
}

function uncheckBox(id) {
	getbyID(id).checked = false;
}

function resetValue(form) {
	var element = "document." + form + ".reset";
	return element;
}

function makeDisable(element) {
	// BH 2018
	var d = getbyID(element);
	if (d.type == "text")
		d.readOnly = true;
	else
		d.disabled = true;
}

function makeEnable(element) {
	// BH 2018
	var d = getbyID(element);
	if (d.type == "text")
		d.readOnly = false;
	else
		d.disabled = false;
}


function checkBoxStatus(form, element) {
	if (form.checked == true)
		makeDisable(element);
	if (form.checked == false)
		makeEnable(element);
}

function checkBoxX(form) {
	var value = "";
	var test = getbyID(form);
	value = (test.checked) ? ("on") : ("off");
	return value;
}

function setTextboxValue(nametextbox, valuetextbox) {
	var tbox = getbyID(nametextbox);
	tbox.value = "";
	if (tbox)
		tbox.value = valuetextbox;
}

function uncheckRadio(radio) {
	var radioId = getbyName(radio);
	for (var i = 0; i < radioId.length; i++)
		radioId[i].checked = false;
}

function toggleDiv(form, me) {
	if (form.checked == true)
		getbyID(me).style.display = "inline";
	if (form.checked == false)
		getbyID(me).style.display = "none";
}

function toggleDivValue(value, me,d) {
	if (d.value == "+") {
		d.value = "\u2212";
		getbyID(me).style.display = "inline";
	} else {
		d.value = "+";
		getbyID(me).style.display = "none";
	}
}

function untoggleDiv(form, me) {
	if (form.checked == true)
		getbyID(me).style.display = "none";
	if (form.checked == false)
		getbyID(me).style.display = "inline";
}

function toggleDivRadioTrans(value, me) {
	if (value == "off") {
		getbyID(me).style.display = "inline";
	} else {
		getbyID(me).style.display = "none";
	}
}

function setJmolFromCheckbox(box, value) {
	runJmolScriptWait(value + " " + !!box.checked);
}

function getbyID(id) {
	return document.getElementById(id);
}

function getbyName(na) {
	return document.getElementsByName(na);
}

function unique(a) {
	//this function removes duplicates
	var r = [];
	var list = "";
	for (var i = 0, n = a.length; i < n; i++) {
		var item = a[i];
		var key = ";" + item + ";";
		if (list.indexOf(key) >= 0)
			continue;
		list += key;
		r.push(item);
	}
	return r;
}

//This is meant to add new element to a list
function addOption(selectbox, text, value) {
	var optn = document.createElement("OPTION");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
}

function cleanList(listname) {
	var d = getbyID(listname)
	if (d)
		for (var i = d.options.length; --i >= 0;)
			d.remove(i);
}




function selectListItem(list, itemToSelect) {
	// Loop through all the items
	for (var i = 0; i < list.options.length; i++) {
		if (list.options[i].value == itemToSelect) {
			// Item is found. Set its selected property, and exit the loop
			list.options[i].selected = true;
			break;
		}
	}

}

//
//function toggleFormObject(status, elements) {
//
//	if (status == "on") {
//		for (var i = 0; i < elements.length; i++)
//			makeEnable(elements[i]);
//	}
//	if (status == "off") {
//		for (var i = 0; i < elements.length; i++)
//			makeDisable(elements[i]);
//	}
//
//}
//


      		
///js// Js/frame.js /////
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
      		
///js// Js/info.js /////
var Info, InfoFreq;

function extractInfoJmol(whatToExtract) {
	return jmolGetPropertyAsArray(whatToExtract);
}

function extractInfoJmolString(whatToExtract) {
	return jmolGetPropertyAsString(whatToExtract);
}

function extractAuxiliaryJmol() {
	Info = extractInfoJmol("auxiliaryInfo.models");
}

function getElementList(arr) {
	// BH 2018 using element.pivot.keys for easy array creation
	arr || (arr = []);
	var elements = Jmol.evaluateVar(jmolApplet0,"{*}.element.pivot.keys");
	for (var i = 0; i < elements.length; i++)
		arr.push(elements[i]);
	return arr;
}

function getInfoFreq() {
	InfoFreq = [];
	for (var i = 0; i < Info.length; i++)
		if (Info[i] && Info[i].modelProperties 
				&& Info[i].modelProperties.PATH == "Frequencies")
			InfoFreq.push(Info[i]);	
}

      		
///js// Js/menu.js /////
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


      		
///js// Js/pick.js /////
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

      		
///js// Js/plotgraph.js /////
/* J-ICE 0.1 script library Piero Canepa 

    based on: http://chemapps.stolaf.edu/jmol/docs/examples-11/flot/ Bob Hanson
 *
 * Copyright (C) 2010-2014  Pieremanuele Canepa http://j-ice.sourceforge.net/
 *
 * Contact: pc229@kent.ac.uk
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



//var appletPrintable = (navigator.appName != "Netscape"); // Sorry, I don't
////know how to check
////for this
//
////This has changed
//function $() {
//	// document ready function
//	if (!appletPrintable)$("#appletdiv").addClass("noprint"); 
//}


var iamready = false;

var itemEnergy
var previousPoint = null
var itemForce
var previousPointForce = null
var itemFreq
var previousPointFreq = null

var theplot; // global, mostly for testing.

var haveGraphSpectra, haveGraphOptimize;

function resetGraphs() {
	haveGraphSpectra = false;
	haveGraphOptimize = false;
}
function plotEnergies(){
	var modelCount = Info.length;
	if (haveGraphOptimize || modelCount < 3)
		return false;
	haveGraphOptimize = true;
	var data = [];
	var A = [];
	var nplots = 1;
	var stringa = Info[3].name;
	var f = null;
	var pattern = null;
	if(flagCrystal){
		if(stringa.search(/Energy/i) < 0)
			return false;
		f = substringEnergyToFloat;
	} else if (flagDmol){
		if(stringa.search(/E/i) < 0) 
			return false;
		f = substringEnergyToFloat;
	} else if (flagOutcar){
		pattern = new RegExp("G =", "i");
		f = substringEnergyVaspToFloat;
	}else if (flagQuantumEspresso) { 
		pattern = new RegExp("E =", "i");
		f = substringEnergyQuantumToFloat;
	} else if (flagGulp) { 
		pattern = new RegExp("E =", "i");
		f = substringEnergyGulpToFloat;
	} else if (flagGaussian){
		// special case
	} else {
		f = substringEnergyVaspToFloat;
	}
	var energy = 0;
	var label = "";
	var previous = 0;
	var last = modelCount - 1;
	if (f) {
		// not Gaussian
		for (var i = 0; i < last; i++) {
			var name = Info[i].name;
			if (!name || pattern && !pattern.exec(name) || name.search(/cm/i) >= 0)
				continue;
			var modelnumber = 0+ Info[i].modelNumber;
			if(i > 0)
				previous = i - 1;
			var e = f(name);
//			if(i == 0 || Info[i - 1].name == null) {
				energy = Math.abs(e - f(Info[last].name));
//			} else if (previous > 0 && e != f(Info[i - 1].name)) {
//				energy = Math.abs(e - f(Info[i - 1].name));
//			}
			label = 'Model = ' + modelnumber + ', &#916 E = ' + energy + ' kJmol^-1';
			A.push([i+1,energy,modelnumber,label]);
		}
	} else {
		// Gaussian
		last = energyGauss.length;
		for (var i = 1; i < last; i++) {
			var name = energyGauss[i];
			if (!name || pattern && !pattern.exec(name) || name.search(/cm/i) >= 0)
				continue;
			var modelnumber = energyGauss.length - 1;// BH ??? reall??? next-to-last model?		
			if(i > 0 && i < Info.length)
				var previous = i - 1;
			var e = fromHartreetokJ(name);
			var e1;
//			if(i == 0 || (e1 = energyGauss[i - 1]) == null) {
				energy = Math.abs(e - fromHartreetokJ(energyGauss[last]));
//			} else if (previous > 0) {
//				if (e != e1)
//					energy = Math.abs(e - e1);
//			}
			label = 'Model = ' + modelnumber + ', &#916 E = ' + energy + ' kJmol^-1';
			A.push([i+1,energy,modelnumber,label]);
		}
	}
	data.push(A)
	var options = {
		lines: { show: true },
		points: {show: true, fill: true},
		xaxis: { ticks: 8, tickDecimals: 0 },
		yaxis: { ticks: 6,tickDecimals: 1 },
		selection: { mode: (nplots == 1 ? "x" : "xy"), hoverMode: (nplots == 1 ? "x" : "xy") },
		grid: { hoverable: true, clickable: true, hoverDelay: 10, hoverDelayDefault: 10 }
	}
	theplot = $.plot($('#plotarea'), data, options);
	previousPoint = null
	$("#plotarea").unbind("plothover plotclick", null);
	$("#plotarea").bind("plothover", plotHoverCallback);
	$("#plotarea").bind("plotclick", plotClickCallback);
	itemEnergy = {datapoint:A[0]}
	iamready = true;
	setTimeout('plotClickCallback(null,null,itemEnergy)',100);

	//function plotGradient(){

	var data = [];
    var A = [];
    var nplots = 1;
    var modelCount = Info.length;
    var stringa = Info[3].name;

	if(!flagCrystal)
		return;
	var maxGra;
	if(stringa.search(/Energy/i) != -1){
		last = modelCount - 1;
		for (var i = 0; i < last; i++) {
			var name = Info[i].name;
			if (name == null)
				continue;
			var modelnumber = 0 + Info[i].modelNumber;
			// first gradient will be for model 1
			// This is if is to check if we are dealing with an optimization
			// or
			// a
			// frequency calculation
			if (!name || pattern && !pattern.exec(name) || name.search(/cm/i) >= 0)
				continue;
				maxGra = parseFloat(Info[i].modelProperties.maxGradient);
//			else if(name && previous > 0) {
//				if (substringEnergyToFloat(Info[i].name) != substringEnergyToFloat(Info[i - 1].name))
//					maxGra = parseFloat(Info[i].modelProperties.maxGradient);
//			}
			if (isNaN(maxGra))
				continue;
			var label = 'Model = ' + modelnumber + ', ForceMAX = ' + maxGra;
			A.push([i+1,maxGra,modelnumber,label]);
		}
	}	
	data.push(A);
	var options = {
		lines: { show: true },
		points: {show: true, fill: true},
		xaxis: { ticks: 8, tickDecimals: 0 },
		yaxis: { ticks: 6,tickDecimals: 5 },
		selection: { mode: (nplots == 1 ? "x" : "xy"), hoverMode: (nplots == 1 ? "x" : "xy") },
		grid: { hoverable: true, clickable: true, hoverDelay: 10, hoverDelayDefault: 10 }
		// hoverMode, hoverDelay, and hoverDelayDefault are not in the original
		// Flot package
	}
	theplot = $.plot($("#plotarea1"), data, options);
	previousPointForce = null
	$("#plotarea1").unbind("plothover plotclick", null);
	$("#plotarea1").bind("plothover", plotHoverCallbackforce);
	$("#plotarea1").bind("plotclick", plotClickCallbackForce);
	itemForce = { datapoint:A[0] };
	iamready = true;
	setTimeout('plotClickCallbackForce(null,null,itemForce)',100);
}

var nullValues;

function plotFrequencies(forceNew){
	if (haveGraphSpectra && !forceNew)
		return;
	if (!flagCrystal && !flagOutcar && !flagGaussian)
		return;
	haveGraphSpectra = true;
	var data = [];
	var data2 =[];
	var A = [];
	var B = [];
	var nplots = 1;
	var modelCount = Info.length;
	var irFreq, irInt, freqValue, ramanFreq, ramanInt, isRaman;
	var labelIR, labelRaman, modelNumber;
	
	var stringa = Info[4].name;
	
	if(flagCrystal){
		if(counterFreq != 0){
			stringa = Info[counterFreq + 1].name;
			if (stringa == null)
				stringa = Info[counterFreq + 2].name;
		}
		if(stringa.search(/Energy/i) < 0){
			nullValues = countNullModel(Info);
			for (var i = (counterFreq == 0 ? 0 : counterFreq + 1); i < modelCount; i++) {
				modelnumber = Info[i].modelNumber - nullValues -1;
				if (Info[i].name == null)
					continue;
				freqValue = substringFreqToFloat(Info[i].modelProperties.Frequency);
				intValue = substringIntFreqToFloat(Info[i].modelProperties.IRintensity);
				isRaman = (intValue == 0);
 				if(!isRaman){
					irFreq = freqValue;
					irInt = intValue;
					isRaman = (Info[i].modelProperties.Ramanactivity == "A");
					labelIR = 'Model = Frequency ' +   irFreq  + ', Intensity = ' + irInt + ' kmMol^-1';
					A.push([irFreq,irInt,modelnumber,labelIR]);
 				}
 				if (isRaman) {
					ramanFreq =  freqValue;
					ramanInt = [100];
					labelRaman = 'Model = Frequency ' +   ramanFreq  + ', Intensity = ' + ramanInt + ' kmMol^-1';
					B.push([ramanFreq,ramanInt,modelnumber,labelRaman]);
				}
			}			
		}
	} else if (flagOutcar) {
		stringa = Info[4].name
		if(counterFreq != 0){
			stringa = Info[counterFreq + 1].name;
			if (stringa == null)
				stringa = Info[counterFreq + 2].name;
		}
		if(stringa.search(/G =/i) == -1){
			nullValues = countNullModel(Info);
		}
		for (var i = 0; i < freqData.length; i++) {
			if(Info[i].name != null){
				irFreq = substringFreqToFloat(freqData[i]);
				irInt = [0.00];
				modelnumber = Info[i].modelNumber + counterFreq  - nullValues -1 
				labelIR = 'Model = Frequency ' +   irFreq  + ', Intensity = ' + irInt + ' kmMol^-1';
				A.push([irFreq,irInt,modelnumber,labelIR]);
			}
		}
	} else if (flagGaussian){
		for (var i = 0; i < freqGauss.length; i++) {
			if(Info[i].name != null){
				irFreq = substringFreqToFloat(freqGauss[i]);
				irInt = substringIntGaussToFloat(freqIntensGauss[i]);
				modelnumber = counterGauss + i; 
				labelIR = 'Model = Frequency ' +   irFreq  + ', Intensity = ' + irInt + ' kmMol^-1';
				A.push([irFreq,irInt,modelnumber,labelIR]);
			}
		}
	}

	// data.push(A)
	// data.push(B)
	
	var minY = 999999;
	var maxY = 0;
	for (var i = 0; i < A.length; i++) {
		if (A[i][1] > maxY)
			maxY = A[i][1];
		if (A[i][1] < minY)
			minY = A[i][1];
	}
	for (var i = 0; i < B.length; i++) {
		if (B[i][1] > maxY)
			maxY = B[i][1];	
		if (B[i][1] < minY)
			minY = B[i][1];
	}
	if (minY == maxY)
		maxY = (maxY == 0 ? 100 : maxY * 2);
	var options = {
			lines: { show: false },
			points: {show: true, fill: true},
			xaxis: { ticks: 8, tickDecimals: 0 },
			yaxis: { ticks: 6,tickDecimals: 0, max:maxY },
			selection: { mode: (nplots == 1 ? "x" : "xy"), hoverMode: (nplots == 1 ? "x" : "xy") },
			grid: { 
				hoverable: true, 
				clickable: true, 
				hoverDelay: 10, 
				hoverDelayDefault: 10
			}
	}

	if (flagCrystal) {
		theplot = $.plot($("#plotareafreq"), [{label:"IR", data: A}, {label:"Raman", data: B}] , options)
	} else {
		theplot = $.plot($("#plotareafreq"), [{label:"IR-Raman", data: A}], options)
	}

	previousPointFreq = null;

	$("#plotareafreq").unbind("plothover plotclick", null)
	$("#plotareafreq").bind("plothover", plotHoverCallbackFreq);
	$("#plotareafreq").bind("plotclick", plotClickCallbackFreq);
	itemFreq = {datapoint: A[0] || B[0]}
	setTimeout('plotClickCallbackFreq(null,null,itemFreq)',100);
	iamready = true;
}

function plotClickCallback(event, pos, itemEnergy) {

	if (!itemEnergy)
		return
	var model = itemEnergy.datapoint[2];
	var label = itemEnergy.datapoint[3];
	runJmolScriptWait('model '+ model);
	// This select the element from the list of the geometry models
	// +1 keeps the right numeration of models
	getbyID('geom').value = model + 1;

}

function plotClickCallbackForce(event, pos, itemForce) {
	if (!itemForce)return
	var model = itemForce.datapoint[2];
	var label = itemForce.datapoint[3];
	runJmolScriptWait('model '+model);
	// This select the element from the list of the geometry models
	// +1 keeps the right numeration of models
	getbyID('geom').value = model + 1;

}

function plotClickCallbackFreq(event, pos, itemFreq) {
	if (!itemFreq) return
	var model = itemFreq.datapoint[2];
	var label = itemFreq.datapoint[3];
	var vibrationProp = 'vibration on; ' +  getValue("vecscale") + '; '+ getValue("vectors") + ';  '+ getValue("vecsamplitude"); 
	if (flagCrystal){
		var script = ' model '+ (model + nullValues ) +  '; ' + vibrationProp;  // 'set
		if(counterFreq != 0)
			var script = ' model '+ (model + nullValues +1 ) +  '; ' + vibrationProp;  // 'set
	}else{
		var script = ' model '+ ( model + 1 ) +  '; ' + vibrationProp;  // 'set
	}
	runJmolScriptWait(script);
	setVibrationOn(true);
	// This select the element from the list of the geometry models
	// +1 keeps the right numeration of models
	if(counterFreq != 0 && flagCrystal){
		getbyID('vib').value = model + counterFreq - nullValues ;
	}else {
		getbyID('vib').value = model + 1;
	}

}

function plotHoverCallback(event, pos, itemEnergy) {
	hideTooltip();
	if(!itemEnergy)return
	if (previousPoint != itemEnergy.datapoint) {
		previousPoint = itemEnergy.datapoint ;
		var y = roundoff(itemEnergy.datapoint[1],4);
		var model = itemEnergy.datapoint[2];
		var label = "&nbsp;&nbsp;Model "+ model + ", &#916 E = " + y +" kJmol^-1";
		showTooltipEnergy(itemEnergy.pageX, itemEnergy.pageY + 10, label, pos)
	}
	if (pos.canvasY > 350)plotClickCallback(event, pos, itemEnergy);
}


function plotHoverCallbackforce(event, pos, itemForce) {
	hideTooltip();
	if(!itemForce)return
	if (previousPointForce != itemForce.datapoint) {
		previousPointForce = itemForce.datapoint;
		var y = roundoff(itemForce.datapoint[1],6);
		var model = itemForce.datapoint[2];
		var label = "&nbsp;&nbsp;Model "+ model + ", MAX Force = " + y;
		showTooltipForce(itemForce.pageX, itemForce.pageY + 10, label, pos);
	}
	if (pos.canvasY > 350)plotClickCallback(event, pos, itemForce);
}

function plotHoverCallbackFreq(event, pos, itemFreq) {
	hideTooltip();
	if(!itemFreq)return
	if (previousPointFreq != itemFreq.datapoint) {
		previousPointFreq = itemFreq.datapoint ;
		var x = roundoff(itemFreq.datapoint[0],2);
		var y = roundoff(itemFreq.datapoint[1],1);
		var model = itemFreq.datapoint[2];
		var n = model;
		if (flagCrystal)
		  n += nullValues + (counterFreq == 0 ? 3 : 1 - counterFreq);
		var label = "&nbsp;&nbsp;Model "+ n  + ", Freq (cm^-1) " + x + ", Int. (kmMol^-1) " + y;
		showTooltipFreq(itemFreq.pageX, itemFreq.pageY + 10, label, pos);
	}
	if (pos.canvasY > 350)plotClickCallbackFreq(event, pos, itemFreq);
}

function hideTooltip() {
	$("#tooltip").remove();
}

function showTooltipEnergy(x, y, contents, pos) {

	if (pos.canvasY > 340) y += (340 - pos.canvasY)
	$('<div id="tooltip">' + contents + '</div>').css( {
		position: 'absolute',
		display: 'none',
		top: y + 5,
		left: x + 5,
		border: '1px solid #fdd',
		padding: '2px',
		'background-color': '#6a86c4',
		'color': '#FFFFCC',
		'font-weight': 'bold',
		opacity: 0.80
	}).appendTo("body").fadeIn(200);

}

function showTooltipForce(x, y, contents, pos) {
	if (pos.canvasY > 340) y += (340 - pos.canvasY);
	$('<div id="tooltip">' + contents + '</div>').css( {
		position: 'absolute',
		display: 'none',
		top: y + 5,
		left: x + 5,
		border: '1px solid #fdd',
		padding: '2px',
		'background-color': '#6a86c4',
		'color': '#FFFFCC',
		'font-weight': 'bold',
		opacity: 0.80
	}).appendTo("body").fadeIn(200);

}

function showTooltipFreq(x, y, contents, pos) {
	if (pos.canvasY > 340) y += (340 - pos.canvasY);
	$('<div id="tooltip">' + contents + '</div>').css( 
	{
		position: 'absolute',
		display: 'none',
		top: y + 5,
		left: x + 5,
		border: '1px solid #fdd',
		padding: '2px',
		'background-color': '#6a86c4',
		'color': '#FFFFCC',
		'font-weight': 'bold',
		opacity: 0.80}
	).appendTo("body").fadeIn(200);

}

//function jmolLoadStructCallback() {
//	alert("calling plotgraph#jmolLoadStructCallback??")
//	setTimeout('doPlot()');
//}

//code that fakes an applet print by creating an image in its place! :)

//function setImage() {
//	if (appletPrintable)return
//	var image = jmolGetPropertyAsString("image")
//	var html = '<img src="data:image/jpeg;base64,'+image+'" />'
//	getbyID("imagediv").innerHTML = html
//}

//function doHighlight(app, modelIndex) {
//	if (!iamready)return;
//	theplot.unhighlight(0,-1)
//	theplot.highlight(0, modelIndex);
//	var label = data[0][modelIndex][3];
//    setTimeout('runJmolScript("set echo top left; echo ' + label+'")',100);
//}


//function doPrintAll() {
//	setImage()
//	window.print()
//}

function countNullModel(arrayX) {
	var valueNullelement = 0;
	for (var i = 0; i < arrayX.length; i++) {
		if (arrayX[i].name == null || arrayX[i].name == "")
			valueNullelement = valueNullelement + 1;
	}
	return valueNullelement;
}




//for spectrum.html

function plotSpectrumHTML() {
	var Min = parseInt(opener.getValue("nMin")); 
	var Max = parseInt(opener.getValue("nMax"));
	setValue("minValue", Min);
	setValue("maxValue", Max); 
	var intArray= opener.intTot;
	var dataSpectrum = [];
	var spectrum =[];
	
	var options ={
	   series:{
		      lines: { show: true, fill: false }
	   },
	   xaxis: { ticks: 10, tickDecimals: 0 },
	   yaxis: { ticks: 0,tickDecimals: 0 },
	   grid: { hoverable: true, autoHighlight: false},
	   //crosshair: { mode: "x" }
	};
	var numberPlots = 1; //old plot
	var plot = null; 
	dataSpectrum = [];
	spectrum = [];
	var legends = $("#plotSpectrum .legendLabel");
	 legends.each(function () {
	    // fix the widths so they don't jump around
	     $(this).css('width', $(this).width());});
	
	for(var i=Min; i < Max; i++){
	 spectrum.push([i,intArray[i]]);
	}
	//dataSpectrum.push(spectrum);
	plot = $.plot($('#plotSpectrum'), [{label:"Spectrum", data:  spectrum }], options);
	
	var updateLegendTimeout = null;
	var latestPosition = null; 
	 $("#plotSpectrum").bind("plothover",  function (event, pos, item) {
	     latestPosition = pos;
	     if (!updateLegendTimeout)
	         updateLegendTimeout = setTimeout(function() { legends.text(latestPosition.x.toFixed(2)); }, 50);
	 });
}    

function replotSpectrumHTML(){
	var Min = parseInt(getValue("minValue"))
	var Max = parseInt(getValue("maxValue"))
	
	var options ={
	   series:{
	   lines: { show: true, fill: false }
	   },
	   xaxis: { min: Min, max : Max, ticks: 10, tickDecimals: 0 },
	   yaxis: { ticks: 0,tickDecimals: 0 },
	   grid: { hoverable: true, autoHighlight: false},
	   //crosshair: { mode: "x" }
	};
	dataSpectrum = [];
	spectrum = [];
	var intArray= opener.intTot;
	for(var i = Min; i < Max ; i++){
	  spectrum.push([i,intArray[i]]);
	}
	plot = $.plot($('#plotSpectrum'),[{label:"Spectrum", data: spectrum }],  options);
}

function writeSpectumHTML(){
  Min = parseInt(getValue("minValue"));
	 Max = parseInt(getValue("maxValue"));
	 var intArray = opener.intTot;
	 var script = 'var testo = "#########################################################\n\
	#J-ICE  spectrum #\n\
	#########################################################\n'
				   for (var i = Min; i < Max ; i++)
	               script += i + " " + intArray[i] + "\n"
	               script += '"; write VAR testo "?.dat"'
	runJmolScriptWait(script);
}

      		
///js// Js/sliders.js /////
/*  J-ICE library 

    based on: A toolkit for publishing enhanced figures; B. McMahon and R. M. Hanson; J. Appl. Cryst. (2008). 41, 811-814
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

function applyBond(angstroms) {
	if (firstTimeBond) {
		runJmolScriptWait("wireframe .2;");
	} else {
		runJmolScriptWait("wireframe " + angstroms + ";");
		getbyID('bondMsg').innerHTML = angstroms.toPrecision(1) + " &#197";
		runJmolScriptWait("save BONDS bondEdit");
	}
}

var defaultFront = 20, defaultBack = 100;

loadSliders = function() {
	bondSlider = new Slider(getbyID("bondSlider-div"), getbyID("bondSlider-input"), "horizontal");
	bondSlider.setMaximum(100);
	bondSlider.setMinimum(0);
	bondSlider.setUnitIncrement(5);
	//amount to increment the value when using the arrow keys
	bondSlider.setValue(15);
	bondSlider.onchange = function() {
		applyBond(bondSlider.getValue() / 100)
	}
	
	radiiSlider = new Slider(getbyID("radiiSlider-div"), getbyID("radiiSlider-input"), "horizontal");
	radiiSlider.setMaximum(100);
	radiiSlider.setMinimum(0);
	radiiSlider.setUnitIncrement(5);
	//amount to increment the value when using the arrow keys
	radiiSlider.setValue(26);
	radiiSlider.onchange = function() {
		applyRadii(radiiSlider.getValue())
	}
	
	radiiConnectSlider = new Slider(getbyID("radiiConnectSlider-div"), getbyID("radiiConnectSlider-input"), "horizontal");
	radiiConnectSlider.setMaximum(100);
	//does not work with values < 1
	radiiConnectSlider.setMinimum(0);
	radiiConnectSlider.setUnitIncrement(1);
	//amount to increment the value when using the arrow keys
	radiiConnectSlider.setValue(80);
	radiiConnectSlider.onchange = function() {
		applyConnect(radiiConnectSlider.getValue() / 20)
	}
	
	transSlider = new Slider(getbyID("transSlider-div"), getbyID("transSlider-input"), "horizontal");
	transSlider.setMaximum(100);
	transSlider.setMinimum(0);
	transSlider.setUnitIncrement(4);
	//amount to increment the value when using the arrow keys
	transSlider.setValue(100);
	transSlider.onchange = function() {
		applyTrans(transSlider.getValue())
	}
	
	packSlider = new Slider(getbyID("packSlider-div"), getbyID("packSlider-input"), "horizontal");
	packSlider.setMaximum(100);
	packSlider.setMinimum(0);
	packSlider.setUnitIncrement(0.5);
	//amount to increment the value when using the arrow keys
	packSlider.setValue(1);
	packSlider.onchange = function() {
		applyPack(packSlider.getValue() / 20)
	}
	
	
	cameraDepthSlider = new Slider(getbyID("cameraDepthSlider-div"), getbyID("cameraDepthSlider-input"), "horizontal");
	cameraDepthSlider.setMaximum(100);
	cameraDepthSlider.setMinimum(1);
	cameraDepthSlider.setUnitIncrement(2);
	//amount to increment the value when using the arrow keys
	cameraDepthSlider.setValue(5);
	cameraDepthSlider.onchange = function() {
		applyCameraDepth(cameraDepthSlider.getValue()/25)
	}
	
	SpecularPercentSlider = new Slider(getbyID("SpecularPercentSlider-div"), getbyID("SpecularPercentSlider-input"), "horizontal");
	SpecularPercentSlider.setMaximum(100);
	SpecularPercentSlider.setMinimum(0);
	SpecularPercentSlider.setUnitIncrement(2);
	//amount to increment the value when using the arrow keys
	SpecularPercentSlider.setValue(5);
	SpecularPercentSlider.onchange = function() {
		applySpecularPercent(SpecularPercentSlider.getValue())
	}
	
	AmbientPercentSlider = new Slider(getbyID("AmbientPercentSlider-div"), getbyID("AmbientPercentSlider-input"), "horizontal");
	AmbientPercentSlider.setMaximum(100);
	AmbientPercentSlider.setMinimum(0);
	AmbientPercentSlider.setUnitIncrement(2);
	//amount to increment the value when using the arrow keys
	AmbientPercentSlider.setValue(5);
	AmbientPercentSlider.onchange = function() {
		applyAmbientPercent(AmbientPercentSlider.getValue())
	}
	
	DiffusePercentSlider = new Slider(getbyID("DiffusePercentSlider-div"), getbyID("DiffusePercentSlider-input"), "horizontal");
	DiffusePercentSlider.setMaximum(100);
	DiffusePercentSlider.setMinimum(0);
	DiffusePercentSlider.setUnitIncrement(2);
	//amount to increment the value when using the arrow keys
	DiffusePercentSlider.setValue(5);
	DiffusePercentSlider.onchange = function() {
		applyDiffusePercent(DiffusePercentSlider.getValue())
	}
	
	slabSlider = new Slider(getbyID("slabSlider-div"), getbyID("slabSlider-input"), "horizontal");
	slabSlider.setMaximum(100)
	slabSlider.setMinimum(0)
	slabSlider.setUnitIncrement(2) 
	// amount to increment the value when using the
	// arrow keys
	slabSlider.setValue(defaultFront)
	slabSlider.onchange = function() {
		applySlab(slabSlider.getValue())
	}
	
	depthSlider = new Slider(getbyID("depthSlider-div"), getbyID("depthSlider-input"), "horizontal");
	depthSlider.setMaximum(100);
	depthSlider.setMinimum(0);
	depthSlider.setUnitIncrement(2); // amount to increment the value when using
	// the arrow keys
	depthSlider.setValue(defaultBack);
	depthSlider.onchange = function() { // onchange MUST BE all lowercase
		applyDepth(depthSlider.getValue())
	}
}

      		
///js// Js/symmetry.js /////
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
      		
///js// Js/uff.js /////
/*  J-ICE library 
 *
 *   based on:
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

//////////Following functions control the structural optimization of a structure using the embedded uff of Jmol
var counterUff = 0
function minimizeStructure() {
	var optCriterion = parseFloat(getValue("optciteria"));
	var optSteps = parseInt(getValue("maxsteps"));
	var form = getbyID("fixstructureUff");
	// alert(optCriterion + " " + optSteps)

	if (!optCriterion) {
		warningMsg("Please set the Opt. threshold. This must be not lower than 0.0001. ");
		return false;
	} else if (!optSteps) {
		warningMsg("Please set the Max No. of steps.");
		return false;
	} else if (!form.checked) {
		counterUff = 0;
		setMinimizationCallbackFunction(scriptUffCallback);
		runJmolScript("set debugscript on ;set logLevel 5;set minimizationCriterion " + optCriterion + "; minimize STEPS "
				+ optSteps + "; set minimizationRefresh TRUE;  minimize;");
	} else if (form.checked) {
		counterUff = 0;
		setMinimizationCallbackFunction(scriptUffCallback);
		runJmolScript("set debugscript on ;set logLevel 5;set minimizationCriterion " + optCriterion + "; minimize STEPS "
				+ optSteps
				+ "; set minimizationRefresh TRUE;  minimize FIX {selected};");
	}
}

function fixFragmentUff(form) {
	if (form.checked) {
		messageMsg("Now select the fragment you would like to optimize by the following options");
		//fragmentSelect
	} else {

	}
}

function stopOptimize() {
	runJmolScriptWait('minimize STOP;');
}

function resetOptimize() {
	runJmolScriptWait('minimize STOP;');
	setValue("optciteria", "0.001");
	setValue("maxsteps", "100");
	setValue("textUff", "");
}

function scriptUffCallback(b, step, d, e, f, g) {
	var text = ("s = " + counterUff + " E = " + parseFloat(d).toPrecision(10)
			+ " kJ/mol, dE = " + parseFloat(e).toPrecision(6) + " kJ/mol")
	getbyID("textUff").value = text
	counterUff++;
}
      		
///js// Js/windows.js /////
var windowoptions = "menubar=yes,resizable=1,scrollbars,alwaysRaised,width=600,height=600,left=50";
function newAppletWindow() {
	var sm = "" + Math.random();
	sm = sm.substring(2, 10);
	var newwin = open("OutputResized.html", "jmol_" + sm, windowoptions);
}

var windowfreq = "menubar=no,resizable=no,scrollbars=yes,resizable=yes;alwaysRaised,width=1024,height=768";
function newAppletWindowFreq() {
	var sm = "" + Math.random();
	sm = sm.substring(2, 10);
	var newwin = open("exportfreq.html", sm, windowfreq);
}

function onClickAcknow() {
	var woption = "menubar=no, toolbar=no scrollbar=no, status=no, resizable=no, alwaysRaised,width=360, height=200, top=10, left=10,";
	var sm = "" + Math.random();
	sm = sm.substring(2, 10);
	var newwin = open("acn.html", sm, woption);
}

var windowfeed = "menubar=no,resizable=no,scrollbars=yes,resizable=yes;alwaysRaised,width=1024,height=768";
function newAppletWindowFeed() {
	var sm = "" + Math.random();
	sm = sm.substring(2, 10);
	var newwin = open("http://j-ice.sourceforge.net/?page_id=9", sm, windowfeed);
}
      		
///js// Js/adapters/castep.js /////
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

//CASTEP Js.
/*! Al metal in non-primitive FCC Unit cell

 %block LATTICE_CART ! In Angstroms
 4.0495 0.0    0.00
 0.00   4.0495 0.00
 0.00   0.00   4.0495
 %endblock LATTICE_CART
 %block POSITIONS_FRAC
 Al  0.0000000000    0.0000000000    0.0000000000
 Al  0.0000000000    0.5000000000    0.5000000000
 Al  0.5000000000    0.5000000000    0.0000000000
 Al  0.5000000000    0.0000000000    0.5000000000
 %endblock POSITIONS_FRAC
 kpoints_mp_grid 4 4 4
 fix_all_ions true
 fix_all_cell true
 %BLOCK SPECIES_POT
 %ENDBLOCK SPECIES_POT
 */

var positionCastep = null;

function exportCASTEP() {
	warningMsg("Make sure you have selected the model you would like to export.");
	setUnitCell();
	saveStateAndOrientation_a();
	var lattice = fromfractionaltoCartesian();
	setVacuum();
	switch (typeSystem) {
	case "slab":
		runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z/'
				+ roundNumber(cCell) + ')');
		break;
	case "polymer":
		runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z/'
				+ roundNumber(cCell) + ')');
		runJmolScriptWait(frameSelection + '.y = for(i;' + frameSelection + '; i.y/'
				+ roundNumber(bCell) + ')');
		break;
	case "molecule":
		runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z/'
				+ roundNumber(cCell) + ')');
		runJmolScriptWait(frameSelection + '.y = for(i;' + frameSelection + '; i.y/'
				+ roundNumber(bCell) + ')');
		runJmolScriptWait(frameSelection + '.x = for(i;' + frameSelection + '; i.x/'
				+ roundNumber(aCell) + ')');
		break;
	}

	prepareLatticeblockcastep(lattice);
	prepareCoordinateblockCastep();
	restoreStateAndOrientation_a();

	var finalInputCastep = 'var final = [latticeCastep, positionCastep].replace("\n\n","\n");'
			+ 'WRITE VAR final "?.cell"';
	runJmolScript(finalInputCastep);
}

function prepareLatticeblockcastep(lattice) {
	var cellCastep = "var latticeHeader = '\%block LATTICE_CART';"
			+ "var latticeOne = [" + lattice[0] +"].join(' ');"
			+ "var latticeTwo = [" + lattice[1] + "].join(' ');"
			+ "var latticeThree = [" + lattice[2] + "].join(' ');"
			+ "var latticeClose = '\%endblock LATTICE_CART';"
			+ "latticeCastep = [latticeHeader, latticeOne, latticeTwo,latticeThree, latticeClose];"
	runJmolScriptWait(cellCastep);
}

// /Frac coordinates
function prepareCoordinateblockCastep() {
	positionCastep = "var positionHeader = '\%block POSITIONS_FRAC';"
			+ 'var xyzCoord = ' + frameSelection + '.label("%e %16.9[fxyz]");'
			+ 'xyzCoord = xyzCoord.replace("\n\n","\n");'
			+ "var positionClose = '\%endblock POSITIONS_FRAC';"
			+ "positionCastep = [positionHeader, xyzCoord, positionClose];"
			+ 'positionCastep = positionCastep.replace("\n\n","\n");'
	runJmolScriptWait(positionCastep);
}

// /// FUNCTION LOAD

castepDone = function() {
	loadDone(loadModelsCastep);
}

function loadModelsCastep() {
	var counterFreq = 0;
	var counterMD = 0;
	//cleanAndReloadForm();
	getUnitcell("1");
	setFrameValues("1");

	for (i = 0; i < Info.length; i++) {
		if (Info[i].name != null) {
			var line = Info[i].name;
			// alert(line)
			if (line.search(/Energy =/i) != -1) {
				addOption(getbyID('geom'), i + " " + line, i + 1);
				geomData[i] = line;
				counterFreq++;
			} else if (line.search(/cm-1/i) != -1) {
				freqData[i - counterFreq] = line;
				counterMD++;
			}
		}
	}

	if (freqData != null) {
		var vib = getbyID('vib');
		for (i = 1; i < freqData.length; i++) {
			if (freqData[i] != null)
				var data = parseFloat(freqData[i].substring(0, freqData[i]
						.indexOf("c") - 1));
			addOption(vib, i + " A " + data + " cm^-1", i
					+ counterFreq + 1);
		}
	}
	disableFreqOpts();
	getSymInfo();
}

// ///////LOAD FUNCTIONS

function disableFreqOpts() {
	for (var i = 0; i < document.modelsVib.modAct.length; i++)
		document.modelsVib.modAct[i].disabled = true;
	for (var i = 0; i < document.modelsVib.kindspectra.length; i++)
		document.modelsVib.kindspectra[i].disabled = true;

	// getbyID("modAct").enable = false;
	// makeDisable("modAct");
	// makeDisable("vibSym");
	// makeDisable("reload");
}

function enableFreqOpts() {
	for (var i = 0; i < document.modelsVib.modAct.length; i++)
		document.modelsVib.modAct[i].disabled = false;
	for (var i = 0; i < document.modelsVib.kindspectra.length; i++)
		document.modelsVib.kindspectra[i].disabled = false;

}

// /// COVERT FUNCTION

function substringEnergyCastepToFloat(value) {
	if (value != null) {
		var grab = parseFloat(
				value.substring(value.indexOf('=') + 1, value.indexOf('e') - 1))
				.toPrecision(8); // Enthaply = -26.45132096 eV
		grab = grab * 96.485; // constant from
		// http://web.utk.edu/~rcompton/constants
		grab = Math.round(grab * 100000000) / 100000000;
		//alert(grab)
	}
	return grab;
}

/////END FUNCTIONS
      		
///js// Js/adapters/crystal.js /////
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

      		
///js// Js/adapters/dmol.js /////
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

//3rd-Sept-2010 CANEPA

dmolDone = function() {
	loadDone(loadModelsDmol);
}

var counterFreq = 0;
function loadModelsDmol() {
	//cleanAndReloadForm();
	getUnitcell("1");
	setFrameValues("1");
	var counterMD = 0;
	counterFreq = 0;
	for (i = 0; i < Info.length; i++) {
		if (Info[i].name != null) {
			var line = Info[i].name;
			// alert(line)
			if (line.search(/E =/i) != -1) {
				// alert("geometry")
				addOption(getbyID('geom'), i + " " + line, i + 1);
				geomData[i] = line;
				counterFreq++;
			} else if (line.search(/cm/i) != -1) {
				freqData[i - counterFreq] = line;
				counterMD++;
			}
		}
	}

	if (freqData != null) {
		var vib = getbyID('vib');
		for (i = 1; i < freqData.length; i++) {
			if (freqData[i] != null)
				var data = parseFloat(freqData[i].substring(0, freqData[i]
						.indexOf("c") - 1));
			addOption(vib, i + " A " + data + " cm^-1", i
					+ counterFreq + 1);
		}
	}
	// These are in the vaspfunctions.js
	disableFreqOpts();
	getSymInfo();
}
      		
///js// Js/adapters/gaussian.js /////
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

gaussianDone = function() {
	loadDone(loadModelsGaussian);
}

var geomGauss = new Array;
var freqSymmGauss = new Array;
var freqIntensGauss = new Array;
var freqGauss = new Array;
var energyGauss = new Array;
var counterGauss = 0;

function loadModelsGaussian() {
	warningMsg("This is a molecular reader. Therefore not all properties will be available.")
	// Reset program and set filename if available
	// This also extract the auxiliary info
	initializeJiceGauss();
	var geom = getbyID('geom');
	var vib = getbyID('vib');
	for (i = 0; i < Info.length; i++) {
		if (Info[i].name != null) {
			var line = Info[i].name;
			// alert(line)
			if (line.search(/E/i) != -1) {
				// alert("geometry")
				addOption(geom, i + " " + Info[i].name, i + 1);
				geomGauss[i] = Info[i].name;
				if (Info[i].modelProperties.Energy != null
						|| Info[i].modelProperties.Energy != "")
					energyGauss[i] = Info[i].modelProperties.Energy;
				//alert(energyGauss[i])
				counterGauss++;
			} else if (line.search(/cm/i) != -1) {
				// alert("vibration")
				addOption(vib, i + " " + Info[i].name + " ("
						+ Info[i].modelProperties.IRIntensity + ")", i);
				freqGauss[i - counterGauss] = Info[i].modelProperties.Frequency;
				freqSymmGauss[i - counterGauss] = Info[i].modelProperties.FrequencyLabel;
				freqIntensGauss[i - counterGauss] = Info[i].modelProperties.IRIntensity;
			}
		}
	}
}

function initializeJiceGauss() {
	setTitleEcho();
	setFrameValues("1");
	cleanArrayGauss();
	disableFreqOpts();
}

function cleanArrayGauss() {
	geomGauss = [];
	freqSymmGauss = [];
	freqIntensGauss = [];
	counterGauss = 0;
}

function symmetryModeAdd_gaussian() {
	// this method is called using self["symmetryModeAdd_" + type]
	var sym = getbyID('sym');
	var sortedSymm = unique(freqSymmGauss);
	for (var i = 0; i < freqSymmGauss.length; i++) {
		if (sortedSymm[i] != null)
			addOption(sym, freqSymmGauss[i], freqSymmGauss[i])
	}
}

function changeIrepGauss(irep) {
	var vib = getbyID('vib');
	for (var i = 0; i < freqGauss.length; i++) {
		var value = freqSymmGauss[i];
		if (irep == value)
			addOption(vib, i + " " + freqSymmGauss[i] + " "
					+ freqGauss[i] + " (" + freqIntensGauss[i] + ")", i
					+ counterGauss + 1);
	}
}

      		
///js// Js/adapters/gromacs.js /////
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

var coordinateGromacs = null;

function exportGromacs() {
	warningMsg("Make sure you have selected the model you would like to export.");
	setTitleGromacs();
	setUnitCell();
	runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z/10);'
		+ frameSelection + '.y = for(i;' + frameSelection + '; i.y/10);'
		+ frameSelection + '.x = for(i;' + frameSelection + '; i.x/10);');
	setCoordinatesGromacs();
	runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z*10);'
			+ frameSelection + '.y = for(i;' + frameSelection + '; i.y*10);'
			+ frameSelection + '.x = for(i;' + frameSelection + '; i.x*10);');
	var finalInputGromacs = "var final = [titleg,coordinate];"
			+ 'final = final.replace("\n\n","");' + 'WRITE VAR final "?.gro" ';
	runJmolScriptWait(finalInputGromacs);
}

function setTitleGromacs() {
	var titleGromacs = prompt("Type here the job title:", "");
	(titleGromacs == "") ? (titleGromacs = 'Input prepared with J-ICE ')
			: (titleGromacs = 'Input prepared with J-ICE ' + titleGromacs);
	titleGromacs = 'titleg = \"' + titleGromacs + '\"; ';
	runJmolScriptWait(titleGromacs);
}

function setCoordinatesGromacs() {
	var numatomsGrom = " " + frameSelection + ".length";
	var coordinateGrom = frameSelection
			+ '.label("  %i%e %i %e %8.3[xyz] %8.4fy %8.4fz")';
	var cellbox = +roundNumber(aCell) * (cosRadiant(alpha)) + ' '
			+ roundNumber(bCell) * (cosRadiant(beta)) + ' '
			+ roundNumber(cCell) * (cosRadiant(gamma));
	coordinateGromacs = 'var numatomGrom = ' + ' ' + numatomsGrom + ';'
			+ 'var coordGrom = ' + coordinateGrom + ';'
			+ 'var cellGrom = \" \n\t' + cellbox + '\"; '
			+ 'coordinate = [numatomGrom,coordGrom,cellGrom];';
	runJmolScriptWait(coordinateGromacs);
}
      		
///js// Js/adapters/gulp.js /////
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
      		
///js// Js/adapters/molden.js /////
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

moldenDone = function(msg) {
	loadDone(loadModelsMolden);
}

var counterFreq = 0;
function loadModelsMolden() {
	//cleanAndReloadForm();
	var counterMD = 0;
	counterFreq = 0;
	for (i = 0; i < Info.length; i++) {
		if (Info[i].name != null) {
			var line = Info[i].name;
			if (line.search(/cm/i) != -1) {
				freqData[i] = line;
				counterMD++;
			}
		}
	}

	if (freqData != null) {
		var vib = getbyID('vib');
		for (i = 1; i < freqData.length; i++) {
			var data = parseFloat(freqData[i].substring(0, freqData[i]
					.indexOf("c") - 1));
			addOption(vib, i + " A " + data + " cm^-1", i
					+ counterFreq + 1);
		}
	}
	disableFreqOpts();
	getSymInfo();
}
      		
///js// Js/adapters/quantumespresso.js /////
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

/*&CONTROL
 title = 'alpha_PbO_PBE' ,
 calculation = 'vc-relax' ,
 restart_mode = 'from_scratch' ,
 outdir = '/home/pc229/backup/Counts/PWscf/alpha_PbO/' ,
 wfcdir = '/home/pc229/backup/Counts/PWscf/alpha_PbO/' ,
 pseudo_dir = '/home/pc229/backup/Counts/PWscf/alpha_PbO/pseudo/' ,
 prefix  =' alpha_PbO_PBE' ,
 /
 &SYSTEM
 ibrav = 6,
 celldm(1) = 7.511660805,
 celldm(3) = 1.263647799,
 nat = 4,
 ntyp = 2,
 ecutwfc = 50 ,
 nbnd = 60,
 nelec = 40,
 tot_charge = 0.000000,
 occupations = 'fixed' ,
 /
 &ELECTRONS
 mixing_beta = 0.3D0 ,
 /
 &IONS
 ion_dynamics = 'bfgs' ,
 /
 &CELL
 cell_dynamics = 'bfgs' ,
 /
 ATOMIC_SPECIES
 Pb  207.20000  Pb.pbe-d-van.UPF
 O   15.99400  O.pbe-van_ak.UPF
 ATOMIC_POSITIONS crystal
 Pb      0.000000000    0.500000000    0.238500000
 O      0.000000000    0.000000000    0.000000000
 Pb      0.500000000    0.000000000   -0.238500000
 O      0.500000000    0.500000000    0.000000000
 K_POINTS automatic
 4 4 4   0 0 0
 */

//Following functions are to export file for QuantumEspresso
var controlQ = null;
var systemQ = null;
var electronQ = null;
var ionsQ = null;
var cellQ = null;
var atomspQ = null;
var atompositionQ = null;
var kpointQ = null;

//Main block
function exportQuantum() {
	warningMsg("Make sure you have selected the model you would like to export.");
	prepareControlblock();
	prepareSystemblock();
	prepareElectronblock();
	prepareIonsblock();
	prepareCellblock();
	prepareSpecieblock();
	preparePostionblock();
	prepareKpoint();

	var finalInputQ = "var final = [control, system, electron, ions, cell, atomsp, posQ, kpo];"
		+ 'final = final.replace("\n\n"," ");' + 'WRITE VAR final "?.inp" ';
	runJmolScriptWait(finalInputQ);
}

function prepareControlblock() {

	var stringTitle = prompt("Type here the job title:", "");
	(stringTitle == "") ? (stringTitleNew = 'Input prepared with J-ICE ')
			: (stringTitleNew = 'Input prepared with J-ICE ' + stringTitle);

	// stringa = 'title= \'prova\','
	controlQ = "var controlHeader = '\&CONTROL';"
		+ 'var controlTitle = "           title = \''
		+ stringTitleNew
		+ '\'";'
		+ 'var controlJob = "           calculation = \'  \'";'
		+ 'var controlRestart ="           restart = \'from_scratch\'";'
		+ 'var controlOutdir  ="           outdir = \' \'";'
		+ 'var controlWcfdir  ="           wcfdir = \' \'";'
		+ 'var controlPsddir  ="           pseudo_dir = \' \'";'
		+ 'var controlPrefix  ="           prefix = \''
		+ stringTitle
		+ '\'";'
		+ "var controlClose = '\/';"
		+ ' control = [controlHeader,controlTitle,controlJob,controlRestart,controlOutdir,controlWcfdir,controlPsddir,controlPrefix,controlClose];';
	runJmolScriptWait(controlQ);
	// IMPORTANT THE LAST VARIABLE MUST NOT BE CALL SUCH AS var xxxx
}

function prepareSystemblock() {
	// /here goes the symmetry part

	setUnitCell();
	// celldim(1) = \' \'\,

	// this returns the number of atom

	atomCRYSTAL();
	var numberAtom = jmolEvaluate(numAtomCRYSTAL);
	var stringCutoff = null;
	var stringCutoffrho = null;
	var stringElec = null;
	var stringBand = null;

	/*
	 * var stringCutoff = prompt("Do you know how much is the cutoff on the wave
	 * function? If YES please enter it in eV.") var stringCutoffrho = null;
	 * 
	 * if(stringCutoff != ""){ stringCutoff = fromevTorydberg(stringCutoff);
	 * stringCutoffrho = stringCutoff * 4; }
	 * 
	 * var stringElec = prompt("How many electron does your system have?");
	 * if(stringElec != ""){ stringElec = parseInt(stringElec); stringBand =
	 * parseInt((stringElec / 2) + (stringElec / 2 * 0.20)); }
	 */
	symmetryQuantum();
	var elements = getElementList();

	systemQ = "var systemHeader = '\&SYSTEM';"
		+ 'var systemIbrav = "           ibrav = '
		+ ibravQ
		+ '";' // This variable is defined in the crystal function
		+ 'var systemCelld = "'
		+ cellDimString
		+ '";'
		// + 'var systemNat = " nat = \' \'\,";'
		+ 'var systemNat = "           nat = '
		+ numberAtom
		+ '";'
		+ 'var systemNty = "           ntyp = '
		+ elements.length
		+ '";'
		+ 'var systemCut = "           ecutwfc = 40";'
		+ 'var systemToc = "           tot_charge = 0.000000";'
		+ 'var systemOcc = "           occupation = \' \'";' // #this
		// must be
		// fixed if
		// the
		// structure
		// is an
		// insulator
		+ "var systemClose= '\/';"
		+ ' system = [systemHeader, systemIbrav, systemCelld, systemNat,systemNty,systemCut,systemToc,systemOcc , systemClose];';
	runJmolScriptWait(systemQ);

}

//to be completed
function prepareElectronblock() {
	electronQ = "var electronHeader = '\&ELECTRONS';"
		+ 'var electronBeta = "           mixing_beta = \'  \'";'
		+ "var electronClose= '\/';"
		+ ' electron = [electronHeader, electronBeta, electronClose];';
	runJmolScriptWait(electronQ);
}

//ask what algorithm to use window?
//set Tolerance as well!
function prepareIonsblock() {
	ionsQ = "var ionHeader = '\&IONS';"
		+ 'var ionDyn = "           ion_dynamics= \'  \'";'
		+ "var ionClose= '\/';" + 'ions = [ionHeader, ionDyn, ionClose];';
	runJmolScriptWait(ionsQ);

}

function prepareCellblock() {
	cellQ = "var cellHeader = '\&CELL';"
		+ 'var cellDyn = "           cell_dynamics= \'  \'";'
		+ "var cellClose= '\/';"
		+ 'cell = [cellHeader, cellDyn, cellClose];'
		+ 'cell = cell.replace("\n\n"," ");';
	runJmolScriptWait(cellQ);
}

//ATOMIC_SPECIES Pb 207.20000 Pb.pbe-d-van.UPF O 15.99400 O.pbe-van_ak.UPF


//To BE COMPLETED
function prepareSpecieblock() {
	setUnitCell();
	var scriptEl = "";
	var stringList = "";
	var sortedElement = getElementList();

	for (var i = 0; i < sortedElement.length; i++) {
		var elemento = sortedElement[i];
		var numeroAtom = jmolEvaluate('{' + frameNum + ' and _' + elemento
				+ '}[0].label("%l")'); //tobe changed in atomic mass
		scriptEl = "'" + elemento + " " + eleSymbMass[parseInt(numeroAtom)]
		+ " #Here goes the psudopotential filename e.g.: " + elemento
		+ ".pbe-van_ak.UPF '";
		scriptEl = scriptEl.replace("\n", " ");
		if (i == 0) {
			stringList = scriptEl;
		} else {
			stringList = stringList + "," + scriptEl;
		}

		stringList = stringList.replace("\n", " ")

	}

	atomspQ = "var atomsHeader = 'ATOMIC_SPECIES';" + 'var atomsList = ['
	+ stringList + '];' + 'atomsList = atomsList.replace("\n", " ");'
	// + 'atomList = atomList.join(" ");'
	+ 'atomsp =  [atomsHeader,atomsList];';
	runJmolScriptWait(atomspQ);
}

function preparePostionblock() {

	setUnitCell();
	atompositionQ = "var posHeader = 'ATOMIC_POSITIONS crystal';"
		+ 'var posCoord = ' + frameSelection + '.label(\"%e %14.9[fxyz]\");' // '.label(\"%e
		// %16.9[fxyz]\");'
		+ 'posQ = [posHeader,posCoord];';
	runJmolScriptWait(atompositionQ);

}

function prepareKpoint() {
	kpointQ = "var kpointWh = '\n\n'  ;"
		+ "var kpointHeader = 'K_POINTS automatic';"
		+ "var kpointgr = ' X X X 0 0 0';"
		+ 'kpo = [kpointWh, kpointHeader, kpointgr];';
	runJmolScriptWait(kpointQ);
}

function symmetryQuantum() {
	setUnitCell();
	switch (typeSystem) {
	case "crystal":
		var flagsymmetry = confirm("Do you want to introduce symmetry ?")
		if (!flagsymmetry) {
			cellDimString = "           celldm(1) = "
				+ roundNumber(fromAngstromtoBohr(aCell))
				+ "  \n           celldm(2) =  "
				+ roundNumber(bCell / aCell)
				+ "  \n           celldm(3) =  "
				+ roundNumber(cCell / aCell)
				+ "  \n           celldm(4) =  "
				+ (cosRadiant(alpha))
				+ "  \n           celldm(5) =  "
				+ (cosRadiant(beta))
				+ "  \n           celldm(6) =  "
				+ (cosRadiant(gamma));
			ibravQ = "14";
		} else {
			warningMsg("This procedure is not fully tested.");
			// magnetic = confirm("Does this structure have magnetic properties?
			// \n Cancel for NO.")
			flagCrystal = false;
			quantumEspresso = true;
			figureOutSpaceGroup();
		}
		break;
	case "slab":
		setVacuum();
		runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z/' + cCell
				+ ')');
		cellDimString = "            celldm(1) = "
			+ roundNumber(fromAngstromtoBohr(aCell))
			+ "  \n            celldm(2) =  " + roundNumber(bCell / aCell)
			+ "  \n            celldm(3) =  " + roundNumber(cCell / aCell)
			+ "  \n            celldm(4) =  "
			+ (cosRadiant(alpha))
			+ "  \n            celldm(5) =  " + (cosRadiant(90))
			+ "  \n            celldm(6) =  " + (cosRadiant(90));
		ibravQ = "14";
		break;
	case "polymer":
		setVacuum();
		runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z/' + cCell
				+ ')');
		runJmolScriptWait(frameSelection + '.y = for(i;' + frameSelection + '; i.y/' + bCell
				+ ')');
		cellDimString = "            celldm(1) = "
			+ roundNumber(fromAngstromtoBohr(aCell))
			+ "  \n            celldm(2) =  " + roundNumber(bCell / aCell)
			+ "  \n            celldm(3) =  " + roundNumber(bCell / aCell)
			+ "  \n            celldm(4) =  " + (cosRadiant(90))
			+ "  \n            celldm(5) =  " + (cosRadiant(90))
			+ "  \n            celldm(6) =  " + (cosRadiant(90));
		ibravQ = "14";
		break;
	case "molecule":
		setVacuum();
		runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z/' + cCell
				+ ')');
		runJmolScriptWait(frameSelection + '.y = for(i;' + frameSelection + '; i.y/' + bCell
				+ ')');
		runJmolScriptWait(frameSelection + '.x = for(i;' + frameSelection + '; i.x/' + aCell
				+ ')');
		cellDimString = "            celldm(1) = "
			+ roundNumber(fromAngstromtoBohr(aCell))
			+ "  \n            celldm(2) =  " + roundNumber(1.00000)
			+ "  \n            celldm(3) =  " + roundNumber(1.00000)
			+ "  \n            celldm(4) =  "
			+ (cosRadiant(alpha))
			+ "  \n            celldm(5) =  " + (cosRadiant(90))
			+ "  \n            celldm(6) =  " + (cosRadiant(90));
		ibravQ = "14";
		break;
	}
}

///// QUANTUM ESPRESSO READER

espressoDone = function() {
	loadDone(loadModelsEspresso)
}

function loadModelsEspresso() {
	var counterFreq = 0;
	//cleanAndReloadForm();
	getUnitcell("1");
	setFrameValues("1");
	var counterMD = 0;

	flagQuantumEspresso = true;
	flagOutcar = false;

	for (i = 0; i < Info.length; i++) {
		var line = Info[i].name;

		if (i == 0) {
			line = "Initial";
			addOption(getbyID('geom'), i + " " + line, i + 1);
			geomData[0] = Info[0].name;
		}

		// alert(line)
		if (line != null) {

			// alert(line)
			if (line.search(/E =/i) != -1) {
				// alert("geometry")
				addOption(getbyID('geom'), i + 1 + " " + line, i + 1);
				geomData[i + 1] = Info[i].name;

				counterFreq++;
			} /*
			 * else if (line.search(/cm/i) != -1) { // alert("vibration")
			 * freqData[i - counterFreq] = Info[i].name; counterMD++; } else
			 * if (line.search(/Temp/i) != -1) { addOption(getbyID('geom'),
			 * (i - counterMD) + " " + Info[i].name, i + 1); }
			 */
		}
	}
	/*
	 * if (freqData != null) { for (i = 1; i < freqData.length; i++) { if
	 * (freqData[i] != null) var data =
	 * parseFloat(freqData[i].substring(0,freqData[i].indexOf("c") - 1));
	 * addOption(getbyID('vib'), i + " A " + data + " cm^-1", i + counterFreq +
	 * 1 ); } }
	 */
	getSymInfo();

}

function substringEnergyQuantumToFloat(value) {
	if (value != null) {
		var grab = parseFloat(
				value.substring(value.indexOf('=') + 1, value.indexOf('R') - 1))
				.toPrecision(8); // E = 100000.0000 Ry
		grab = grab * 96.485 * 0.5; // constant from
		// http://web.utk.edu/~rcompton/constants
		grab = Math.round(grab * 100000000) / 100000000;
	}
	return grab;
}
      		
///js// Js/adapters/siesta.js /////
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

//24th May 2011 P. Canepa

siestaDone = function(msg) {
	loadDone(loadModelsSiesta);
}

var geomSiesta = new Array;
var freqSymmSiesta = new Array;
var freqIntensSiesta = new Array;
var freqSiesta = new Array;
var energySiesta = new Array;
var counterSiesta = 0;
function loadModelsSiesta() {
	warningMsg("This is a molecular reader. Therefore not all properties will be available.")
	// Reset program and set filename if available
	// This also extract the auxiliary info
	initializeJiceSiesta();
	var vib = getbyID('vib');
	for (i = 0; i < Info.length; i++) {
		var line = Info[i].name;
		if (line != null) {
			if (line.search(/E/i) != -1) {
				addOption(getbyID('geom'), i + " " + line, i + 1);
				geomSiesta[i] = line;
				if (Info[i].modelProperties.Energy != null
						|| Info[i].modelProperties.Energy != "")
					energySiesta[i] = Info[i].modelProperties.Energy;
				counterSiesta++;
			} else if (line.search(/cm/i) != -1) {
				addOption(vib, i + " " + line + " ("
						+ Info[i].modelProperties.IRIntensity + ")", i);
				freqSiesta[i - counterSiesta] = Info[i].modelProperties.Frequency;
				freqSymmSiesta[i - counterSiesta] = Info[i].modelProperties.FrequencyLabel;
				freqIntensSiesta[i - counterSiesta] = Info[i].modelProperties.IRIntensity;
			}
		}
	}
}

function initializeJiceSiesta() {
	setFrameValues("1");
	setTitleEcho();
	cleanArraySiesta();
	disableFreqOpts();
}

function cleanArraySiesta() {
	geomSiesta = [];
	freqSymmSiesta = [];
	freqIntensSiesta = [];
	counterSiesta = 0;
}

function symmetryModeAdd_siesta() {
	// this method is called using self["symmetryModeAdd_" + type]
	var sortedSymm = unique(freqSymmSiesta);
	for (var i = 0; i < freqSymmSiesta.length; i++) {
		if (sortedSymm[i] != null)
			addOption(getbyID('sym'), freqSymmSiesta[i], freqSymmSiesta[i])
	}
}

function changeIrepSiesta(irep) {
	var vib = getbyID('vib');
	for (var i = 0; i < freqSiesta.length; i++) {
		var value = freqSymmSiesta[i];
		if (irep == value)
			addOption(vib, i + " " + freqSymmSiesta[i] + " "
					+ freqSiesta[i] + " (" + freqIntensSiesta[i] + ")", i
					+ counterSiesta + 1);
	}
}

//function reLoadSiestaFreq() {
//	var vib = getbyID('vib');
//	if (getbyID('vib') != null)
//		cleanList('vib');
//	for (var i = 0; i < freqSiesta.length; i++)
//		addOption(getbyID('vib'), i + " " + freqSymmSiesta[i] + " "
//				+ freqSiesta[i] + " (" + freqIntensSiesta[i] + ")", i
//				+ counterSiesta + 1);
//}
      		
///js// Js/adapters/vasp.js /////
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

xmlvaspDone = function() {
	loadDone(loadModelsVASP);
}

function loadModelsVASP() {
	warningMsg("This reader is limited in its own functionalities\n  It does not recognize between \n geometry optimization and frequency calculations.")
	getUnitcell("1");
	//cleanAndReloadForm();
	setTitleEcho();

	for (var i = 0; i < Info.length; i++) {
		if (Info[i].name != null) {
			var valueEnth = Info[i].name.substring(11, 24);
			var gibbs = Info[i].name.substring(41, 54);
			var stringa = "Enth. = " + valueEnth + " eV, Gibbs E.= " + gibbs
			+ " eV";
			
			addOption(getbyID('geom'), i + " " + stringa, i + 1);
		}
	}

}

function substringEnergyVaspToFloat(value) {
	if (value != null) {
		var grab = parseFloat(
				value.substring(value.indexOf('=') + 1, value.indexOf('e') - 1))
				.toPrecision(8); // Enthaply = -26.45132096 eV
		grab = grab * 96.485; // constant from
		// http://web.utk.edu/~rcompton/constants
		grab = Math.round(grab * 100000000) / 100000000;
	}
	return grab;
}

////EXPORT FUNCTIONS
var fractionalCoord = false;
function exportVASP() {
	var newElement = [];
	var scriptEl = "";
	var stringTitle = "";
	var stringList = "";
	var stringElement = "";
	numAtomelement = null;
	getUnitcell(frameValue);
	setUnitCell();
	var sortedElement = getElementList();
	for (var i = 0; i < sortedElement.length; i++) {
		// scriptEl = "";
		scriptEl = "{" + frameNum + " and _" + sortedElement[i] + "}.length";

		if (i != (sortedElement.length - 1)) {
			stringList = stringList + " " + scriptEl + ", ";
			stringTitle = stringTitle + " " + scriptEl + ", ";
			stringElement = stringElement + " " + sortedElement[i] + ", ";
		} else {
			stringList = stringList + " " + scriptEl;
			stringTitle = stringTitle + " " + scriptEl;
			stringElement = stringElement + " " + sortedElement[i];
		}
	}

	var lattice = fromfractionaltoCartesian();

	warningMsg("Make sure you have selected the model you would like to export.");
	vaspFile = prompt("Type here the job title:", "");
	(vaspFile == "") ? (vaspFile = 'POSCAR prepared with J-ICE whose atoms are: ')
			: (vaspFile = 'POSCAR prepared with J-ICE ' + vaspFile
					+ ' whose atoms are:');
	saveStateAndOrientation_a();
	// This if the file come from crystal output

	var kindCoord = null;
	var fractString = null;
	var exportType = confirm("Would you like to export the structure in fractional coordinates? \n If you press Cancel those will be exported as normal Cartesian.");

	if (exportType) {
		kindCoord = "Direct"
			fractString = "[fxyz]";
		fractionalCoord = true;
	} else {
		kindCoord = "Cartesian"
			fractString = "[xyz]";
		fractionalCoord = false;
	}

	setVacuum();

	var stringVasp = "var titleVasp = ["
		+ stringTitle
		+ "];"
		+ 'var title  = titleVasp.join("  ");'
		+ "var head  ='"
		+ vaspFile
		+ "';"
		+ "var atomLab ='"
		+ stringElement
		+ "';"
		+ 'var titleArr =[head, title, atomLab];'
		+ 'var titleLin = titleArr.join(" ");'
		+ 'var scaleFact = 1.000000;' // imp
		+ 'var vaspCellX = [' + lattice[0] + '].join(" ");'
		+ 'var vaspCellY = [' + lattice[1] + '].join(" ");'
		+ 'var vaspCellZ = [' + lattice[2] + '].join(" ");'
		+ 'var listEle  = [atomLab.replace(",","")];'
		+ 'var listLabel  = listEle.join("  ");'
		+ "var listInpcar = ["
		+ stringList
		+ "];"// imp
		+ 'var listAtom  = listInpcar.join("  ");'
		+ 'var cartString = "'
		+ kindCoord
		+ '";' // imp
		+ 'var xyzCoord = '
		+ frameSelection
		+ '.label(" %16.9'
		+ fractString
		+ '");' // imp
		+ 'var lista = [titleLin, scaleFact, vaspCellX, vaspCellY, vaspCellZ, listLabel, listAtom, cartString, xyzCoord];' // misses
		// listInpcar
		+ 'var cleaned  = lista.replace("[","");'
		+ 'WRITE VAR cleaned "POSCAR.vasp" ';
	runJmolScriptWait(stringVasp);
	restoreStateAndOrientation_a();
}

/////// END EXPORT VASP

/////////// IMPORT OUTCAR

vaspoutcarDone = function() {
	loadDone(loadModelsOutcar);
}

var counterFreq = 0;
function loadModelsOutcar() {
	//cleanAndReloadForm();
	getUnitcell("1");
	setFrameValues("1");
	var counterMD = 0;
	counterFreq = 1;
	for (i = 0; i < Info.length; i++) {
		if (Info[i].name != null) {
			var line = Info[i].name;
			if (line.search(/G =/i) != -1) {
				addOption(getbyID('geom'), i + " " + line, i + 1);
				geomData[i] = line;
				counterFreq++;
			} else if (line.search(/cm/i) != -1) {
				freqData[i - counterFreq] = line;
				counterMD++;
			} else if (line.search(/Temp/i) != -1) {
				addOption(getbyID('geom'), (i - counterMD) + " " + line, i + 1);
			}
		}
	}

	if (freqData != null) {
		var vib = getbyID('vib');
		for (i = 1; i < freqData.length; i++) {
			if (freqData[i] != null)
				var data = parseFloat(freqData[i].substring(0, freqData[i]
				.indexOf("c") - 1));
			 addOption(vib, i + counterFreq  + " A " + data + " cm^-1", i +
			 counterFreq + 1 );
		}
	}
	disableFreqOpts();
	getSymInfo();
}

/////////LOAD FUNCTIONS

function disableFreqOpts() {
	for (var i = 0; i < document.modelsVib.modAct.length; i++)
		document.modelsVib.modAct[i].disabled = true;
	for (var i = 0; i < document.modelsVib.kindspectra.length; i++)
		document.modelsVib.kindspectra[i].disabled = true;
}

function enableFreqOpts() {
	for (var i = 0; i < document.modelsVib.modAct.length; i++)
		document.modelsVib.modAct[i].disabled = false;
	for (var i = 0; i < document.modelsVib.kindspectra.length; i++)
		document.modelsVib.kindspectra[i].disabled = false;

}

/////END FUNCTIONS
