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

