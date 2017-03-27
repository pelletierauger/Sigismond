var points = [];
var draggy = 0;
var palette = ["ECD078", "D95B43", "C02942", "542437", "53777A"];
var currentColor = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    fill(255, 150);
    noStroke();
    frameRate(24);
    // rectMode(CENTER); 
}

function draw() {
    background(0);
    for (var i = 0; i < points.length; i++) {
        if (currentColor > 4) {
            currentColor = 0;
        }
        var col = hexToRgb(palette[currentColor]);
        fill(col.r, col.g, col.b);
        push();
        translate(points[i].x, points[i].y);
        ellipse(0, 0, 75);
        fill(255, 50);
        text(i, -3, 3);
        pop();
        currentColor++;
    }
    currentColor = 0;
}



function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function mousePressed() {
    points.push({
        x: mouseX,
        y: mouseY
    });
}

function mouseDragged() {
    if (draggy > 3) {
        points.push({
            x: mouseX,
            y: mouseY
        });
        draggy = 0;
    }
    draggy++;
}
