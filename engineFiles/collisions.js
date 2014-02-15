function collision(object1, object2) {
    this.centerObject1X = object1.x;
    this.centerObject1Y = object1.y;
    this.centerObject2X = object2.x;
    this.centerObject2Y = object2.y;

    if (object1.position === "corner") {
        this.centerObject1X = object1.x + (object1.width / 2);
        this.centerObject1Y = object1.y + (object1.height / 2);
    }

    if (object2.position === "corner") {
        this.centerObject2X = object2.x + (object2.width / 2);
        this.centerObject2Y = object2.y + (object2.height / 2);
    }

    this.distX = this.centerObject1X - this.centerObject2X; //distance between objects
    this.distY = this.centerObject1Y - this.centerObject2Y; //distance between objects

    if(distX < 0){
        distX = -distX;
    }
    if (distY < 0) {
        distY = -distY;
    }

    if (distX < (object1.width / 2) + (object2.width / 2)) {
        if (distY < (object1.height / 2) + (object2.height / 2)) {
            return true;
        }
    }
	return false;
}

function itCollideWithThem(object, arrayOfObjects){
	for(var aoo in arrayOfObjects){
		if(collision(object, arrayOfObjects[aoo])){
			return true;
		}
	}
	return false;
}

function isInside(point, object){
	this.vertices = [
		[object.x-(object.width/2), object.y-(object.height/2)], //-1, -1
		[object.x+(object.width/2), object.y-(object.height/2)], //1, -1
		[object.x+(object.width/2), object.y+(object.height/2)], //1, 1
		[object.x-(object.width/2), object.y+(object.height/2)]  //-1, 1
	];

	if(point.x > vertices[0][0] && point.x < vertices[1][0]){ //collision X axis
		if(point.y > vertices[0][1] && point.y < vertices[2][1]){ //collision Y axis
			return true;
		}
	}

	return false;
}