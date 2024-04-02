var heighthigh 
var heightlow 
var widthhigh
var widthlow
//color palettes = [ [darkblue, lightblue, lightgreen, yellow] , [purple, pink, orange, yellow] ]
let color_palettes = [ [[30,56,90],[54,152,206],[132,162,70], [217,203,105]] , [[83, 43, 85],[215, 75, 118], [251, 109, 72], [255, 175, 69]] ]
var color_palette = color_palettes[getRandomInt(0,color_palettes.length-1)];
// Preload function to load external assets
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function preload() {
  // Load the image
  // treeImg = loadImage('tree-black.png');
  
  treeImg = loadImage('images/tree-model-1.png');
  circleImg = loadImage('images/circlecanvas2.png');
}
console.log("color_palette");
console.log(color_palette);

// Class for a particle that moves based on a perlin noise flow field
// ...

// function setup() {
//   // create a canvas with width 1450 and height 820
//   createCanvas(950, 820);
//   // ...
// }
let counter = 0;
// Class for a particle that moves based on a perlin noise flow field
let r = color_palette[0][0];
let g = color_palette[0][1];
let b = color_palette[0][2];
class Particle {
    constructor() {
      // this.r = 20;
      // this.g = 60;
      // this.b = 60;
      this.r = 30;
      this.g = 56;
      this.b = 90;
      // Initial position of the particle at a random point on the canvas
      // this.pos = createVector(random(width), random(0,10));
      // this.pos = createVector(random(width/2-50,width/2+50), random(10,50));
      heighthigh = height/2+170;
      heightlow =  height/2+300;
      widthhigh = width/2+60;
      widthlow = width/2+50;
      this.pos = createVector(random(widthlow,widthhigh), random(heightlow,heighthigh));
      // Initial velocity set to (0, 0)
      this.vel = createVector(0, 0);
      // Initial acceleration set to (0, 0)
      this.accel = createVector(0, 0);
      // Maximum speed that the particle can move
      this.maxV = 4.5;
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
      this.vel.limit(this.maxV);
      // Add the velocity to the position
      this.pos.add(this.vel);
      // Reset the acceleration to (0, 0)
      this.accel.mult(0);
    }
  
    // Display the particle as a line connecting its current and previous position
    display() {
      // stroke(this.r, this.g, this.b);
      stroke(r, g, b);

      if ( b<200 && r<200 && g<200)
      {
        b+=0.001;
        g+=0.001;
        r+=0.001;
      }
       
      strokeWeight(0.4);
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
      let rightend = 1185
      let leftend = 310
      let topend = 30
      let bottomend = height-30
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
  
  // total number of times the program runs before resetting background
  let resetTimes = 200000;
  
  // setup function is called once when the sketch starts
  function setup() {
    // create a canvas with width 600 and height 400
    w = document.body.scrollWidthl
    createCanvas(1450, 920);
  
    // calculate the number of columns and rows in the canvas
    cols = floor(width / s);
    rows = floor(height / s);
  
    // initialize the flowfield array with the number of elements equal to cols * rows
    flowfield = new Array(cols * rows);
  
    // create 300 Particle objects and store them in the particles array
    for (let i = 0; i < 100; i++) {
      particles[i] = new Particle();
    }
  
    // set the background to black
    background(0);
  }
  
  // draw function is called repeatedly until the sketch stops
  function draw() {    

    // image(circleImg, width/2 - 890, height/2 - 420, 1650, 1020);
    frameRate(30);
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
    image(treeImg, width/2 - 230, height/2 - 300, 550, 700);
    image(circleImg, width/2 - 790, height/2 - 440, 1650, 1020);
  }

// Function to handle mouse click event
function mousePressed() {
    // Reset the background
    // background(0);
    // Reset color values
  counter+=1;
   if (counter%4==1)
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
   else if (counter%4==2)
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
   else if (counter%4==3)
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
