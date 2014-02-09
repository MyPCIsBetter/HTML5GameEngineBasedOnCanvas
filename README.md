#Game Engine 
Some functions that speeds up making games using canvas.

##How to set it up:
Load some javascript. Paste it between "head" tags.
```html
<script src="ENGINE/libs/jquery.js"></script>

<script src="ENGINE/canvasManager.js"></script>
<script src="ENGINE/mainFunctions.js"></script>
<script src="ENGINE/animations.js"></script>
<script src="ENGINE/objects.js"></script>
<script src="ENGINE/collisions.js"></script>

<!-- Here you can keep your game code -->
```
Create canvas (it can have any width and height, bigger one = better resolution of game).

**My game engine support special unit, that help you keep game look the same at any size of canvas. Use realx(sth) and realy(sth)**
```html
<canvas id="canvToRedraw" width="640" height="480"></canvas>
```
##How to use:
Create simple object:
```js
var box = new GameObject(
    function (obj) { //onload: this is exected while game loading
        obj.width = 100;
        obj.height = 900;
        obj.x = 700;
        obj.y = 300;
    },
    function (obj, deltaTime) { //loop: this is executed every grame of game

    },
    [new SimpleStaticRectangle("green")] //appearance array: here you can set up appearance of your object
);
```
Then, you have to tell browser, that you want to show this object on screen:
```js
var objectsInGame = new Array(box);
```
Finally add this at the end of code:
```js
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
```
##Animations, appearance of object
It's really easy to create animated object.

GameObject requires 3 variables: (onload_function, loop_function, **appearance**)

Appearance can hold different types of classes:

###SimpleStaticRectangle(color)
Creates rectangle.

Color - color of rectangle

###AnimateImage(image, rows, columns, speed)
image - paste here: [new LoadImage([**path_to_your_image**])]

rows - number of rows in your image

columns - number of columns

speed - speed of animation

EXAMPLE:

[Example of image](https://dl.dropboxusercontent.com/u/59608446/sprite.png)

```js
[new AnimateImage([new LoadImage("res/sprite.png")], 1, 10, 0.16)]
```
