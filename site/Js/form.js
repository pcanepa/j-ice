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


