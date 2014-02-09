var objectsInGame;
var player;
var box;

var textToShow = "Animation enabled";
var colorOfText = "green";

$(document).ready(function () {
    player = new GameObject(
        function (obj) { //onload
            obj.setWidth(200); //width of object
            obj.setHeight(200); //height of object
            obj.setX(300); //position x of object
            obj.setY(300); //position y
            obj.dev.addSpeed = 10; //speed (dev is special variable that you can use to store your own variables without trouble about overwriting engines vars)

            obj.look[0].play(); //start animation
        },
        function (obj, deltaTime) { //loop
            if (key("up")) { //up key pressed
                obj.changeY(-obj.dev.addSpeed, deltaTime);
            } else if (key("down")) { //down
                obj.changeY(obj.dev.addSpeed, deltaTime);
            }

            if (key("left")) { //left
                obj.changeX(-obj.dev.addSpeed, deltaTime);
            } else if (key("right")) { //right
                obj.changeX(obj.dev.addSpeed, deltaTime);
            }

            if (!collision(obj, box)) {
                textToShow = "Animation enabled";
                colorOfText = "green"
                obj.look[0].play();
            } else {
                textToShow = "ANIMATION STOPPED";
                colorOfText = "red";
                obj.look[0].stop();
            }
        },
        [new AnimateImage(new LoadImage("res/sprite.png"), 1, 10, 0.16)]
    );

    box = new GameObject(
        function (obj) { //onload
            obj.setWidth(100);
            obj.setHeight(900);
            obj.setX(700);
            obj.setY(300);
            obj.dev.addSpeed = 10;

            obj.position = "corner"; //position point is in left top corner of object
        },
        function (obj, deltaTime) { //loop

        },
        [new SimpleStaticRectangle("green")]
    );

    objectsInGame = new Array(box, player);
});


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

    context.font = '40pt Calibri';
    context.fillStyle = colorOfText;
    context.fillText(textToShow, realx(10), realy(100));
}