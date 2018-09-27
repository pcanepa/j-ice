/*  J-ICE library 

    based on:
 *
 * Copyright (C) 2010-2014 Pieremanuele Canepa http://j-ice.sourceforge.net/
 *
 * Contact: pierocanepa@sourceforge.net
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

//////////////////////////////////////VALUE conversion AND ROUNDOFF

var finalGeomUnit = ""
var unitGeomEnergy = "";

var radiant = Math.PI / 180;

function substringEnergyToFloat(value) {
	if (value != null) {
		var grab = parseFloat(
				value.substring(value.indexOf('=') + 1, value.indexOf('H') - 1))
				.toPrecision(12); // Energy = -5499.5123027313 Hartree
		grab = grab * 2625.50;
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function substringFreqToFloat(value) {
	if (value != null) {
		var grab = parseFloat(value.substring(0, value.indexOf('c') - 1));
		// BH 2018 looking out for "F 300.2" in frequencies
		if (isNaN(grab))
			grab= parseFloat(value.substring(1, value.indexOf('c') - 1));
		if (isNaN(grab))
			return NaN;
		else
		grab = Math.round(grab.toPrecision(8) * 100000000) / 100000000;
	}
	return grab;
}

function substringIntGaussToFloat(value) {
	if (value != null) {
		var grab = parseFloat(value.substring(0, value.indexOf('K') - 1))
		.toPrecision(8);
		grab = Math.round(grab * 100000000) / 100000000;
	}
	return grab;
}

function substringIntFreqToFloat(value) {
	if (value != null) {
		var grab = parseFloat(value.substring(0, value.indexOf('k') - 1))
		.toPrecision(5);
		grab = Math.round(grab * 10000) / 10000;
	}
	return grab;
}

function cosRadiant(value) {
	if (value != null) {
		var angle = parseFloat(value).toPrecision(7);
		angle = Math.cos(value * radiant);
		angle = Math.round(angle * 10000000) / 10000000;
	}
	return angle;
}

roundNumber = function(value) { //BH 2018 was 10000000
	return Math.round(value * 10000) / 10000;
}

function roundoff(value, precision) {
	value = "" + value
	precision = parseInt(precision)

	var whole = "" + Math.round(value * Math.pow(10, precision))
	var decPoint = whole.length - precision;

	if (decPoint != 0) {
		result = whole.substring(0, decPoint);
		result += "."
			result += whole.substring(decPoint, whole.length);
	} else {
		result = whole;
	}

	return result;
}


////////////////////////////////ENERGY CONV

function convertPlot(value) {
	var unitEnergy = value;

	// ////var vecUnitEnergyVal = new Array ("h", "e", "r", "kj", "kc");
	setconversionParam();
	switch (unitEnergy) {

	case "h": // Hartree
		finalGeomUnit = " Hartree";
		if (flagQuantumEspresso) {
			convertGeomData(fromRydbergtohartree);
		} else if (!flagCrystal || flagOutcar || flagGulp) {
			convertGeomData(fromevToHartree);
		} else if (flagCrystal || flagDmol) {
			convertGeomData(fromHartreetoHartree);
		}
		break;
	case "e": // eV
		finalGeomUnit = " eV";
		if (flagCrystal || flagDmol) {
			convertGeomData(fromHartreetoEv);
		} else if (flagQuantumEspresso) {
			convertGeomData(fromRydbergtoEv);
		} else if (!flagCrystal || flagOutcar || flagGulp) {
			convertGeomData(fromevtoev);
		}

		break;

	case "r": // Rydberg
		finalGeomUnit = " Ry";
		if (flagCrystal || flagDmol) {
			convertGeomData(fromHartreetoRydberg);
		} else if (!flagCrystal || flagOutcar || flagGulp) {
			convertGeomData(fromevTorydberg);
		} else if (flagQuantumEspresso) {
			convertGeomData(fromRydbergTorydberg);
		}
		break;

	case "kj": // Kj/mol
		finalGeomUnit = " kJ/mol"

			if (flagCrystal || flagDmol) {
				convertGeomData(fromHartreetokJ);
			} else if (!flagCrystal || flagOutcar || flagGulp) {
				convertGeomData(fromevTokJ);
			} else if (flagQuantumEspresso) {
				convertGeomData(fromRydbergToKj);
			}
		break;

	case "kc": // Kcal*mol
		finalGeomUnit = " kcal/mol"
			
			if (flagCrystal || flagDmol) {
				convertGeomData(fromHartreetokcalmol);
			} else if (!flagCrystal || flagOutcar || flagGulp) {
				convertGeomData(fromevtokcalmol);
			} else if (flagQuantumEspresso) {
				convertGeomData(fromRytokcalmol);
			}
		break;
	}
}

function setconversionParam() {
	if (flagCrystal || flagDmol) {
		unitGeomEnergy = "H"; // Hartree
	} else if ((!flagCrystal && !flagQuantumEspresso) || (flagOutcar && !flagQuantumEspresso)) {
		unitGeomEnergy = "e"; // VASP
	} else if (flagGulp) {
		unitGeomEnergy = "k";
	} else if (flagQuantumEspresso || !flagOutcar) {
		unitGeomEnergy = "R";
	}
}

function convertGeomData(f) {
	// The required value is the end of the string Energy = -123.456 Hartree.
	var geom = getbyID('geom');
	if (geom != null)
		cleanList('geom');

	var arraynewUnit = [];

	var n = 0;
	if (flagQuantumEspresso)
		n = 1;
	for (var i = n; i < geomData.length; i++) {
		var data = geomData[i];
		arraynewUnit[i] = f(data.substring(data.indexOf('=') + 1, 
				data.indexOf(unitGeomEnergy) - 1));
		addOption(geom, i + " E = " + arraynewUnit[i] + finalGeomUnit, i + 1);
	}

}

///Hartree
function fromHartreetoEv(value) { // 1 Hartree = 27.211396132eV
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = grab * 27.211396132;
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromHartreetoHartree(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromHartreetokJ(value) { // From hartree to kJmol-1
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = grab * 2625.50;
		grab = Math.round(grab * 1000) / 1000;
	}
	return grab;
}

function fromHartreetoRydberg(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = grab * 2;
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromHartreetokcalmol(value) { // 1Hartree == 627.509 kcal*mol-1
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = grab * 627.509;
		grab = Math.round(grab * 1000) / 1000;
	}
	return grab;
}

/// end Hartree

////ev

function fromevTokJ(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromevToHartree(grab);
		grab = fromHartreetokJ(grab)
		grab = Math.round(grab * 1000) / 1000;
	}
	return grab;
}

function fromevToHartree(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromHartreetoEv(1 / grab);
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromevTorydberg(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = grab * 0.073498618;
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromevtoev(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromevtokcalmol(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromevToHartree(grab);
		grab = fromHartreetokcalmol(grab);
		grab = Math.round(grab * 1000) / 1000;
	}
	return grab;
}

////end ev

//rydberg

function fromRydbergtohartree(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromHartreetoRydberg(1 / grab);
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

function fromRydbergtoEv(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromevTorydberg(1 / grab);
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;

}

function fromRydbergToKj(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromHartreetokJ(grab / 2);
		grab = Math.round(grab * 1000) / 1000;
	}
	return grab;
}

function fromRytokcalmol(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = fromRydbergtohartree(grab);
		grab = fromHartreetokcalmol(grab);
		grab = Math.round(grab * 1000) / 1000;
	}
	return grab;
}

function fromRydbergTorydberg(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(12);
		grab = Math.round(grab * 1000000000000) / 1000000000000;
	}
	return grab;
}

//1 Angstrom = 1.889725989 Bohr
function fromAngstromtoBohr(value) {
	if (value != null) {
		var grab = parseFloat(value).toPrecision(7);
		grab = grab * 1.889725989;
		grab = Math.round(grab * 10000000) / 10000000;
	}
	return grab;
}

/////////////////////////////////END ENERGY conversion
