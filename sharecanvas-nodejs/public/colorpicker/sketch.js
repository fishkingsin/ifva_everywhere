// color picker with drawing space!!


// /////////////////////////////
// ////jasmine c. lee <3 ///////
// ////////////////////////////



// let's name some variables :)

  var x; // where the spectrum starts (y)
  var end; // where the spectrum ends (y)
  var totalSize; // height of the spectrum

  // color values
  var rd;
  var gr;
  var bl;

  // array of colors in spectrum
  var colorAtTime;
  var array;
  var arrayR;
  var arrayG;
  var arrayB;

  // the colors at the specific time (what you're hovering over)
  var rNow;
  var gNow;
  var bNow;
  var colNow;

  // the colors you've selected
  var rChoice;
  var gChoice;
  var bChoice;

  // size of the screen that is for the slider
  var sliderSide;

  // var link;



function setup() {
  createCanvas(1200,600);
  smooth();
  background(255);


  // link = createDiv('created by <a href="http://twitter.com/jasmineclee" target="_blank">jasmine c. lee</a> <3');
  // link.position(900, 700);

  x = 100;
  end = height-100;
  totalSize = height-200;

  rd = 255;
  gr = 0;
  bl = 0;

  rChoice = 0;
  gChoice = 0;
  bChoice = 0;

  sliderSide = 600;

  array = [rd+", "+gr+", "+bl];
  arrayR = [rd];
  arrayG = [gr];
  arrayB = [bl];

  // rectangle at the bottom that will represent the color hovered on or selected
  rect(225,height-75,150,50);

  // drawing pad
  rect(sliderSide, 100, 500, height-200);

  // initial text at the top (where your color's RGB will be)
  push();
    textSize(20);
    textAlign(CENTER);
    noStroke();
    text("YOUR COLOR WILL BE HERE",0,55,sliderSide,20);
  pop();

  // text on the right telling you how to refresh the drawing pad
  push();
    fill(130);
    textSize(18);
    noStroke();
    text("Press 'r' to refresh your drawing.",sliderSide,520,width,18);
  pop();

  // text on the right telling you how to pull up the eraser
  push();
    fill(130);
    textSize(18);
    noStroke();
    text("Press 'e' to turn on the eraser.",sliderSide,548,width,18);
  pop();

  // text on the right telling you how to turn on the black color
  push();
    fill(130);
    textSize(18);
    noStroke();
    text("Press 'b' to turn on the black color.",sliderSide,576,width,18);
  pop();


}




function draw() {

  colorPicker(100 + totalSize/6, 100 + totalSize/3, 100 + totalSize/2, 100 + totalSize*2/3, 100 + totalSize*5/6, 100 + totalSize);
  choice();

}



// function to make rectangles for the spectrum
function makeRect(y){
  noStroke();
  rect(200, y, 200, 1);
}



// function for whole color picker spectrum; increments represent the six segments of color changing
function colorPicker(increment1, increment2, increment3, increment4, increment5, increment6){


  while(x < increment1){
    fill(0);            // this is here just in case I want to add a darker color option/slider later
    makeRect(x);        // same as above
    fill(rd, gr, bl);   // fills the color of rectangle
    makeRect(x);        // makes rectangles incrementing by 1 pixel in height
    x += 1;
    bl += 3.825;        // each rectangle changes color by this amount

    colorAtTime = rd+", "+gr+", "+bl;
    append(array, colorAtTime);       // adds the color values of the rectangle to an array
    append(arrayR, rd);               // adds the red value of the rectangle to an array
    append(arrayG, gr);               // adds the green value of the rectangle to an array
    append(arrayB, bl);               // adds the blue value of the rectangle to an array

  }
  while(x >= increment1 && x < increment2){
    fill(0);
    makeRect(x);
    fill(rd, gr, bl);
    makeRect(x);
    x += 1;
    rd -= 3.825;

    colorAtTime = rd+", "+gr+", "+bl;
    append(array, colorAtTime);
    append(arrayR, rd);
    append(arrayG, gr);
    append(arrayB, bl);
  }
  while(x >= increment2 && x < increment3){
    fill(0);
    makeRect(x);
    fill(rd, gr, bl);
    makeRect(x);
    x += 1;
    gr += 3.825;

    colorAtTime = rd+", "+gr+", "+bl;
    append(array, colorAtTime);
    append(arrayR, rd);
    append(arrayG, gr);
    append(arrayB, bl);
  }
  while(x >= increment3 && x < increment4){
    fill(0);
    makeRect(x);
    fill(rd, gr, bl);
    makeRect(x);
    x += 1;
    bl -= 3.825;

    colorAtTime = rd+", "+gr+", "+bl;
    append(array, colorAtTime);
    append(arrayR, rd);
    append(arrayG, gr);
    append(arrayB, bl);
  }
  while(x >= increment4 && x < increment5){
    fill(0);
    makeRect(x);
    fill(rd, gr, bl);
    makeRect(x);
    x += 1;
    rd += 3.825;

    colorAtTime = rd+", "+gr+", "+bl;
    append(array, colorAtTime);
    append(arrayR, rd);
    append(arrayG, gr);
    append(arrayB, bl);
  }
  while(x >= increment5 && x < increment6){
    fill(0);
    makeRect(x);
    fill(rd, gr, bl);
    makeRect(x);
    x += 1;
    gr -= 3.825;

    colorAtTime = rd+", "+gr+", "+bl;
    append(array, colorAtTime);
    append(arrayR, rd);
    append(arrayG, gr);
    append(arrayB, bl);
  }
}


