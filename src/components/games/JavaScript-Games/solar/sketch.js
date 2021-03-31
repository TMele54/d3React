let planets = [];
let sizeX = 1000;
let sizeY = 800;
let sunSizeRadius = 50;
let sunOrbitRadius = 0;

function preload() {
  sunIcon = loadImage('graphics/sun_real.png');
  planetIcon = loadImage("graphics/planet1.png")
}

function setup() {
    createCanvas(sizeX, sizeY);
    frameRate(144);
    sun = new Orbiter(sunSizeRadius, sunOrbitRadius);

    sun.x = sizeX / 2 - sunSizeRadius / 2;
    sun.y = sizeY / 2 - sunSizeRadius / 2;
    sun.color = color(255, 200, 0);

    // Instantiate 5 planets
    for (i = 0; i < 5; i++) {
        planets[i] = new Orbiter(5 + 15 * i, 110 + 70 * i);
        let red = i * 50 + 5;
        planets[i].color = color(red, 255 - red, 255 - red);
    }
}

function draw() {
    background(0, 10, 40);
    sun.display(sunIcon, "star");

    for (planet of planets) {
        planet.orbit(sun);
        planet.display(planetIcon, "planet");
    }
}

function windowResized() {
    resizeCanvas(sizeX, sizeY);
    sun.x = sizeX / 2;
    sun.y = sizeY / 2;
}
