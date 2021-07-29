const paletteSize = 50;

var socket;

let h;
let palette;
let brushSize;

function setup() {
    createCanvas(700, 500);
    colorMode(HSB, 360, 100, 100);
    background(50, 5, 100);
    socket = io.connect('http://localhost:3000');
    socket.on('mouse', newDrawing); // Recieving the partner's data and sending it to a funtion
    h = 0;
    brushSize = 30;
    palette = [];

    for (let i = 0; i < width / paletteSize; i++) {
        let newHue = i * (360 / (width / paletteSize));
        let newColor = new pigment(newHue, i * paletteSize, height - paletteSize, i);
        console.log(`Added Hue: ${newHue}`);
        palette.push(newColor);
    }

    //console.log(palette);
}

// Individual colors in the palette
class pigment {
    constructor(h, x, y, id) {
        this.h = h;
        this.x = x;
        this.y = y;
        this.id = id;
    }

    setHue() {
        h = this.h;
    }
}

function draw() {
    noStroke();
    fill(h, 100, 100);
    circle(paletteSize, paletteSize, brushSize);

    for (let hue of palette) {
        fill(hue.h, 100, 100);
        square(hue.x, hue.y, paletteSize);
    }
}

function newDrawing(data) {
    // Partner's Drawing
    noStroke();
    fill(data.h, 50, 100);
    ellipse(data.x, data.y, data.brushSize, data.brushSize);
}

function mouseDragged() {
    console.log('Sending: (' + mouseX + ', ' + mouseY + ') and Color: (' + h + ')');

    var data = {
        x: mouseX,
        y: mouseY,
        h: h, // Hue
        brushSize: brushSize
    };
    socket.emit('mouse', data); // sending the brush's data thru socket 

    // User's Drawing
    noStroke();
    fill(h, 100, 100);
    ellipse(mouseX, mouseY, brushSize, brushSize);
}

// Double clicking on a color to change the brush hue
function doubleClicked() {
    console.log("clicked");
    for (let hue of palette) {
        if ((mouseX > hue.x && mouseX < hue.x + paletteSize) && (mouseY > height - paletteSize)) {
            hue.setHue();
            console.log('Changed to color ID: ' + hue.id + '; Hue: ' + hue.h);
            break;
        }
    }
}

function keyPressed() {
    // Key presses to change color

    // if (keyCode === 82) {
    //     console.log("red");
    //     setHue(0);
    // }
    // if (keyCode === 66) {
    //     console.log("blue");
    //     h = 230;
    // }
    // if (keyCode === 71) {
    //     console.log("green");
    //     h = 120;
    // }

    // Changing the brush size wit "[" and "]"
    if (keyCode === 221) {
        if (brushSize >= 80) {
            brushSize = 80;
        } else {
            fill(50, 5, 100);
            circle(paletteSize, paletteSize, brushSize + 2);
            brushSize += 5;
            console.log("increase brush size to " + brushSize);
        }
    }
    if (keyCode === 219) {
        if (brushSize <= 5) {
            brushSize = 5;
        } else {
            fill(50, 5, 100);
            circle(paletteSize, paletteSize, brushSize + 2);
            brushSize -= 5;
            console.log("decrease brush size to " + brushSize);
        }
    }
}