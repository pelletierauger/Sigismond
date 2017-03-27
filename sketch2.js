var points = [];
var draggy = 0;
var palette = ["ECD078", "D95B43", "C02942", "542437", "53777A"];
var currentColor = 0;
// var title = Array

var previousPoints;
var exporting = false;
var drawCount = 0;

function preload() {
    previousPoints = loadJSON("points.json");
}

function setup() {
    createCanvas(600, 600);
    background(0);
    fill(255, 250);
    noStroke();
    frameRate(24);
    // rectMode(CENTER); 
    console.log(previousPoints);
}

function draw() {
    background(0);
    translate(-700, -300);
    scale(2, 2);
    var mappy = map(sin(frameCount / 10), -1, 1, 0, 1);
    // for (var i = 0; i < previousPoints.length; i++) {
    //     var d = previousPoints[i];
    //     ellipse(d[0], d[1], 0.5, 0.5);
    // }
    // translate(previousPoints[0][0], previousPoints[0][1]);
    for (var i = 0; i < previousPoints.length; i++) {
        var x = cos(i) * i / 85 + previousPoints[0][0];
        var y = sin(i) * i / 85 + previousPoints[0][1] + 15;
        var lerpX = lerp(x, previousPoints[i][0] - 10, mappy);
        var lerpY = lerp(y, previousPoints[i][1], mappy);
        push();
        translate(lerpX, lerpY);
        // ellipse(0, 0, 1, 1);
        for (var jj = 0; jj < 5; jj++) {
            var mapAlpha = map(jj, 0, 4, 0, 105);
            var mapSize = map(jj, 0, 4, 3, 0.01);
            fill(255, mapAlpha);
            ellipse(0, 0, mapSize, mapSize);
            // points.push([mouseX, mouseY]);
        }
        pop();
    }

    // background(0);
    // for (var i = 0; i < points.length; i++) {
    //     if (currentColor > 4) {
    //         currentColor = 0;
    //     }
    //     var col = hexToRgb(palette[currentColor]);
    //     fill(col.r, col.g, col.b);
    //     push();
    //     translate(points[i].x, points[i].y);
    //     for (var jj = 0; jj < 5; jj++) {
    //         var mapAlpha = map(jj, 0, 4, 0, 155);
    //         var mapSize = map(jj, 0, 4, 5, 1);
    //         fill(255, mapAlpha);
    //         ellipse(0, 0, mapSize, mapSize);

    //     }
    //     pop();
    //     currentColor++;
    // }
    // currentColor = 0;
    if (exporting) {
        frameExport();
    }
    drawCount++;
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
    for (var jj = 0; jj < 5; jj++) {
        var mapAlpha = map(jj, 0, 4, 0, 155);
        var mapSize = map(jj, 0, 4, 5, 1);
        fill(255, mapAlpha);
        ellipse(mouseX, mouseY, mapSize, mapSize);
        points.push([mouseX, mouseY]);
    }
}

function mouseDragged() {
    if (draggy > 1) {
        for (var jj = 0; jj < 5; jj++) {
            var mapAlpha = map(jj, 0, 4, 0, 155);
            var mapSize = map(jj, 0, 4, 5, 1);
            fill(255, mapAlpha);
            ellipse(mouseX, mouseY, mapSize, mapSize);
            points.push([mouseX, mouseY]);
        }
        draggy = 0;
    }
    draggy++;
}

function frameExport() {
    var formattedFrameCount = "" + drawCount;
    while (formattedFrameCount.length < 5) {
        formattedFrameCount = "0" + formattedFrameCount;
    }
    save("typolerp" + formattedFrameCount + ".png");
}
