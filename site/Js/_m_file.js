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