// function for whatever you're hovering over
function choice(){

  if(mouseX > 200 && mouseX < 400){
    if(mouseY >= 100 && mouseY < 100 + totalSize){

      value = mouseY-100        // this is to get determine where in the array you are (because at mouseY = 100, you're at the 0 index of the array)

      rNow = arrayR[value];     // sets the red value of what you're hovering over, from the array
      gNow = arrayG[value];     // sets the green value of what you're hovering over, from the array
      bNow = arrayB[value];     // sets the blue value of what you're hovering over, from the array

      if(rNow < 0){             // this is to deal with any math that made the value less than 0
        rNow = 0;
      }
      if(rNow > 255){           // this is to deal with any math that made the value greater than 255
        rNow = 255;
      }
      if(gNow < 0){
        gNow = 0;
      }
      if(gNow > 255){
        gNow = 255;
      }
      if(bNow < 0){
        bNow = 0;
      }
      if(bNow > 255){
        bNow = 255;
      }

      colNow = array[value];
      stroke(255);
      fill(0);                  // this is here just in case I want to add a darker color option/slider later
      rect(225, height-75,150,50);
      fill(rNow, gNow, bNow);

    }
  }
  // else{
  //   fill(255);
  // }
  rect(225, height-75,150,50);    // this creates the rectangle at the bottom (but now, it's filled in w/ the color you're hovering over OR you have selected)

}



function mousePressed(){


// this is to say: if you press on any part of the spectrum, you will make display the selected color at the rectangle AND fill in the rectangle at the bottom
  if(mouseY >= 100 && mouseY < 100 + totalSize){
    if(mouseX > 200 && mouseX < 400){
      push();
        fill(255);
        noStroke();
        rectMode(CENTER)
        rect(sliderSide/2,70,sliderSide,50);
      pop();

      textSize(20);
      textAlign(CENTER);
      noStroke();
      fill(rNow, gNow, bNow);
      text("R: "+round(rNow)+" | G: "+round(gNow)+" | B: "+round(bNow),0,55,sliderSide,20);

      push();
        fill(0);
        rect(225, height-75,150,50);
        fill(rNow, gNow, bNow);
        rect(225, height-75,150,50);
      pop();

      // setting the color so that it can be used on the drawing pad
      rChoice = rNow;
      gChoice = gNow;
      bChoice = bNow;

    }
  }

}



function mouseClicked(){

  if(mouseX > sliderSide+10 && mouseX < sliderSide+490){
    if(mouseY > 110 && mouseY < height-110){
      push();
        fill(rChoice, gChoice, bChoice);
        noStroke();
        ellipse(mouseX,mouseY,10,10);
      pop();
    }
  }
}

function mouseDragged() {

  if(mouseX > sliderSide+5 && mouseX < sliderSide+490){
    if(mouseY > 110 && mouseY < height-110){
      push();
        noStroke();
        fill(rChoice, gChoice, bChoice);
        ellipse(mouseX,mouseY,10,10);
      pop();
    }
  }
}


function keyTyped(){
  if(key ==='r'){
    push();
      stroke(0);
      fill(255);
      rect(sliderSide, 100, 500, height-200);
    pop();

    // if the eraser is "turned on" when you refresh your drawing pad, this will turn the color back to black. otherwise, it'll stay as it was!
    if(rChoice == 255 && gChoice == 255 && bChoice == 255){
      rChoice = 0;
      gChoice = 0;
      bChoice = 0;
    }
  }

  if(key ==='e'){
    rChoice = 255;
    gChoice = 255;
    bChoice = 255;
  }

  if(key ==='b'){
    rChoice = 0;
    gChoice = 0;
    bChoice = 0;
  }


}
