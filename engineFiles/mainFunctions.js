function realx(val){
    return val*(MAIN_CANVAS.width/GAME_WIDTH);
}
function realy(val){
    return val*(MAIN_CANVAS.height/GAME_HEIGHT);
}

function setRotationNormal(rotation) {
    while (rotation < 0) {
        rotation = 360 + rotation;
    }
    while (rotation > 360) {
        rotation = rotation - 360;
    }
    return rotation;
}