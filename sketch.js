let video;
let poseNet;
let img;
let catEars;
let specs;
let tiara;
let leftEye, leftEar, rightEye;
let imageSelected = "";

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', gotPoses);

  catEars = createButton('Cat Ears');
  catEars.style('font-size', '18px');
  catEars.mouseClicked(
    () => {
      img = loadImage('catears.png');
      imageSelected = 'cat';
    }
  );
  
  specs = createButton('Spectacles');
  specs.style('font-size', '18px');
  specs.mouseClicked(
    () => {
      img = loadImage('specs.png');
      imageSelected = 'specs';
    }
  );
  
  tiara = createButton('Tiara');
  tiara.style('font-size', '18px');
  tiara.mouseClicked(
    () => {
      img = loadImage('tiara.png');
      imageSelected = 'tiara';
    }
  );
}

function gotPoses(poses) {
  if (poses.length > 0) {
    leftEye = poses[0].pose.leftEye;
    leftEar = poses[0].pose.leftEar;
    rightEye = poses[0].pose.rightEye;
  }
  console.log(poses)
}

function modelReady() {
  console.log("Model Loaded, finally!");
}

function draw() {
  background(220);
  image(video, 0, 0);
  
  if(imageSelected == 'specs'){
  image(img, rightEye.x - 60 , rightEye.y - 70);
  }else if(imageSelected == 'cat'){
    image(img, leftEye.x - 160, leftEye.y - 170);
  }else if(imageSelected == 'tiara'){
    image(img,  leftEar.x - 200, leftEar.y - 220); 
  }
}