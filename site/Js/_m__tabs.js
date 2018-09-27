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

