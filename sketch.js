//SerialCode
let serial;
let latestData = "waiting for data"; 
let oldData = "Untouched";

// Preload function to load external assets
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function preload() {
  // Load the image
  // treeImg = loadImage('tree-black.png');
  fontItalic = loadFont("assets/PlayfairDisplay-MediumItalic.ttf");
  fontItalic2 = loadFont("assets/Brygada1918-Italic.ttf");
  treeImg = loadImage('images/tree-model-1.png');
  circleImg = loadImage('images/circlecanvasblur.png');
}
console.log("color_palette");
console.log(color_palette);

let start_rest = 1;
let present_run = 0;
let circle_transparency = 1;
var heighthigh ;
var heightlow ;
var widthhigh;
var widthlow;
var fade = 0;
var fadeAmount = 2;
// energy and fuel, fleet, reuse reduce&recycle, community outreach
//color palettes = [ [darkblue, yellow, lightgreen, lightblue] , [purple, pink, orange, yellow] ]
let color_palettes = [ [[4,56,127],[217,173,75],[62,102,30], [54,152,196]] , [[143, 43, 155],[100, 90, 198], [241, 99, 51], [255, 175, 69]] ];
// var color_palette = color_palettes[getRandomInt(0,color_palettes.length-1)];
var color_palette =  color_palettes [0];
// let sustainability_quotes = [ 
// ["We are testing a new paper cup which will eliminate approximately 7 million pounds of single-use-plastic",20,3],
// ["Delta Premium Offerings include artisan-made amenity kits from Certified B Corporation apparel brand Someone Somewhere",100,4],
// ["In 2022, we took delivery of 69 aircraft that were 25% more fuel efficient per seat mile than aircraft retired since 2019",50,2] , 
// ["We have started executing sustainable fuel agreements with corporate customers",20,1] , 
// ["Our onboard bedding is made from 100% recycled plastic bottles and we offer reusable service ware",100,3],
// ["Delta hosted the Sustainable Flight Challenge showcase at the Delta Flight Museum in October, 2023",60,4],
// ["Joby, Delta’s electric, vertical takeoff and landing (eVTOL) partner, successfully performed test flights in New York City",20,2],
// ["Core ground support equipment at Salt Lake City and Boston are nearly entirely powered with electricity",65,1],
// ["We stopped automatically printing pre-departure documents, saving more than 70 million pages per year or 4,000 trees",100,3]

// ];



let sustainability_quotes = [
  ["Progress made:\nDelta offset 13M metric tons of emissions from operations in 2020- equivalent to 17M forest acres, covering all of West Virginia!",80,1],
  ["Now in progress:\n98% of emissions come from the fleet itself -Delta fleet renewal is expected in full by 2035",20,2],
  ["Progress made:\nCore ground support equipment at Salt Lake City and Boston are 100% powered with electricity!",80,1],
  ["Our goal now:\nWe aim to transition all hubs to 100% electric-based by 2035.",20,4],
  ["Progress made:\nWe stopped automatically printing pre-departure documents, saving more than 70 million pages per year or 4,000 trees",80,3],
  ["What's next?\nContinue community contributions such as planting trees and supporting LEAF (Lowering Emissions by Accelerating Forest Finance) Coalition.",20,4],
  ["Progress made:\n We took delivery of 69 aircrafts that were 25% more fuel efficient per seat mile than aircraft retired since 2019",80,2],
  ["Upcoming:\n Joby, Delta’s electric, vertical takeoff and landing (eVTOL) partner, successfully performed test flights in New York City", 20, 2],
  ["Progress made:\nWe’ve reduced annual plastic use by 2.4M pounds by introducing bamboo cutlery and using 100% recycled polyester bedding.",80,3],
  ["What now?\nWe're finding more plastic to swap out with recyclable or compostable items such as biodegradable cups.",20,3],
  ["Progress made:\nDelta Premium Offerings include artisan-made amenity kits from Certified B Corporation apparel brand Someone Somewhere",80,4],
  ["What we're doing now:\n We have started executing sustainable fuel agreements with corporate customers",20,1]

];
var sustainability_quote = "";
let counter = -1;

var textleft = 80;
let r = 120;
let g = 250;
let b = 210;
let maxV = 2.5;



