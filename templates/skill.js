let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/w6_VC0C8o/';

// Video
let video;
let flippedVideo;
// To store the classification
let letter = "";

// Combined letters
let combinedLetters = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);

  // Add event listeners to buttons
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', startPrediction);

  const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', addLetter);

  const spaceButton = document.getElementById('spaceButton');
  spaceButton.addEventListener('click', addSpace);

  const clearButton = document.getElementById('clearButton');
  clearButton.addEventListener('click', clearLastLetter);

  const newLineButton = document.getElementById('newLineButton');
  newLineButton.addEventListener('click', addNewLine);

  const copyButton = document.getElementById('copyButton');
  copyButton.addEventListener('click', copyCombinedLetters);
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Update the text of the combinedLettersElement
  const combinedLettersElement = document.getElementById('combinedLetters');
  combinedLettersElement.innerText = combinedLetters;
}

// Start prediction
function startPrediction() {
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }

  // Get the current prediction
  const currentLetter = results[0].label;

  letter = currentLetter;

  // Classify again!
  classifyVideo();
}

// Add the current letter to the combined letters
function addLetter() {
  combinedLetters += letter;
}

// Add a space to the combined letters
function addSpace() {
  combinedLetters += " ";
}

// Clear the last letter
function clearLastLetter() {
  combinedLetters = combinedLetters.slice(0, -1);
}

// Add a new line to the combined letters
function addNewLine() {
  combinedLetters += "\n";
}

// Copy the combined letters to the clipboard
function copyCombinedLetters() {
  navigator.clipboard.writeText(combinedLetters);
}
