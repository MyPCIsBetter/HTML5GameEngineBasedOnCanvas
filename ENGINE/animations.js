function LoadImage(src) {
    var _this = this;
    this.type = "Image";
    this.image = new Image();
    this.ready = false;
    this.image.src = src;
    this.image.onload = function() {
        _this.ready = true;
    };
    return this;
}

function AnimateImage(image, rows, columns, speed){
    //speed is in sec
	this.animX = 0;
	this.animY = 0;
	this.rows = rows;
	this.columns = columns;
	this.image = image;
	this.imageID = 0;
	this.lastChange = Date.now(); //last change of frame
	this.animSpeed = speed*1000;

	this.animState = "stop"; //stop or play

	this.calcXandY = function(deltaTime){
		if(this.animState === "play"){
			this.framesJump = 0; //add some frames base on time
			if(this.animSpeed !== 0){
				this.framesJump = Math.round((Date.now() - this.lastChange)/this.animSpeed);
			}

			for(var dd=0; dd<this.framesJump; dd++){
				if(this.animX < columns-1){
					this.animX++;
				} else {
					if(this.animY != rows-1){
						this.animY++;
						this.animX = 0;
					} else {
						this.animY = 0;
						this.animX = 0;
					}
				}
				this.lastChange = Date.now();
			}
		}
	}

	this.draw = function(context, deltaTime, obj){
		this.calcXandY(deltaTime);
		this.frameWidth = obj.width;
		this.frameHeight = obj.height;

		this.obrazek = this.image.image;

		this.xOfImage = 0;
		this.yOfImage = 0;
		if (obj.position === "center") {
		    this.xOfImage = -this.frameWidth / 2;
		    this.yOfImage = -this.frameHeight / 2;
		} //corner = 0, so nothing to change

        context.drawImage(
            this.obrazek, //image
            this.animX * (this.obrazek.width / this.columns), //The x coordinate where to start clipping
            this.animY * (this.obrazek.height / this.rows), //The y coordinate where to start clipping
            this.obrazek.width / this.columns, //The width of the clipped image
            this.obrazek.height / this.rows, //The height of the clipped image
            this.xOfImage, //x
            this.yOfImage, //y
            this.frameWidth, //width
            this.frameHeight //height
        );
	}

	this.stop = function(){
		this.animState = "stop";
	}

	this.play = function(){
		this.animState = "play";
	}

	this.toggle = function () {
	    if (this.animState === "play") {
	        this.animState = "stop";
	    } else if (this.animState === "stop") {
	        this.animState = "play";
	    } else {
	        console.err("Cannot recognise animState");
	    }
	}

	return this;
}

function AnimateUsingContext(ascript){
	this.ascript = ascript;

	this.draw = function(context, deltaTime, object){
		this.ascript(context, deltaTime, object);
	}

	return this;
}

function SimpleStaticRectangle(color){
    this.color = color;
    this.draw = function(context, deltaTime, obj){
        if(obj.position==="center"){
            context.beginPath();
		    context.fillStyle = this.color;
		    context.rect(-obj.width/2, -obj.height/2, obj.width, obj.height);
      	    context.fill();
        } else if (obj.position === "corner") {
            context.beginPath();
		    context.fillStyle = this.color;
		    context.rect(0, 0, obj.width, obj.height);
      	    context.fill();
        }
    }
}

function Sprite(image) {
    this.image = image;

    this.draw = function (context, deltaTime, obj) {
        if (obj.position === "center") {
            context.drawImage(image, obj.x - (obj.width / 2), obj.y - (obj.height / 2), obj.width, obj.height);
        } else if (obj.position === "corner") {
            context.drawImage(image, obj.x, obj.y, obj.width, obj.height);
        }
    }
}