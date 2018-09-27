var windowoptions = "menubar=yes,resizable=1,scrollbars,alwaysRaised,width=600,height=600,left=50";
function newAppletWindow() {
	var sm = "" + Math.random();
	sm = sm.substring(2, 10);
	var newwin = open("OutputResized.html", "jmol_" + sm, windowoptions);
}

var windowfreq = "menubar=no,resizable=no,scrollbars=yes,resizable=yes;alwaysRaised,width=1024,height=768";
function newAppletWindowFreq() {
	var sm = "" + Math.random();
	sm = sm.substring(2, 10);
	var newwin = open("exportfreq.html", sm, windowfreq);
}

function onClickAcknow() {
	var woption = "menubar=no, toolbar=no scrollbar=no, status=no, resizable=no, alwaysRaised,width=360, height=200, top=10, left=10,";
	var sm = "" + Math.random();
	sm = sm.substring(2, 10);
	var newwin = open("acn.html", sm, woption);
}

var windowfeed = "menubar=no,resizable=no,scrollbars=yes,resizable=yes;alwaysRaised,width=1024,height=768";
function newAppletWindowFeed() {
	var sm = "" + Math.random();
	sm = sm.substring(2, 10);
	var newwin = open("http://j-ice.sourceforge.net/?page_id=9", sm, windowfeed);
}
