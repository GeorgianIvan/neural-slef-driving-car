class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.maxSpeed = 3;
    this.friction = 0.05;
    this.acceleration = 0.2;
    this.angle = 0;

    this.controls = new Controls();
  }

  update() {
    this.#move();
  }

  #move(){
      // controls fwd
    if (this.controls.forward) {
        this.y -= 2;
        this.speed += this.acceleration;
      }
      // controls rev
      if (this.controls.reverse) {
        this.y += 2;
        this.speed -= this.acceleration;
      }
      // speed
      if (this.speed > this.maxSpeed) {
        this.speed = this.maxSpeed;
      }
      // we don't want to go that fast in reverse
      // [!] negative sign indicates that the car is going in reverse
      if (this.speed < -this.maxSpeed / 2) {
        this.speed = -this.maxSpeed / 2;
      }
  
      // decrease speed by the friction
      if (this.speed > 0) {
        this.speed -= this.friction;
      }
  
      // increase speed by the friction
      if (this.speed < 0) {
        this.speed += this.friction;
      }
  
      // prevent small drift is speed not abs 0
      if (Math.abs(this.speed) < this.friction) {
        this.speed = 0;
      }
  
      if (this.speed != 0) {
        const flip = this.speed > 0 ? 1 : -1;
  
        // left
        if (this.controls.left) {
          this.angle += 0.03 * flip;
        }
  
        // right
        if (this.controls.right) {
          this.angle -= 0.03 * flip;
        }
      }
  
      this.x -= Math.sin(this.angle) * this.speed;
      this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);

    ctx.fill();
    // this prevents translate/rotate infinite on each frame of the anim
    ctx.restore();
  }
}
