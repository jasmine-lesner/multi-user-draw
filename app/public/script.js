var socket;
let r, g, b;

function setup() {
    createCanvas(600, 400);
    background(51);
    socket = io.connect('http://localhost:3000');
    socket.on('mouse', newDrawing);
    r = 0;
    g = 255;
    b = 0;
}

function newDrawing(data) {
    noStroke();
    fill(data.r, data.g, data.b);
    ellipse(data.x, data.y, 36, 36);
}

function mouseDragged() {
    console.log('Sending: (' + mouseX + ', ' + mouseY + ') and Color: (' + r + ', ' + g + ', ' + b + ')');

    var data = {
        x: mouseX,
        y: mouseY,
        r: r,
        g: g,
        b: b
    };
    socket.emit('mouse', data);

    noStroke();
    fill(r, g, b);
    ellipse(mouseX, mouseY, 36, 36);
}

function draw() {
    noStroke();
    fill(r, g, b);
    square(0, 0, 50);
}

function keyPressed() {
    if (keyCode === 82) {
        console.log("red");
        r = 255;
        g = 0;
        b = 0;
    }
    if (keyCode === 66) {
        console.log("blue");
        r = 0;
        g = 0;
        b = 255;
    }
    if (keyCode === 71) {
        console.log("green");
        r = 0;
        g = 255;
        b = 0;
    }
}