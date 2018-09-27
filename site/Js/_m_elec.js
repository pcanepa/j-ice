function enterElec() {
//	saveOrientation_e();

}

function exitElec() {
}


function setColorMulliken(value) {
	runJmolScriptWait('set propertyColorScheme "' + value + '";select *;font label 18; color {*} property partialCharge; label %5.3P');
}



//function exitMenu() {
//runJmolScriptWait('label off; select off');
//}

function removeCharges() {

// BH TODO - need to clear this without reloading
//runJmolScriptWait('script scripts/reload.spt');
//restoreOrientation_e();
}




