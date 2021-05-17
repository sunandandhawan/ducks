import { Duck } from "./duck";

export class RedHeadDuck extends Duck {
  display(): void {
    var grd = this.context.createLinearGradient(
      this.x,
      this.y - this.size * 3,
      this.x,
      this.y
    );
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "gray");
    this.fillStyle = grd;
    super.display();
  }
}
