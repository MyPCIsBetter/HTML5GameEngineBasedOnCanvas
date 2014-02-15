function websocketConnection(object, otherObjects){
    var socket; //Socket connection

    if(object === undefined || object === null) console.err("NO OBJECT");

    this.playerObject = object;
    this.otherObjects = otherObjects;

    // Initialise socket connection
	socket = io.connect("http://localhost", {port: 3000, transports: ["websocket"]});

    // Socket connection successful
	socket.on("connect", onSocketConnected);

	// Socket disconnection
	socket.on("disconnect", onSocketDisconnect);

	// New player message received
	socket.on("new player", onNewPlayer);

	// Player move message received
	socket.on("move player", onMovePlayer);

	// Player removed message received
	socket.on("remove player", onRemovePlayer);

    // Socket connected
    var onSocketConnected = function () {
	    console.log("Connected to socket server");

	    // Send local player data to the game server
	    socket.emit("new player", {onLoad: this.playerObject.onLoad, loop: this.playerObject.loop, appearance: this.playerObject.look});
    };

    // Socket disconnected
    function onSocketDisconnect() {
	    console.log("Disconnected from socket server");
    };

    // New player
    function onNewPlayer(data) {
	    console.log("New player connected: "+data.id);

	    // Initialise the new player
	    var newPlayer = data.object;
	    newPlayer.id = data.id;

	    // Add new player to the remote players array
	    remotePlayers.push(newPlayer);
    };

    // Move player
    function onMovePlayer(data) {
	    var movePlayer = playerById(data.id);

	    // Player not found
	    if (!movePlayer) {
		    console.log("Player not found: "+data.id);
		    return;
	    };

	    // Update player position
	    movePlayer.setX(data.x);
	    movePlayer.setY(data.y);
    };

    // Remove player
    function onRemovePlayer(data) {
	    var removePlayer = playerById(data.id);

	    // Player not found
	    if (!removePlayer) {
		    console.log("Player not found: "+data.id);
		    return;
	    };

	    // Remove player from array
	    remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
    };

    // Find player by ID
    function playerById(id) {
	    for (var i = 0; i < this.otherObjects.length; i++) {
		    if (this.otherObjects[i].id == id)
			    return this.otherObjects[i];
	    };
	
	    return false;
    };

    function update() {
        // Send local player data to the game server
		socket.emit("move player", {x: this.playerObject.getX(), y: this.playerObject.getY()});
    };

    return this;
}