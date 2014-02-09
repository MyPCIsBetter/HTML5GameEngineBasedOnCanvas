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
	this.type = "Image"; //inform app that will receive image

	//speed in sec
	this.animX = 0;
	this.animY = 0;
	this.rows = rows;
	this.columns = columns;
	this.image = image;
	this.imageID = 0;
	this.frameWidth = 0;
	this.frameHeight = 0;
	this.lastChange = Date.now();
	this.animSpeed = speed*1000;

	this.animState = "stop";

	this.calcXandY = function(deltaTime){
		if(this.animState === "play"){
			this.add = 0;
			if(this.animSpeed !== 0){
				this.add = Math.round((Date.now() - this.lastChange)/this.animSpeed);
			}
			//console.log("Add: " + this.add);
			for(var dd=0; dd<this.add; dd++){
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

	this.draw = function(context, deltaTime, frameWidth, frameHeight, obj){
		this.calcXandY(deltaTime);
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;

		this.obrazek = this.image[this.imageID].image;
		//console.log("this.obrazek.width: " + (this.obrazek.width/this.columns));

		if (obj.position === "center") {
		    context.drawImage(
                this.obrazek, //image
                this.animX * (this.obrazek.width / this.columns), //The x coordinate where to start clipping
                this.animY * (this.obrazek.height / this.rows), //The y coordinate where to start clipping
                this.obrazek.width / this.columns, //The width of the clipped image
                this.obrazek.height / this.rows, //The height of the clipped image
                realx(-this.frameWidth / 2), //x
                realy(-this.frameHeight / 2), //y
                realx(this.frameWidth), //width
                realy(this.frameHeight) //height
            );
		} else if (obj.position === "corner") {
		    context.drawImage(
                this.obrazek, //image
                this.animX * (this.obrazek.width / this.columns), //The x coordinate where to start clipping
                this.animY * (this.obrazek.height / this.rows), //The y coordinate where to start clipping
                this.obrazek.width / this.columns, //The width of the clipped image
                this.obrazek.height / this.rows, //The height of the clipped image
                0, //x
                0, //y
                realx(this.frameWidth), //width
                realy(this.frameHeight) //height
            );
		}

		//context.rect(realx(-this.frameWidth / 2), realy(-this.frameHeight / 2), 10, 10); //left top
		//context.rect(realx(-this.frameWidth / 2) + realx(this.frameWidth) - 10, realy(-this.frameHeight / 2), 10, 10); //right top
		//context.rect(realx(-this.frameWidth / 2) + realx(this.frameWidth) - 10, realy(-this.frameHeight / 2) + realy(this.frameHeight) - 10, 10, 10); //right bottom
		//context.rect(realx(-this.frameWidth / 2), realy(-this.frameHeight / 2) + realy(this.frameHeight) - 10, 10, 10); //left bottom
		//context.fillStyle = 'yellow';
		//context.fill();
	}

	this.stop = function(){
		this.animState = "stop";
	}

	this.play = function(){
		this.animState = "play";
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
		    context.rect(realx(-obj.width/2), realy(-obj.height/2), realx(obj.width), realy(obj.height));
      	    context.fill();
        } else if (obj.position === "corner") {
            context.beginPath();
		    context.fillStyle = this.color;
		    context.rect(0, 0, realx(obj.width), realy(obj.height));
      	    context.fill();
        }
    }
}