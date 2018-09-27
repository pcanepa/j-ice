/*  J-ICE library 

    based on: A toolkit for publishing enhanced figures; B. McMahon and R. M. Hanson; J. Appl. Cryst. (2008). 41, 811-814
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

function applyBond(angstroms) {
	if (firstTimeBond) {
		runJmolScriptWait("wireframe .2;");
	} else {
		runJmolScriptWait("wireframe " + angstroms + ";");
		getbyID('bondMsg').innerHTML = angstroms.toPrecision(1) + " &#197";
		runJmolScriptWait("save BONDS bondEdit");
	}
}

var defaultFront = 20, defaultBack = 100;

loadSliders = function() {
	bondSlider = new Slider(getbyID("bondSlider-div"), getbyID("bondSlider-input"), "horizontal");
	bondSlider.setMaximum(100);
	bondSlider.setMinimum(0);
	bondSlider.setUnitIncrement(5);
	//amount to increment the value when using the arrow keys
	bondSlider.setValue(15);
	bondSlider.onchange = function() {
		applyBond(bondSlider.getValue() / 100)
	}
	
	radiiSlider = new Slider(getbyID("radiiSlider-div"), getbyID("radiiSlider-input"), "horizontal");
	radiiSlider.setMaximum(100);
	radiiSlider.setMinimum(0);
	radiiSlider.setUnitIncrement(5);
	//amount to increment the value when using the arrow keys
	radiiSlider.setValue(26);
	radiiSlider.onchange = function() {
		applyRadii(radiiSlider.getValue())
	}
	
	radiiConnectSlider = new Slider(getbyID("radiiConnectSlider-div"), getbyID("radiiConnectSlider-input"), "horizontal");
	radiiConnectSlider.setMaximum(100);
	//does not work with values < 1
	radiiConnectSlider.setMinimum(0);
	radiiConnectSlider.setUnitIncrement(1);
	//amount to increment the value when using the arrow keys
	radiiConnectSlider.setValue(80);
	radiiConnectSlider.onchange = function() {
		applyConnect(radiiConnectSlider.getValue() / 20)
	}
	
	transSlider = new Slider(getbyID("transSlider-div"), getbyID("transSlider-input"), "horizontal");
	transSlider.setMaximum(100);
	transSlider.setMinimum(0);
	transSlider.setUnitIncrement(4);
	//amount to increment the value when using the arrow keys
	transSlider.setValue(100);
	transSlider.onchange = function() {
		applyTrans(transSlider.getValue())
	}
	
	packSlider = new Slider(getbyID("packSlider-div"), getbyID("packSlider-input"), "horizontal");
	packSlider.setMaximum(100);
	packSlider.setMinimum(0);
	packSlider.setUnitIncrement(0.5);
	//amount to increment the value when using the arrow keys
	packSlider.setValue(1);
	packSlider.onchange = function() {
		applyPack(packSlider.getValue() / 20)
	}
	
	
	cameraDepthSlider = new Slider(getbyID("cameraDepthSlider-div"), getbyID("cameraDepthSlider-input"), "horizontal");
	cameraDepthSlider.setMaximum(100);
	cameraDepthSlider.setMinimum(1);
	cameraDepthSlider.setUnitIncrement(2);
	//amount to increment the value when using the arrow keys
	cameraDepthSlider.setValue(5);
	cameraDepthSlider.onchange = function() {
		applyCameraDepth(cameraDepthSlider.getValue()/25)
	}
	
	SpecularPercentSlider = new Slider(getbyID("SpecularPercentSlider-div"), getbyID("SpecularPercentSlider-input"), "horizontal");
	SpecularPercentSlider.setMaximum(100);
	SpecularPercentSlider.setMinimum(0);
	SpecularPercentSlider.setUnitIncrement(2);
	//amount to increment the value when using the arrow keys
	SpecularPercentSlider.setValue(5);
	SpecularPercentSlider.onchange = function() {
		applySpecularPercent(SpecularPercentSlider.getValue())
	}
	
	AmbientPercentSlider = new Slider(getbyID("AmbientPercentSlider-div"), getbyID("AmbientPercentSlider-input"), "horizontal");
	AmbientPercentSlider.setMaximum(100);
	AmbientPercentSlider.setMinimum(0);
	AmbientPercentSlider.setUnitIncrement(2);
	//amount to increment the value when using the arrow keys
	AmbientPercentSlider.setValue(5);
	AmbientPercentSlider.onchange = function() {
		applyAmbientPercent(AmbientPercentSlider.getValue())
	}
	
	DiffusePercentSlider = new Slider(getbyID("DiffusePercentSlider-div"), getbyID("DiffusePercentSlider-input"), "horizontal");
	DiffusePercentSlider.setMaximum(100);
	DiffusePercentSlider.setMinimum(0);
	DiffusePercentSlider.setUnitIncrement(2);
	//amount to increment the value when using the arrow keys
	DiffusePercentSlider.setValue(5);
	DiffusePercentSlider.onchange = function() {
		applyDiffusePercent(DiffusePercentSlider.getValue())
	}
	
	slabSlider = new Slider(getbyID("slabSlider-div"), getbyID("slabSlider-input"), "horizontal");
	slabSlider.setMaximum(100)
	slabSlider.setMinimum(0)
	slabSlider.setUnitIncrement(2) 
	// amount to increment the value when using the
	// arrow keys
	slabSlider.setValue(defaultFront)
	slabSlider.onchange = function() {
		applySlab(slabSlider.getValue())
	}
	
	depthSlider = new Slider(getbyID("depthSlider-div"), getbyID("depthSlider-input"), "horizontal");
	depthSlider.setMaximum(100);
	depthSlider.setMinimum(0);
	depthSlider.setUnitIncrement(2); // amount to increment the value when using
	// the arrow keys
	depthSlider.setValue(defaultBack);
	depthSlider.onchange = function() { // onchange MUST BE all lowercase
		applyDepth(depthSlider.getValue())
	}
}

