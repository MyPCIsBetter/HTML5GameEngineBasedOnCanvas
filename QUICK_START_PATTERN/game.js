var objectsInGame;
var object1;

var LOAD_GAME =  function() {
    object1 = new GameObject(
        function (obj) { //onload
            obj.setWidth(200);
            obj.setHeight(200);
            obj.setX(300);
            obj.setY(300);
            obj.setLook("greenBox");
        },
        function (obj, deltaTime) { //loop
            
        },
        { //appearance
            "greenBox": new SimpleStaticRectangle("green")
        },
        { //audio

        }
    );

    objectsInGame = new Array(object1);
};


function play(canvas, context, deltaTime) {
    canvas.width = canvas.width; //clear canvas

    /*
    * Update and drawing objects
    */

    for (var o in objectsInGame) {
        objectsInGame[o].update(deltaTime);
    }

    for (o in objectsInGame) {
        objectsInGame[o].draw(context, deltaTime);
    }
}