class Particle {
    constructor() {
      
      // Initial position of the particle at a random point on the canvas
 
      heighthigh = height/2+190;
      heightlow =  height/2+260;
      widthhigh = width/2-55;
      widthlow = width/2-65;
      this.pos = createVector(random(widthlow,widthhigh), random(heightlow,heighthigh));
      // Initial velocity set to (0, 0)
      this.vel = createVector(0, 0);
      // Initial acceleration set to (0, 0)
      this.accel = createVector(0, 0);
      // Maximum speed that the particle can move
      this.maxV = 5.5;
      // Store the previous position of the particle
      this.prevPos = this.pos.copy();
    }
  
    // Follow the flow field vectors
    follow(vectors) {
      // Calculate the grid position of the particle
      let x = floor(this.pos.x / s);
      let y = floor(this.pos.y / s);
      let index = x + y * cols;
      // Get the force vector at that grid position
      let force = vectors[index];
      // Apply a force to the particle's acceleration
      this.accel.add(force);
    }
    
    // Update the position of the particle based on its velocity and acceleration
    update() {
      // Add the acceleration to the velocity
      this.vel.add(this.accel);
      // Limit the velocity to the maxV
      this.vel.limit(maxV);
      // Add the velocity to the position
      this.pos.add(this.vel);
      // Reset the acceleration to (0, 0)
      this.accel.mult(0);
    }
  
    // Display the particle as a line connecting its current and previous position
    display() {
      present_run+=0.001;
      // stroke(this.r, this.g, this.b);
      stroke(r, g, b);
      if (start_rest)
      {
        circle_transparency = 100;
        sustainability_quote="";
      }
      if (present_run >400)
      {
          circle_transparency+=0.0001; 
          start_rest = 1;         
      }
      else{
        strokeWeight(0.6);
      }
      if ( b<230 && r<230 && g<230)
      {
        b+=0.002;
        g+=0.002;
        r+=0.001; 

      }
      // if ( maxV > 1.5 )
      // {
      //   maxV = maxV-0.000015;
      // }
     
     
      line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
    }
  
    // Update the previous position of the particle
    updatePrev() {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
   
    // Check if the particle has gone outside the canvas and wrap it around if necessary
    particleReset() {
      // let rightend = 1180
      // let leftend = 305
      // let topend = 175
      // let bottomend = height

      // let rightend = 1125
      // let leftend = 330
      // let topend = 66
      // let bottomend = height-80


      let rightend = 1125
      let leftend = 270
      let topend = 0
      let bottomend = height-220
      if (this.pos.x >= rightend) {
        this.pos.x = leftend;
        this.updatePrev();
      }
      if (this.pos.x < leftend) {
        this.pos.x = rightend;
        this.updatePrev();
      }
      if (this.pos.y >= bottomend) {
        this.pos.y = topend;
        this.updatePrev();
      }
      if (this.pos.y < topend) {
        this.pos.y = bottomend;
        this.updatePrev();
      }
    }

  }
  
  // Increment for the perlin noise
  let inc = 0.1;
  
  // Increment for z_off
  let z_inc = 0.0005;
  
  // Scale of the flow field grid
  let s = 80;
  // Number of columns and rows in the flow field grid
  let cols, rows;
  
  // z_off variable is used for controlling the noise function
  let z_off = 5;
  
  // fr variable is used for creating a paragraph element
  // let fr;
  
  // particles array stores the Particle objects
  let particles = [];
  
  // flowfield array stores the flow vectors for each particle to follow
  let flowfield;
  
  // reset variable is used for controlling the background reset
  let reset = 0;
  
  
  // setup function is called once when the sketch starts
  function setup() {
    // create a canvas with width 600 and height 400
    w = document.body.scrollWidthl
    createCanvas(1450, 920);


    //SerialCode
    serial = new p5.SerialPort();
    serial.list(); 
    serial.open("COM3");
    serial.on('connected', serverConnected); 
    serial.on('data', serialEvent);
  
    // calculate the number of columns and rows in the canvas
    cols = floor(width / s);
    rows = floor(height / s);
  
    // initialize the flowfield array with the number of elements equal to cols * rows
    flowfield = new Array(cols * rows);
  
    // create 300 Particle objects and store them in the particles array
    for (let i = 0; i < 200; i++) {
      particles[i] = new Particle();
    }
  
    // set the background to black
    background(0);
  }
  
