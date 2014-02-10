var GAME_WIDTH = 1000;
var GAME_HEIGHT = 1000;
var MAIN_CANVAS = null;

var keysDown = {};
var mouse = {
    x: 0,
    y: 0,
    event: ""
};

var enableCollisionCanvas = false;

function key(name) {
    if (name === "up") {
        return 38 in keysDown;
    } else if (name === "down") {
        return 40 in keysDown;
    } else if (name === "left") {
        return 37 in keysDown;
    } else if (name === "right") {
        return 39 in keysDown;
    }

    return false;
}

$(document).ready(function(){
    var canvasVisible = document.getElementById("canvToRedraw");
    var contextVisible = canvasVisible.getContext("2d");

    MAIN_CANVAS = canvasVisible;

    /*
    ***************************
    CONTROLS
    ***************************
    */
    addEventListener("keydown", function(e) {
        keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function(e) {
        delete keysDown[e.keyCode];
    }, false);

    MAIN_CANVAS.addEventListener('mousemove', function(evt) {
        var rect = MAIN_CANVAS.getBoundingClientRect();
        mouse.x = evt.clientX - rect.left,
        mouse.y = evt.clientY - rect.top
    }, false);

    MAIN_CANVAS.addEventListener('mousedown', function(evt) {
        mouse.event = "down";
    });

    MAIN_CANVAS.addEventListener('mouseup', function(evt) {
        mouse.event = "up";
    });

    /*

    */

    var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            null;

    if (animFrame !== null) {
        var recursiveAnim = function() {
            mainloop();
            animFrame(recursiveAnim);
        };
        animFrame(recursiveAnim);
    } else {
        var ONE_FRAME_TIME = 1000.0 / 60.0;
        setInterval(mainloop, ONE_FRAME_TIME);
    }

    var lastUpdate = Date.now();

    var mainloop = function() {
        var now = Date.now();
        var fps = 1000 / (now - lastUpdate);
        var dt = (now - lastUpdate)/10;
        lastUpdate = now;

        play(canvasVisible, contextVisible, dt);
    }
});