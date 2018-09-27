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
