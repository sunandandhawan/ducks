import { Duck } from "./duck";

export class MallardDuck extends Duck {
  display(): void {
    var grd = this.context.createLinearGradient(
      this.x,
      this.y - this.size,
      this.x,
      this.y + this.size
    );
    grd.addColorStop(0, "gray");
    grd.addColorStop(1, "white");
    this.fillStyle = grd;
    super.display();
  }
}
