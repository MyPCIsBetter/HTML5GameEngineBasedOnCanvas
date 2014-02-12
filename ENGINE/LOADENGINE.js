function loadJSfromFile(src) {
    var h = document.getElementsByTagName('head').item(0);
    var s = document.createElement("script");
    //s.type = "text/javascript";
    s.src = src;
    h.appendChild(s);
};

loadJSfromFile("ENGINE/canvasManager.js");
loadJSfromFile("ENGINE/mainFunctions.js");
loadJSfromFile("ENGINE/animations.js");
loadJSfromFile("ENGINE/objects.js");
loadJSfromFile("ENGINE/collisions.js");