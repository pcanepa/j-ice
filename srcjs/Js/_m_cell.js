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

function getSymInfo() { //parses data file and provides symmetry operations

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

