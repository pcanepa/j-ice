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

