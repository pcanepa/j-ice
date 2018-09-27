debugSay = function(script) {
	// BH 2018
	var div = getbyID("debugdiv");
	var area = getbyID("debugarea");
	if (script === null) {
		script = "";
	} else {
		console.log(script);
		if (isChecked("debugMode")) {
			div.style.display = "block";
			script = area.value + script + "\n";
		} else {
			div.style.display = "none";
			script = "";
		}
	}
	area.value = script;
	area.scrollTop = area.scrollHeight;
}

debugShowCommands = function(isOn) {
	getbyID("debugdiv").style.display = (isOn ? "block" : "none");
}

debugShowHistory = function() {
 	debugSay(jmolEvaluate("show('history')"));
}

