var objectsInGame;
var player;
var box;

var textToShow = "Animation enabled";
var colorOfText = "green";

var LOAD_GAME =  function() { //all game here
    player = new GameObject( //creating new object
        function (obj) { //onload
            obj.setWidth(200); //width of object
            obj.setHeight(200); //height of object
            obj.setX(300); //position x of object
            obj.setY(300); //position y
            obj.dev.addSpeed = 10; //speed (dev is special variable that you can use to store your own variables without trouble about overwriting engines vars)

            obj.playAnimation("whiteGuy"); //start animation named WhiteGuy
        },
        function (obj, deltaTime) { //loop
            //"obj" is the object. This variable contains every information about this
            //You can see all functions that can be used with "obj" in engineFiles/objects.js file
        
            obj.collideWith = [box]; //objects that collides with this object 

            var bang = false; //bang means "player collided with something"

            if (key("up")) { //up key pressed
                bang = !obj.checkThenMoveY(-obj.dev.addSpeed, deltaTime); //checkThanMove: function first checks if there is no collision, then moves object. Returns true if there is no collision
                //if you don't want to check collisions, use obj.changeX(speed_value_here, deltaTime);
            } else if (key("down")) { //down
                bang = !obj.checkThenMoveY(obj.dev.addSpeed, deltaTime);
            }
            if (key("left")) { //left
                bang = !obj.checkThenMoveX(-obj.dev.addSpeed, deltaTime);
            } else if (key("right")) { //right
                bang = !obj.checkThenMoveX(obj.dev.addSpeed, deltaTime);
            }
            
            //key() function supports only "up", "down", "left", "right" keys, but you can add more in canvasManager.js file

            if (bang) {
                obj.sounds["bang"].play(); //play the sound
            }

            if (!collision(obj, box)) { //check collision between "obj" (this object) and array of other objects. True if there is a collision
                textToShow = "Animation enabled";
                colorOfText = "green"
                obj.playAnimation("whiteGuy");
            } else {
                textToShow = "ANIMATION STOPPED";
                colorOfText = "red";
                obj.stopAnimation("whiteGuy");
            }
        },
        {
            //this is "appearance". This is an array, so you can specify more appearances (for example animations of jumping, running etc.)
            "whiteGuy": new AnimateImage(new LoadImage("res/sprite.png"), 1, 10, 0.16)
            //so you created appearance called "whiteGuy" of the type "AnimateImage".
            //use "obj.setLook("greenBox");" to make it visible. For animations use "obj.playAnimation("whiteGuy");"
            //there are other types of appereance here. See them in: engineFiles/animations.js
        },
        { 
            //sounds here
            "bang": new Audio("res/bang_2.wav") //sound called "bang"
            //play it using "obj.sounds["bang"].play();"
        }
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
        [new SimpleStaticRectangle("green")],
        null
    );

    objectsInGame = new Array(box, player);
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

    context.font = '40pt Calibri';
    context.fillStyle = colorOfText;
    context.fillText(textToShow, realx(10), realy(100));
}
