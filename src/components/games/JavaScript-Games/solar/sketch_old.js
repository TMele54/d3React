var sun;
var planet1;
var dts = [100, 100];
var canvasHeight = 500;
var canvasWidth = 500;
var frame = 0;

function preload() {
  sun = loadImage('graphics/sun.png');
  planet1 = loadImage('graphics/planet1.png');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  reset();
}

function draw() {
  frame += 1;
  if( frame % 360 === 0 ){
    console.log("Frame",frame, frame % 360)
  }
  background(0);
  var theSun = new Sun();
  theSun.show();

  var planet = new Satelite();
  planet.show(planet1, dts);

  planet.update(40, frame, canvasWidth / 2, canvasHeight / 2);

  /*
  ellipse(x, y, 24, 24);
  var i = 1;
  function myLoop() {
    setTimeout(function() {

      i++;
      if (i < 360) {
        console.log(i, "THERE WE GO");
        planet.update(40, i, canvasWidth / 2, canvasHeight / 2);
        myLoop();
      }else{
        clearInterval()
      }
    }, 500)
  }

  myLoop();                   //  start the loop
*/
}

function reset() {
  sysObj = [];
  sysObj.push(new Sun());
}
