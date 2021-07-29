var socket;
let h;

function setup() {
    createCanvas(600, 400);
    background(51);
    colorMode(HSB, 360, 100, 100);
    socket = io.connect('http://localhost:3000');
    socket.on('mouse', newDrawing);
    h = 0;
}

// class pigment {

// }

function draw() {
    noStroke();
    fill(h, 100, 100);
    square(0, 0, 50);
}

function newDrawing(data) {
    noStroke();
    fill(data.h, 50, 100);
    ellipse(data.x, data.y, 36, 36);
}

function mouseDragged() {
    console.log('Sending: (' + mouseX + ', ' + mouseY + ') and Color: (' + h + ')');

    var data = {
        x: mouseX,
        y: mouseY,
        h: h
    };
    socket.emit('mouse', data);

    noStroke();
    fill(h, 100, 100);
    ellipse(mouseX, mouseY, 36, 36);
}

function keyPressed() {
    if (keyCode === 82) {
        console.log("red");
        h = 0;
    }
    if (keyCode === 66) {
        console.log("blue");
        h = 230;
    }
    if (keyCode === 71) {
        console.log("green");
        h = 120;
    }
}