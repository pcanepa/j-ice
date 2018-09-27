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

moldenDone = function(msg) {
	loadDone(loadModelsMolden);
}

var counterFreq = 0;
function loadModelsMolden() {
	//cleanAndReloadForm();
	var counterMD = 0;
	counterFreq = 0;
	for (i = 0; i < Info.length; i++) {
		if (Info[i].name != null) {
			var line = Info[i].name;
			if (line.search(/cm/i) != -1) {
				freqData[i] = line;
				counterMD++;
			}
		}
	}

	if (freqData != null) {
		var vib = getbyID('vib');
		for (i = 1; i < freqData.length; i++) {
			var data = parseFloat(freqData[i].substring(0, freqData[i]
					.indexOf("c") - 1));
			addOption(vib, i + " A " + data + " cm^-1", i
					+ counterFreq + 1);
		}
	}
	disableFreqOpts();
	getSymInfo();
}
