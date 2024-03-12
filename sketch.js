let classifier;
let webcam;

function preload() {
    classifier = ml5.imageClassifier('waste-classification-model/model.json');
}

function setup() {
    createCanvas(400, 400);
    webcam = createCapture(VIDEO);
    webcam.size(500, 320);

    document.getElementById('captureButton').addEventListener('click', classifyImage);
    document.getElementById('webcamContainer').appendChild(webcam.elt);
}

function classifyImage() {
    classifier.classify(webcam, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    const label = results[0].label;
    document.getElementById('resultLabel').innerText = 'Detected: ' + label;
    document.getElementById('confidence').innerText = 'Confidence: ' + nf(results[0].confidence, 0, 2);

    let binColor;
    if (label === 'cardboard' || label === 'paper') {
        binColor = 'Brown Bin 🟤';
    } else if (label === 'plastic') {
        binColor = ' Yellow Bin 🟡';
    } else if (label === 'trash') {
        binColor = 'Black Bin ⚫';
    } else if (label === 'bio') {
        binColor = 'Green Bin 🟢';
    } else if (label === 'glass') {
        binColor = 'White Bin ⚪';
    } else if (label === 'metal') {
        binColor = 'Blue Bin 🔵';
    } else {
        binColor = 'Unknown';
    }
    document.getElementById('binColor').innerText = '🗑️ ' + binColor;
}

