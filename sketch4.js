var points = [];
var draggy = 0;
var palette = ["ECD078", "D95B43", "C02942", "542437", "53777A"];
var currentColor = 0;
// var title = Array
var s = 2.5;
var wave = 0;

var previousPoints;
var exporting = false;
var drawCount = 0;

function preload() {
    points = loadJSON("points4.json");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    fill(255, 170);
    noStroke();
    frameRate(24);
    // rectMode(CENTER); 
    // console.log(previousPoints);
}

function draw() {
    background(0);
    translate(50, 40);
    // scale(2, 2);
    // var mappy = map(sin(frameCount / 10), -1, 1, 0, 1);
    // // for (var i = 0; i < previousPoints.length; i++) {
    // //     var d = previousPoints[i];
    // //     ellipse(d[0], d[1], 0.5, 0.5);
    // // }
    // // translate(previousPoints[0][0], previousPoints[0][1]);
    // for (var i = 0; i < previousPoints.length; i++) {
    //     var x = cos(i) * i / 85 + previousPoints[0][0];
    //     var y = sin(i) * i / 85 + previousPoints[0][1] + 15;
    //     var lerpX = lerp(x, previousPoints[i][0] - 10, mappy);
    //     var lerpY = lerp(y, previousPoints[i][1], mappy);
    //     push();
    //     translate(lerpX, lerpY);
    //     // ellipse(0, 0, 1, 1);
    //     for (var jj = 0; jj < 5; jj++) {
    //         var mapAlpha = map(jj, 0, 4, 0, 105);
    //         var mapSize = map(jj, 0, 4, 3, 0.01);
    //         fill(255, mapAlpha);
    //         ellipse(0, 0, mapSize, mapSize);
    //         // points.push([mouseX, mouseY]);
    //     }
    //     pop();
    // }

    // // background(0);
    // fill(255, 70);
    // for (var i = 0; i < points.length; i++) {
    //     var mapR = map(sin(frameCount / 8), -1, 1, 0, 5);
    //     var mapNX = map(noise(i + frameCount / 10), 0, 1, 0, 5);
    //     var mapNY = map(noise(i + 100 + frameCount / 10), 0, 1, 0, 5);
    //     push();
    //     translate(points[i][0], points[i][1]);
    //     // translate(random(-mapR, mapR), random(-mapR, mapR));
    //     // translate(random(-mapN, mapN), random(-mapN, mapN));
    //     translate(15 + mapNX, 15 + mapNY);
    //     ellipse(0, 0, s, s);
    //     pop();
    // }
    // fill(255, 190);

    for (var i = 0; i < points.length; i++) {
        var mapR = map(sin(frameCount / 8), -1, 1, 0, 25);
        var mapNX = map(noise(i + frameCount / 10), 0, 1, 0, 15);
        var mapNY = map(noise(i + 100 + frameCount / 10), 0, 1, 0, 15);
        push();
        translate(points[i][0], points[i][1]);

        // translate(random(-mapN, mapN), random(-mapN, mapN));
        translate(mapNX, mapNY);
        if (i >= wave - 435 && i <= wave + 435) {
            var waveVal = map(abs(i - wave), 0, 535, 35, 0);
            translate(0, waveVal);
            translate(random(-waveVal, waveVal), random(-waveVal, waveVal));
            // translate(random(-mapR, mapR), random(-mapR, mapR));
            // translate(mapNX * 10, mapNY * 10);
            s = max(2.5, waveVal * 0.1);
        }

        ellipse(0, 0, s, s);
        s = 2.5;
        pop();
    }
    wave += 65;
    if (wave > points.length) {
        wave = 0;
    }
    // currentColor = 0;
    if (exporting) {
        frameExport();
    }
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
    var formattedFrameCount = "" + frameCount;
    while (formattedFrameCount.length < 5) {
        formattedFrameCount = "0" + formattedFrameCount;
    }
    save("typorandom" + formattedFrameCount + ".png");
}
