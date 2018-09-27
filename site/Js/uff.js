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
