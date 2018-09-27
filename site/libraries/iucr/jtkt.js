/* ***********************************************************************
 * jtkt.js
 * Library of functions supporting the IUCr Jmol enhanced figure toolkit
 *  - includes some generic libraries (occasionally slightly modified)
 * that are bundled for ease of portability. These insertions are indicated
 * by a (+) in the contents list below.
 *
 * Contents:
 *  (1) dom-drag.js: creating and manipulating draggable objects (+)
 *  (2) various small utility functions (+)
 *  (3) functions associated with help popups
 *  (4) functions defining and modifying Jmol behaviour
 *  (5) functions modifying the toolkit user interface
 *  (6) Jmol scripts used in other applications (+)
 *  (7) Dynamic widgets (sliders, colour pickers etc.)
 *
 *********************************************************************** */

/**************************************************
 * dom-drag.js
 * 09.25.2001
 * www.youngpup.net
 * Script featured on Dynamic Drive (http://www.dynamicdrive.com) 12.08.2005
 **************************************************
 * 10.28.2001 - fixed minor bug where events
 * sometimes fired off the handle, not the root.
 **************************************************/
var highestZIndex=999;

/* global floating div used to cover document when dragging so that
   drag events are not lost when over an iframe (which has own dom
   so parents document.onmousemove etc not fired)
*/

var dragMask;

var Drag = {

  obj : null,

  init : function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
  {
    o.onmousedown  = Drag.start;

    o.hmode      = bSwapHorzRef ? false : true ;
    o.vmode      = bSwapVertRef ? false : true ;

    o.root = oRoot && oRoot != null ? oRoot : o ;

    if (o.hmode  && isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
    if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
    if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
    if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

    o.minX  = typeof minX != 'undefined' ? minX : null;
    o.minY  = typeof minY != 'undefined' ? minY : null;
    o.maxX  = typeof maxX != 'undefined' ? maxX : null;
    o.maxY  = typeof maxY != 'undefined' ? maxY : null;

    o.xMapper = fXMapper ? fXMapper : null;
    o.yMapper = fYMapper ? fYMapper : null;

    o.root.onDragStart  = new Function();
    o.root.onDragEnd  = new Function();
    o.root.onDrag    = new Function();

    // create a screen mask to avoid any problems dragging over e.g. iframes
    // (which dont respond to doc events)
    if (!dragMask) createDragMask();
    o.mask=dragMask;
    o.move=Drag.move;

  },

  /* --------------------------------------------------------------------- */
  initNoMask: function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)
  {
    o.onmousedown  = Drag.start;

    o.hmode      = bSwapHorzRef ? false : true ;
    o.vmode      = bSwapVertRef ? false : true ;

    o.root = oRoot && oRoot != null ? oRoot : o ;

    if (o.hmode  && isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
    if (o.vmode  && isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
    if (!o.hmode && isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
    if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

    o.minX  = typeof minX != 'undefined' ? minX : null;
    o.minY  = typeof minY != 'undefined' ? minY : null;
    o.maxX  = typeof maxX != 'undefined' ? maxX : null;
    o.maxY  = typeof maxY != 'undefined' ? maxY : null;

    o.xMapper = fXMapper ? fXMapper : null;
    o.yMapper = fYMapper ? fYMapper : null;

    o.root.onDragStart  = new Function();
    o.root.onDragEnd  = new Function();
    o.root.onDrag    = new Function();

    //    // create a screen mask to avoid any problems dragging over e.g. iframes
    //    // (which dont respond to doc events)
    //    if (!dragMask) createDragMask();
    //    o.mask=dragMask;
    //    o.move=Drag.move;

  },
  /* --------------------------------------------------------------------- */

  start : function(e)
  {


    var o = Drag.obj = this;
    o.mask.style.display="block";
    o.mask.style.zIndex=highestZIndex++;

    o.root.style.zIndex=highestZIndex++;
    e = Drag.fixE(e);
    var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
    var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
    o.root.onDragStart(x, y);

    o.lastMouseX  = e.clientX;
    o.lastMouseY  = e.clientY;

    if (o.hmode) {
      if (o.minX != null)  o.minMouseX  = e.clientX - x + o.minX;
      if (o.maxX != null)  o.maxMouseX  = o.minMouseX + o.maxX - o.minX;
    } else {
      if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
      if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
    }

    if (o.vmode) {
      if (o.minY != null)  o.minMouseY  = e.clientY - y + o.minY;
      if (o.maxY != null)  o.maxMouseY  = o.minMouseY + o.maxY - o.minY;
    } else {
      if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
      if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
    }

    document.onmousemove  = Drag.drag;
    document.onmouseup    = Drag.end;

    return false;
  },

  drag : function(e)
  {
    e = Drag.fixE(e);
    var o = Drag.obj;

    var ey  = e.clientY;
    var ex  = e.clientX;
    var y = parseInt(o.vmode ? o.root.style.top  : o.root.style.bottom);
    var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right );
    var nx, ny;

    if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
    if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
    if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
    if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

    nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
    ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

    if (o.xMapper)    nx = o.xMapper(y)
    else if (o.yMapper)  ny = o.yMapper(x)

    Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
    Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
    Drag.obj.lastMouseX  = ex;
    Drag.obj.lastMouseY  = ey;

    Drag.obj.root.onDrag(nx, ny);
    return false;
  },

move : function(tox,toy)
  {
    //e = Drag.fixE(e);
    var o = Drag.obj = this;

    
    var ny = toy;
    var nx = tox;

    Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
    Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
    Drag.obj.lastMouseX  = nx;
    Drag.obj.lastMouseY  = ny;

    return false;
  },

  end : function()
  {

    document.onmousemove = null;
    document.onmouseup   = null;
    Drag.obj.root.onDragEnd(  parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]),
                  parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));

    Drag.obj.mask.style.display="none";
    Drag.obj = null;
  },

  fixE : function(e)
  {
    if (typeof e == 'undefined') e = window.event;
    if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
    if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
    return e;
  }
};