  //SerialCode
  function serverConnected() {
    console.log('connected to server.');
  }  
  //read gotten serial event content and invole animation trigger
  function serialEvent() {
    let data = serial.readLine(); 
    trim(data); 
    if (!data) return; 
    latestData = data; 
    if (latestData == "touch" && oldData == "Untouched")
    {
      trigger(); 
      oldData = "Touched";
    }
    else if(latestData =="Untouched"){
      oldData = "Untouched";
    }
    
  
  }

  // draw function is called repeatedly until the sketch stops
  function draw() {    

    // image(circleImg, width/2 - 890, height/2 - 420, 1650, 1020);
    frameRate(40);
    // increment the reset variable
    reset++;
    // translate(width / 2, height / 2);

    // y_off variable is used for controlling the noise function
    let y_off = 0;
  
    // for loop for iterating through the rows
    for (let y = 0; y < rows; y++) {
      // x_off variable is used for controlling the noise function
      let x_off = 0;
  
      // for loop for iterating through the columns
      for (let x = 0; x < cols; x++) {
        let index = x + y * cols;
  
        // calculate the angle of the flow vector based on the noise function
        let angle = noise(x_off, y_off, z_off) * TWO_PI * 4;
  
        //The angle of the vector is set based on the noise function
        let v = p5.Vector.fromAngle(angle);
        v.setMag(1);
  
        // store the flow vector in the flowfield array
        flowfield[index] = v;
  
        // increment the x_off variable
        x_off += inc;
  
      }
  
      // increment the y_off variable
      y_off += inc;
  
      // increment the z_off variable
      z_off += z_inc;
    }
  
    // for loop for iterating through the particles array
    for (let i = 0; i < particles.length; i++) {
      // call the follow method for each particle, passing the flowfield array as a parameter
      particles[i].follow(flowfield);
  
      // call the update method for each particle
      particles[i].update();
  
      // call the particleReset method for each particle
      particles[i].particleReset();
  
      // Call the display function to display the particle on the canvas.
      particles[i].display();
    }
    // image(treeImg, width/2 - 270, height/2 - 210, 550, 700);
    image(circleImg, width/2 - 770, height/2 - 470, 1450, 920);

    fill(255,255,255,fade);
    if (fade<0) fadeAmount=2; 
    if (fade>=255) fadeAmount=0; 
    fade += fadeAmount; 
    noStroke();
    textSize(22);
    textLeading(22);
    textWrap(WORD);
    textAlign(CENTER, BOTTOM);
    textFont(fontItalic2);
    // text(sustainability_quote, width/2-400, 0,800,200);
    text(sustainability_quote, textleft, 480,250,300)

    noStroke();
    fill(0,circle_transparency);
    circle(width/2+50, 0 , 30000);
    
  }

// Function to handle mouse click event
//SerialCode
// function trigger() {
function mousePressed() {
  if (start_rest == 1)
  {// Reset the background
    background(0);
  }
  start_rest = 0;
  fade = 0;
  fadeAmount = 2;

  console.log("When pressed, run is : ")



  console.log(present_run);

  present_run = 0;
  circle_transparency = 0;
  counter+=1;
  console.log("quote");
  console.log (sustainability_quote);
  console.log(counter%sustainability_quotes.length);
  sustainability_quote = sustainability_quotes[ counter%sustainability_quotes.length ][0];
  var progress= sustainability_quotes[ counter%sustainability_quotes.length ][1];
  var initiative = sustainability_quotes[ counter%sustainability_quotes.length ][2];
  console.log("intiative" + initiative);
  if(progress<33)
  {
    maxV = 2.0;
  }
  else if(progress<75)
  {
    maxV = 3.5;
  }
  else{
    maxV = 4.5;
  }
  maxV+=0;

  if (counter%2==0)
  {
      textleft= 250;
  }
  else
  {
    textleft= 866;
  }
  
   if (initiative==3)
   {
      //light green
        for (let i = 0; i < particles.length; i++) {
          // particles[i].pos = createVector(random(width/2-50,width/2+50), random(height/2,height/2+60));
          particles[i].pos=createVector(random(widthlow,widthhigh), random(heightlow,heighthigh));
          particles[i].updatePrev();

      }
      r = color_palette[2][0];
      g = color_palette[2][1];
      b = color_palette[2][2];
   }
   else if (initiative==2)
   {
      //light blue
        for (let i = 0; i < particles.length; i++) {
          // particles[i].pos = createVector(random(width/2-50,width/2+50), random(height/2,height/2+60));
          particles[i].pos=createVector(random(widthlow,widthhigh), random(heightlow,heighthigh));
          particles[i].updatePrev();
      }
      r = color_palette[1][0];
      g = color_palette[1][1];
      b = color_palette[1][2];
   }
   else if (initiative==1)
   {
      //darkest blue
        for (let i = 0; i < particles.length; i++) {
          // particles[i].pos = createVector(random(width/2-50,width/2+50), random(height/2,height/2+60));
          particles[i].pos=createVector(random(widthlow,widthhigh), random(heightlow,heighthigh));
          particles[i].updatePrev();
      }
      r = color_palette[0][0];
      g = color_palette[0][1];
      b = color_palette[0][2];
   }
   else 
   {
      //yellow
        for (let i = 0; i < particles.length; i++) {
          // particles[i].pos = createVector(random(width/2-50,width/2+50), random(height/2,height/2+60));
          particles[i].pos=createVector(random(widthlow,widthhigh), random(heightlow,heighthigh));
          particles[i].updatePrev();
      }
      r = color_palette[3][0];
      g = color_palette[3][1];
      b = color_palette[3][2];
   }
    
    
}


function trigger() {
  // function mousePressed() {
    if (start_rest == 1)
    {// Reset the background
      background(0);
    }
    start_rest = 0;
    fade = 0;
    fadeAmount = 2;
  
    console.log("When pressed, run is : ")
  
  
  
    console.log(present_run);
  
    present_run = 0;
    circle_transparency = 0;
    counter+=1;
    console.log("quote");
    console.log (sustainability_quote);
    console.log(counter%sustainability_quotes.length);
    sustainability_quote = sustainability_quotes[ counter%sustainability_quotes.length ][0];
    var progress= sustainability_quotes[ counter%sustainability_quotes.length ][1];
    var initiative = sustainability_quotes[ counter%sustainability_quotes.length ][2];
    console.log("intiative" + initiative);
    if(progress<33)
    {
      maxV = 2.5;
    }
    else if(progress<75)
    {
      maxV = 3.2;
    }
    else{
      maxV = 4.0;
    }
    maxV+=0;
  
    if (counter%2==0)
    {
        textleft= 250;
    }
    else
    {
      textleft= 860;
    }
    
     if (initiative==3)
     {
        //light green
          for (let i = 0; i < particles.length; i++) {
            // particles[i].pos = createVector(random(width/2-50,width/2+50), random(height/2,height/2+60));
            particles[i].pos=createVector(random(widthlow,widthhigh), random(heightlow,heighthigh));
            particles[i].updatePrev();
  
        }
        r = color_palette[2][0];
        g = color_palette[2][1];
        b = color_palette[2][2];
     }
     else if (initiative==2)
     {
        //light blue
          for (let i = 0; i < particles.length; i++) {
            // particles[i].pos = createVector(random(width/2-50,width/2+50), random(height/2,height/2+60));
            particles[i].pos=createVector(random(widthlow,widthhigh), random(heightlow,heighthigh));
            particles[i].updatePrev();
        }
        r = color_palette[1][0];
        g = color_palette[1][1];
        b = color_palette[1][2];
     }
     else if (initiative==1)
     {
        //darkest blue
          for (let i = 0; i < particles.length; i++) {
            // particles[i].pos = createVector(random(width/2-50,width/2+50), random(height/2,height/2+60));
            particles[i].pos=createVector(random(widthlow,widthhigh), random(heightlow,heighthigh));
            particles[i].updatePrev();
        }
        r = color_palette[0][0];
        g = color_palette[0][1];
        b = color_palette[0][2];
     }
     else 
     {
        //yellow
          for (let i = 0; i < particles.length; i++) {
            // particles[i].pos = createVector(random(width/2-50,width/2+50), random(height/2,height/2+60));
            particles[i].pos=createVector(random(widthlow,widthhigh), random(heightlow,heighthigh));
            particles[i].updatePrev();
        }
        r = color_palette[3][0];
        g = color_palette[3][1];
        b = color_palette[3][2];
     }
      
      
  }
  