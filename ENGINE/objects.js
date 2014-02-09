function GameObject(onLoad, loop, appearance){
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.active = false;
	this.rotation = 0;
	this.look = appearance;
	this.activeAnimation = 0;
	this.dev = {}; //space for programmers own variables
    this.loop = loop;
    this.onLoad = onLoad;

    this.position = "center"; //or "corner". It tells where on object position point is
	
	this.setX = function(value){
		this.x = value;
	}

	this.setY = function(value){
		this.y = value;
	}

	this.changeX = function(value, deltaTime){
		this.x += value*deltaTime;
	}

	this.changeY = function(value, deltaTime){
		this.y += value*deltaTime;
	}

	this.update = function(deltaTime){
		this.loop(this, deltaTime);
	}

	this.setAnimation = function(number){
		this.activeAnimation = number;
	}

	this.draw = function(context, deltaTime){
		context.save();
        	context.translate(realx(this.x), realy(this.y));

			context.rotate((Math.PI / 180) * this.rotation);

			if (this.look[this.activeAnimation].type === "Image") {
        		this.look[this.activeAnimation].draw(context, deltaTime, this.width, this.height, this);
        	} else {
        		this.look[this.activeAnimation].draw(context, deltaTime, this);
        	}
        context.restore();
	}

	this.onLoad(this);

	return this;
}

try {
module.exports.GameObject = GameObject;
} catch(e){
}