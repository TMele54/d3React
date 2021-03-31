class Satelite {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.y = height / 2 - this.height;
        this.x = width / 2 - this.width;
    }

    show(img, dts) {
        this.x = this.x + dts[0];
        this.y = this.y + dts[1];
        //ellipse(this.x, this.y, 24, 24);
        image(img, this.x, this.y, this.width, this.height);
    }

    update(r, angle, sunx, suny) {
        this.x = (r * cos(angle)) + sunx;
        this.y = (r * sin(angle)) + suny;
    }
}
