export class World {
  context: CanvasRenderingContext2D;
  height: number;
  width: number;
  ducks: Array<IDuck> = [];
  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.height = context.canvas.height;
    this.width = context.canvas.width;
  }

  add(object: IDuck) {
    this.ducks.push(object);
  }

  remove(index: number) {
    this.ducks.splice(index, 1);
  }

  getDuck(index: number) {
    return this.ducks[index];
  }

  duckCount() {
    return this.ducks.length;
  }

  update() {
    this.context.clearRect(0, 0, this.height, this.width);
    for (let object of this.ducks) {
      object.display();
    }
  }
}
