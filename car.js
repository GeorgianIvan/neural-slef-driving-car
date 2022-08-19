class Car{
    constructor(x,y,width,height) {
        this.x=x;
        this.y=y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.acceleration = 0.2;
        this.controls = new Controls();
    }

    update(){
        // controls fwd
        if(this.controls.forward) {
            this.y-=2;
            this.speed+=this.acceleration;
        }
        // controls rev
        if (this.controls.reverse) {
            this.y+=2;
            this.speed-=this.acceleration;
        }
        // speed
        if(this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        // we don't want to go that fast in reverse
        if (this.speed<-this.maxSpeed/2) {
            this.speed=-this.maxSpeed/2
        }
        this.y-=this.speed;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.rect(
            this.x-this.width/2,
            this.y-this.height/2,
            this.width,
            this.height
        );
        ctx.fill();
    }
}