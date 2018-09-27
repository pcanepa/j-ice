
function setVacuum() {
	switch (typeSystem) {
	case "slab":
		vaccum = prompt("Please enter the vacuum thickness (\305).", "");
		(vaccum == "") ? (errorMsg("Vacuum not entered!"))
				: (messageMsg("Vacuum set to: " + vaccum + " \305."));

		var zMaxCoord = parseFloat(jmolEvaluate(frameSelection + '.fz.max'));
		vaccum = parseFloat(vaccum);
		newcCell = (zMaxCoord * 2) + vaccum;
		var factor = roundNumber(zMaxCoord + vaccum);
		if (fractionalCoord == true) {
			runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; ( i.z +'
					+ factor + ') /' + newcell + ')');
		} else {
			runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z +'
					+ factor + ')');
		}
		fromfractionaltoCartesian(null, null, newcCell, null, 90, 90);
		break;
	case "polymer":
		vaccum = prompt("Please enter the vacuum thickness (\305).", "");
		(vaccum == "") ? (errorMsg("Vacuum not entered!"))
				: (messageMsg("Vacuum set to: " + vaccum + "  \305."));

		var zMaxCoord = parseFloat(jmolEvaluate(frameSelection + '.fz.max'));
		vaccum = parseFloat(vaccum);
		newcCell = (zMaxCoord * 2) + vaccum;
		var factor = roundNumber(zMaxCoord + vaccum);
		runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z +' + factor
				+ ')');
		runJmolScriptWait(frameSelection + '.y = for(i;' + frameSelection + '; i.y +' + factor
				+ ')');
		fromfractionaltoCartesian(null, newcCell, newcCell, 90, 90, 90);
		break;
	case "molecule":
		vaccum = prompt("Please enter the vacuum thickness (\305).", "");
		(vaccum == "") ? (errorMsg("Vacuum not entered!"))
				: (messageMsg("Vacuum set to: " + vaccum + " \305."));

		var zMaxCoord = parseFloat(jmolEvaluate(frameSelection + '.fz.max'));
		vaccum = parseFloat(vaccum);
		newcCell = (zMaxCoord * 2) + vaccum;
		var factor = roundNumber(zMaxCoord + vaccum);
		runJmolScriptWait(frameSelection + '.z = for(i;' + frameSelection + '; i.z +' + factor
				+ ')');
		runJmolScriptWait(frameSelection + '.y = for(i;' + frameSelection + '; i.y +' + factor
				+ ')');
		runJmolScriptWait(frameSelection + '.x = for(i;' + frameSelection + '; i.x +' + factor
				+ ')');
		fromfractionaltoCartesian(newcCell, newcCell, newcCell, 90, 90, 90);
		break;

	}
}

function fromfractionaltoCartesian(aparam, bparam, cparam, alphaparam,
		betaparam, gammaparam) {
	//From fractional to Cartesian -- returns a 3x3 matrix
	var xx, xy, xz, 
	    yx, yy, yz, 
	    zx, zy, zz;
	if (aparam != null)
		aCell = aparam;
	if (bparam != null)
		bCell = bparam;
	if (cparam != null)
		cCell = cparam;
	if (alphaparam != null)
		alpha = alphaparam;
	if (betaparam != null)
		beta = betaparam;
	if (gammaparam != null)
		gamma = gammaparam;
	// formula repeated from
	// http://en.wikipedia.org/wiki/Fractional_coordinates
	var v = Math.sqrt(1
			- (Math.cos(alpha * radiant) * Math.cos(alpha * radiant))
			- (Math.cos(beta * radiant) * Math.cos(beta * radiant))
			- (Math.cos(gamma * radiant) * Math.cos(gamma * radiant))
			+ 2
			* (Math.cos(alpha * radiant) * Math.cos(beta * radiant) * Math
					.cos(gamma * radiant)));
	xx = aCell * Math.sin(beta * radiant);
	xy = parseFloat(0.000);
	xz = aCell * Math.cos(beta * radiant);
	yx = bCell
	* (((Math.cos(gamma * radiant)) - ((Math.cos(beta * radiant)) * (Math
			.cos(alpha * radiant)))) / Math.sin(beta * radiant));
	yy = bCell * (v / Math.sin(beta * radiant));
	yz = bCell * Math.cos(alpha * radiant);
	zx = parseFloat(0.000);
	zy = parseFloat(0.000);
	zz = cCell;
	return [[xx, xy, xz], [yx, yy, yz], [zx, zy, zz]];

}

