function GameObject(onLoad, loop, appearance, audio){
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.active = false;
	this.rotation = 0;
	this.look = appearance;
	this.activeAnimation = "";
	this.dev = {}; //space for programmers own variables
    this.loop = loop;
    this.onLoad = onLoad;
    this.collideWith = [];
    this.sounds = audio;

    this.position = "center"; //or "corner". It tells where on object position point is
	
	this.setX = function(value){
		this.x = realx(value);
	}

	this.setY = function(value){
		this.y = realy(value);
	}

	this.setWidth = function(value){
	    this.width = realx(value);
	}

	this.setHeight = function(value) {
	    this.height = realy(value);
	}

	this.changeX = function(value, deltaTime){
		this.x += realx(value)*deltaTime;
	}

	this.changeY = function(value, deltaTime){
		this.y += realy(value)*deltaTime;
	}

	this.playAnimation = function (name) {
	    this.activeAnimation = name;
	    this.look[name].play();
	}

	this.stopAnimation = function (name) {
	    this.look[name].stop();
	}

	this.checkThenMoveX = function (value, deltaTime) {
	    this.oldctmx = this.x;
	    this.x += realx(value) * deltaTime;
	    if (itCollideWithThem(this, this.collideWith)) {
	        this.x = this.oldctmx;
	        return false;
	    }
	    return true;
	}

	this.checkThenMoveY = function (value, deltaTime) {
	    this.oldctmy = this.y;
	    this.y += realy(value) * deltaTime;
	    if (itCollideWithThem(this, this.collideWith)) {
	        this.y = this.oldctmy;
	        return false;
	    }
	    return true;
	}

	this.update = function(deltaTime){
		this.loop(this, deltaTime);
	}

	this.setLook = function(name){
	    this.activeAnimation = name;
	    if (this.look[name].play !== undefined) {
	        this.playAnimation(name);
	    }
	}

	this.draw = function(context, deltaTime){
		context.save();
        	context.translate(this.x, this.y);

			context.rotate((Math.PI / 180) * this.rotation);
			if (this.look[this.activeAnimation] !== undefined) {
			    this.look[this.activeAnimation].draw(context, deltaTime, this);
			} else if (this.look[0] !== undefined) {
			    this.look[0].draw(context, deltaTime, this);
			}

        context.restore();
	}

	this.onLoad(this);

	return this;
}

//try {
//    module.exports.GameObject = GameObject;
//} catch(e){
//}