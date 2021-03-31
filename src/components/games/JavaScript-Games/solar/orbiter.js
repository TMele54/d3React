class Orbiter {
    constructor(sizeRadius, orbitRadius, orbitAngle=0) {
        this.sizeRadius = sizeRadius;
        this.orbitRadius = orbitRadius;
        this.orbitAngle = 0; // degrees relative to x axis

        this.orbitAngleDelta = 2000 * Math.pow(orbitRadius, -1.5); // 1.5 from Kepler's 3rd Law
        this.x = 0;
        this.y = 0;

    }

    orbit(primary) {
        this.x = primary.x + this.orbitRadius * cos(radians(this.orbitAngle));
        this.y = primary.y + this.orbitRadius * sin(radians(this.orbitAngle));
        this.orbitAngle = (this.orbitAngle + this.orbitAngleDelta) % 360;
    }

    display(img, body_type) {
        if (body_type !== ''){
            return image(img, this.x, this.y, this.sizeRadius, this.sizeRadius);
        }
        else{
            noStroke();
            fill(this.color);
            return ellipse(this.x, this.y, this.sizeRadius, this.sizeRadius);
        }
    }
}
