var Info, InfoFreq;

function extractInfoJmol(whatToExtract) {
	return jmolGetPropertyAsArray(whatToExtract);
}

function extractInfoJmolString(whatToExtract) {
	return jmolGetPropertyAsString(whatToExtract);
}

function extractAuxiliaryJmol() {
	Info = extractInfoJmol("auxiliaryInfo.models");
}

function getElementList(arr) {
	// BH 2018 using element.pivot.keys for easy array creation
	arr || (arr = []);
	var elements = Jmol.evaluateVar(jmolApplet0,"{*}.element.pivot.keys");
	for (var i = 0; i < elements.length; i++)
		arr.push(elements[i]);
	return arr;
}

function getInfoFreq() {
	InfoFreq = [];
	for (var i = 0; i < Info.length; i++)
		if (Info[i] && Info[i].modelProperties 
				&& Info[i].modelProperties.PATH == "Frequencies")
			InfoFreq.push(Info[i]);	
}