var DragResize = {

  obj : null,

  init : function(o, oRoot, minW, maxW, minH, maxH) /*, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper)*/
  {
    o.onmousedown  = DragResize.start;

    //o.hmode      = bSwapHorzRef ? false : true ;
    //o.vmode      = bSwapVertRef ? false : true ;

    o.root = oRoot && oRoot != null ? oRoot : o ;

    //if (/*o.hmode  && */ isNaN(parseInt(o.root.style.left  ))) o.root.style.left   = "0px";
    //if (/*o.vmode  &&*/ isNaN(parseInt(o.root.style.top   ))) o.root.style.top    = "0px";
    //if (/*!o.hmode &&*/ isNaN(parseInt(o.root.style.right ))) o.root.style.right  = "0px";
    //if (/*!o.vmode &&*/ isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

    o.minW  = typeof minW != 'undefined' ? minW : 50;
    o.minH  = typeof minH != 'undefined' ? minH : 50;
    o.maxW  = typeof maxW != 'undefined' ? maxW : null;
    o.maxH  = typeof maxH != 'undefined' ? maxH : null;

    //o.xMapper = fXMapper ? fXMapper : null;
    //o.yMapper = fYMapper ? fYMapper : null;

    o.root.onDragResizeStart  = new Function();
    o.root.onDragResizeEnd  = new Function();
    o.root.onDragResize    = new Function();
    if (!dragMask) createDragMask();
    o.mask=dragMask;
  },

  start : function(e)
  {
    var o = DragResize.obj = this;
        //alert(o.mask.style.display);
o.mask.style.display="block";
o.mask.style.zIndex=highestZIndex++;
    o.rLeft=parseInt(o.root.style.width)-parseInt(o.style.left);
    o.rTop=parseInt(o.root.style.height)-parseInt(o.style.top);
    o.style.display="none";

    o.root.style.zIndex=highestZIndex++;
    e = DragResize.fixE(e);
    var y = parseInt(o.root.style.height);
    var x = parseInt(o.root.style.width);
    o.root.onDragResizeStart(x, y);

    o.lastMouseX  = e.clientX;
    o.lastMouseY  = e.clientY;
/*
    if (o.minX != null)  o.minMouseX  = e.clientX - x + o.minX;
    if (o.maxX != null)  o.maxMouseX  = o.minMouseX + o.maxX - o.minX;

    if (o.minY != null)  o.minMouseY  = e.clientY - y + o.minY;
    if (o.maxY != null)  o.maxMouseY  = o.minMouseY + o.maxY - o.minY;

*/

    document.onmousemove  = DragResize.resize;
    document.onmouseup  = DragResize.end;

    /* */

    return false;
  },


  resize : function(e)
  {
    e = DragResize.fixE(e);
    var o = DragResize.obj;

    var ey  = e.clientY;
    var ex  = e.clientX;
    if (ey>(o.lastMouseY+20))
    {//alert('boo');
    }
    var h = parseInt(o.root.style.height);
    var w = parseInt(o.root.style.width);
    var nw, nh;



    nw = w + (ex - o.lastMouseX);
    nh = h + (ey - o.lastMouseY);

    if (nw<o.minW) nw = o.minW;
    if (o.maxW != null && nw>o.maxW) nw = o.maxW;
    if (nh<o.minH) nh = o.minH;
    if (o.maxH != null && nh>o.maxH) nh = o.maxH;


    DragResize.obj.root.style["width"] = nw + "px";
    DragResize.obj.root.style["height"] = nh + "px";
    DragResize.obj.lastMouseX  = ex;
    DragResize.obj.lastMouseY  = ey;

    DragResize.obj.root.onDragResize(nw, nh);
    return false;
  },

  end : function()
  {
    document.onmousemove = null;
    document.onmouseup   = null;

    DragResize.obj.root.onDragResizeEnd(  parseInt(DragResize.obj.root.style["width"]),      parseInt(DragResize.obj.root.style["height"]));
    //DragResize.obj.style.left=(parseInt(DragResize.obj.root.style["width"])-DragResize.obj.rLeft)+"px";
    //DragResize.obj.style.top=(parseInt(DragResize.obj.root.style["height"])-DragResize.obj.rTop)+"px";
    DragResize.obj.style.display="block";
    DragResize.obj.mask.style.display="none";

    DragResize.obj = null;
  },

  fixE : function(e)
  {
    if (typeof e == 'undefined') e = window.event;
    if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
    if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
    return e;
  }
};

