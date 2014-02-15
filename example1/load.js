requirejs.config({
    "baseUrl": "",
    "paths": {
        "engine": "../engineFiles"
    }
});

/*
 *  GameEngine
 */
requirejs(["engine/canvasManager"]);
requirejs(["engine/mainFunctions"]);
requirejs(["engine/animations"]);
requirejs(["engine/objects"]);
requirejs(["engine/collisions"]);

/*
 *  YOUR SCRIPTS HERE
 */
requirejs(["EXAMPLE.js"]);