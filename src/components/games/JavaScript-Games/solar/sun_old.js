class Sun {
    constructor() {
        this.icon = sun;
        this.width = 50;
        this.height = 50;
        this.y = height / 2 - this.height;
        this.x = width / 2 - this.width;


        this.M = 330000; 
    }

    show() {
        image(this.icon, this.x, this.y, this.width, this.height);
    }
}
