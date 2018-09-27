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
	switch (rad_val) {
	case "all":
		for (var i = 0; i < InfoFreq.length; i++) {
			if (InfoFreq[i].modelProperties.Frequency != null) {
				addOption(vib, i + " " + InfoFreq[i].name, i + 1);
			}
		}
		break;	
	case "ir":
		for (var i = 0; i < InfoFreq.length; i++) {
			if (InfoFreq[i].modelProperties.Frequency != null) {
				if (InfoFreq[i].modelProperties.IRactivity == "A") {
					addOption(vib, i + " " + InfoFreq[i].name, i + 1);
				}
			}
		}
		break;	
	case "raman":
		for (var i = 0; i < InfoFreq.length; i++) {
			if (InfoFreq[i].modelProperties.Frequency != null) {
				if (InfoFreq[i].modelProperties.Ramanactivity == "A") {
					addOption(vib, i + " " + InfoFreq[i].name, i + 1);
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


