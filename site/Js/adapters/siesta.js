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
