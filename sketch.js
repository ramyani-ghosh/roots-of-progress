// Class for a particle that moves based on a perlin noise flow field
let r = 1;
let g = 20;
let b = 40;
class Particle {
    constructor() {
      this.r = 1;
      this.g = 20;
      this.b = 40;
      // Initial position of the particle at a random point on the canvas
      // this.pos = createVector(random(width), random(0,10));
      this.pos = createVector(random(width/2-200,width/2+50), random(height/2-50,height/2+50));
      // Initial velocity set to (0, 0)
      this.vel = createVector(0, 0);
      // Initial acceleration set to (0, 0)
      this.accel = createVector(0, 0);
      // Maximum speed that the particle can move
      this.maxV = 4;
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

      //teal
      if (g%2==0)
      {
        b-=1.001;
        g-=1.02;
        r-=1;
      }
   
      else{
        b+=0.001;
        g+=0.0005;
        r+=0.001;
      }

      //orange
      // if (this.g%10==0)
      // {
      //   this.b-=1;
      //   this.g-=1;
      //   this.r-=1;
      // }
   
      // else{
      //   this.b+=0.2;
      //   this.g+=0.8;
      //   this.r+=1.2;
      // }

      //pink
      // if (this.g%20==0)
      // {
      //   this.b-=2;
      //   this.g-=2;
      //   this.r-=2;
      // }
      // else{
      //   this.b+=3;
      //   this.g+=1;
      //   this.r+=3;
      // }
     
      strokeWeight(1);
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
      if (this.pos.x > width) {
        this.pos.x = 0;
        this.updatePrev();
      }
      if (this.pos.x < 0) {
        this.pos.x = width;
        this.updatePrev();
      }
      if (this.pos.y > height) {
        this.pos.y = 0;
        this.updatePrev();
      }
      if (this.pos.y < 0) {
        this.pos.y = height;
        this.updatePrev();
      }
    }
  }
  
  // Increment for the perlin noise
  let inc = 0.1;
  
  // Increment for z_off
  let z_inc = 0.0001;
  
  // Scale of the flow field grid
  let s = 60;
  // Number of columns and rows in the flow field grid
  let cols, rows;
  
  // z_off variable is used for controlling the noise function
  let z_off = 6;
  
  // fr variable is used for creating a paragraph element
  // let fr;
  
  // particles array stores the Particle objects
  let particles = [];
  
  // flowfield array stores the flow vectors for each particle to follow
  let flowfield;
  
  // reset variable is used for controlling the background reset
  let reset = 0;
  
  // total number of times the program runs before resetting background
  let resetTimes = 800;
  
  // setup function is called once when the sketch starts
  function setup() {
    // create a canvas with width 600 and height 400
    createCanvas(1400, 800);
  
    // calculate the number of columns and rows in the canvas
    cols = floor(width / s);
    rows = floor(height / s);
  
    // initialize the flowfield array with the number of elements equal to cols * rows
    flowfield = new Array(cols * rows);
  
    // create 300 Particle objects and store them in the particles array
    for (let i = 0; i < 300; i++) {
      particles[i] = new Particle();
    }
  
    // set the background to black
    background(0);
  }
  
  // draw function is called repeatedly until the sketch stops
  function draw() {
    frameRate(30);
    // increment the reset variable
    reset++;
  
  
    // if the reset variable exceeds 500, reset the background to black
    if (reset > resetTimes) {
      // background(0);
      reset = 0;  
        r = 40;
        g = 30;
        b = 1;
    }
  
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
  
        // set the stroke color to gray
        stroke(0, 20);
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
  }
  