function getWinWidth()
{
var x = 0;
if (self.innerHeight)
{
x = self.innerWidth;
}
else if (document.documentElement && document.documentElement.clientHeight)
{
 x = document.documentElement.clientWidth;
 }
else if (document.body)
{
 x = document.body.clientWidth;
 }
return x;
}

function getWinHeight()
{
 var y = 0;
 if (self.innerHeight)
 {
 y = self.innerHeight;
 }
 else if (document.documentElement && document.documentElement.clientHeight)
 {
 y = document.documentElement.clientHeight;
 }
 else if (document.body)
 {
 y = document.body.clientHeight;
  }
 return y;
}

function _getWinWidth() { var x = 800; return x; }
function _getWinHeight() { var y = 600; return y; }

function createDragMask()
{
  var newDiv;
  try
  {
  // Internet explorer
  var IEstr='<div id="screenshield" ></div>';
  newDiv = document.createElement(IEstr);
  }
  catch(err)
  {    //  FireFox, Safari, Opera...
        newDiv = document.createElement('div');
          newDiv.setAttribute('id', 'screenshield');
  }

  newDiv.style.position='absolute';
  newDiv.style.top='0px';
  newDiv.style.left='0px';
  // newDiv.style.width='800px';
  // newDiv.style.height='2000px';
  newDiv.style.width=getWinWidth();
  newDiv.style.height=getWinHeight();
  newDiv.style.display='none';
  newDiv.style.zIndex=highestZIndex++;
  document.body.appendChild(newDiv);
  dragMask=newDiv;

}

/* -------------- various utility functions ------------------------------ */
/*
From http://www.bytemycode.com/snippets/snippet/595/ by Jeremy Edmiston
*/
// Global declarations
var ie = (document.all) ? true : false;

function toggleClass(objClass){
//  This function will toggle obj visibility of an Element
//  based on Element's Class
//  Works with IE and Mozilla based browsers

  if (getElementByClass(objClass).style.display=="none"){
    showClass(objClass)
  }else{
    hideClass(objClass)
  }
}

function hideClass(objClass){
//  This function will hide Elements by object Class
//  Works with IE and Mozilla based browsers

var elements = (ie) ? document.all : document.getElementsByTagName('*');
  for (i=0; i<elements.length; i++){
    if (elements[i].className==objClass){
      elements[i].style.display="none"
    }
  }
}

function showClass(objClass){
//  This function will show Elements by object Class
//  Works with IE and Mozilla based browsers
var elements = (ie) ? document.all : document.getElementsByTagName('*');
  for (i=0; i<elements.length; i++){
    if (elements[i].className==objClass){
      elements[i].style.display="block"
    }
  }
}

function showClassInline(objClass){
//  This function will show Elements by object Class
//  Works with IE and Mozilla based browsers
var elements = (ie) ? document.all : document.getElementsByTagName('*');
  for (i=0; i<elements.length; i++){
    if (elements[i].className==objClass){
      elements[i].style.display="inline"
    }
  }
}

function getElementByClass(objClass){
//  This function is similar to 'getElementByID' since there
//  is no inherent function to get an element by it's class
//  Works with IE and Mozilla based browsers
var elements = (ie) ? document.all : document.getElementsByTagName('*');
  for (i=0; i<elements.length; i++){
    //alert(elements[i].className)
    //alert(objClass)
    if (elements[i].className==objClass){
    return elements[i]
    }
  }
}



 





