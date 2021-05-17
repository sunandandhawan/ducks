export class Duck implements IDuck {
  protected x: number = 40;
  protected y: number = 40;
  protected wingFlap: number = 1;
  protected wingFlapDown: boolean = true;
  protected reverse: boolean = true;
  protected rising: boolean = false;
  protected isSwimming: boolean = false;
  protected isFlying: boolean = false;
  protected quackStarted: number = 0;
  protected context: CanvasRenderingContext2D;
  protected fillStyle: CanvasGradient | string = "white";
  protected size: number = 25;
  protected speed: number = 5;

  constructor(context: CanvasRenderingContext2D) {
    this.x =
      this.size * 2 +
      Math.floor(Math.random() * context.canvas.width - this.size * 2);
    this.y = context.canvas.height - this.size;
    this.context = context;
  }

  display(): void {
    this.moveHorizontally(this.context.canvas.width);
    this.moveVertically(this.context.canvas.height);
    this.showText();
    this.context.fillStyle = this.fillStyle;
    this.draw(this.duck);
    this.draw(this.wing);
    this.draw(this.beak);
    this.draw(this.eye);
  }

  swim() {
    this.isSwimming = !this.isSwimming;
  }

  fly() {
    this.isSwimming = true;
    this.isFlying = !this.isFlying;
    if (!this.isFlying) this.rising = false;
  }

  quack() {
    this.quackStarted = new Date().getTime();
  }

  private draw(part: Function) {
    this.context.beginPath();
    part(this);
    this.context.fill();
    this.context.closePath();
    this.context.stroke();
  }

  private beak(that: Duck) {
    let orientation = {
      start: that.x + that.sign() * 1.5 * that.size,
      mid: that.x + that.sign() * 2 * that.size,
      end: that.x + that.sign() * 1.45 * that.size,
    };
    that.context.moveTo(orientation.start, that.y - 1.25 * that.size);
    that.context.lineTo(orientation.mid, that.y - 1.2 * that.size);
    that.context.lineTo(orientation.mid, that.y - that.size);
    that.context.lineTo(orientation.end, that.y - that.size);
    that.context.fillStyle = "red";
  }

  private eye(that: Duck) {
    let orientation = { x: that.x + that.sign() * that.size * 1.2 };
    that.context.arc(
      orientation.x,
      that.y - that.size * 1.45,
      that.size * 0.1,
      0,
      2 * Math.PI
    );
    that.context.fillStyle = "black";
  }

  private duck(that: Duck) {
    let orientation = {
      head: {
        x: that.x + that.size * that.sign() * 0.75,
        y: that.y - that.size * 1.25,
        startAngle: that.angle(-Math.PI / 1.5),
        endAngle: that.angle(0.3 * Math.PI),
      },
      body: {
        startAngle: that.angle(-0.15 * Math.PI),
        endAngle: that.angle(1.58 * Math.PI),
        rotation: 0,
      },
    };
    that.context.arc(
      orientation.head.x,
      orientation.head.y,
      that.size * 0.75,
      orientation.head.startAngle,
      orientation.head.endAngle,
      that.reverse
    );
    that.context.ellipse(
      that.x,
      that.y,
      that.size * 1.5,
      that.size,
      orientation.body.rotation,
      orientation.body.startAngle,
      orientation.body.endAngle,
      that.reverse
    );
  }

  private wing(that: Duck) {
    const orientation = {
      radiusX: that.size,
      radiusY: that.size / 2,
      rotation: 0,
      startAngle: 0,
      endAngle: Math.PI,
    };
    if (that.isFlying || !that.rising) {
      that.wingFlap = ((new Date().getTime() / 100) % 4) * 12;
      orientation.radiusX = that.size / 1.5;
      orientation.radiusY = that.size * 2 - that.wingFlap;
      orientation.rotation = Math.PI / 1.4;
      orientation.startAngle = Math.PI * 0.1;
      orientation.endAngle = Math.PI * 1.05;
      if (that.reverse) {
        orientation.rotation += Math.PI / 2;
        orientation.startAngle -= Math.PI * 0.15;
        orientation.endAngle -= Math.PI * 0.15;
      }
    }
    that.context.ellipse(
      that.x,
      that.y,
      orientation.radiusX,
      orientation.radiusY,
      orientation.rotation,
      orientation.startAngle,
      orientation.endAngle
    );
  }

  private moveHorizontally(xLimit: number) {
    if (this.isSwimming || this.isSwimming) {
      if (this.x >= xLimit - this.size * 2) this.reverse = true;
      if (this.x <= this.size * 2) this.reverse = false;
      this.x += (this.reverse ? -1 : 1) * this.speed;
    }
  }

  private moveVertically(yLimit: number) {
    if (this.isFlying || !this.rising) {
      if (this.y >= yLimit - this.size) this.rising = true;
      if (this.y <= this.size * 2) this.rising = false;
      this.y += ((this.rising ? -1 : 1) * this.speed) / 2;
    }
  }

  protected showText() {
    if (this.quackStarted > 0) {
      this.context.font = `${this.size / 2}px Arial`;
      this.context.fillText(
        "QUACK",
        this.x - this.size * (this.reverse ? 0.25 : 1.6),
        this.y - this.size * 1.25
      );
      if (new Date().getTime() - this.quackStarted >= 2000)
        this.quackStarted = 0;
    }
  }

  private sign() {
    return this.reverse ? -1 : 1;
  }

  private angle(theta: number) {
    return this.reverse ? Math.PI - theta : theta;
  }
}
