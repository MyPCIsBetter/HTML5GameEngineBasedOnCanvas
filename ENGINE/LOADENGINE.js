function loadJSfromFile(src) {
    var h = document.getElementsByTagName('head').item(0);
    var s = document.createElement("script");
    //s.type = "text/javascript";
    s.src = src;
    h.appendChild(s);
};

var piover180 = 0.0174532925;

//pliki podstawowe
loadJSfromFile("ENGINE/canvasManager.js");
loadJSfromFile("ENGINE/mainFunctions.js");
loadJSfromFile("ENGINE/animations.js");
loadJSfromFile("ENGINE/objects.js");
loadJSfromFile("ENGINE/collisions.js");