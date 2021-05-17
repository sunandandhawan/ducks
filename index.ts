import { Duck } from "./objects/duck";
import { MallardDuck } from "./objects/mallard-duck";
import { RedHeadDuck } from "./objects/red-head-duck";
import { World } from "./objects/world";

function init() {
  const Ducks: any = {
    MALLARD: "MallardDuck",
    NORMAL: "NormalDuck",
    REDHEAD: "RedHeadDuck",
  };
  const addDucks = document.getElementById("add-ducks");
  const controls = document.getElementById("controls");
  const duckControls = document.getElementById("duck-controls");
  if (controls && duckControls && addDucks) {
    for (let key in Ducks) {
      const button = document.createElement("button");
      button.innerText = `Add ${Ducks[key]}`;
      button.value = Ducks[key];
      button.onclick = function () {
        const that = this as HTMLButtonElement;
        let duck = createDuck(that.value);
        if (duck) {
          world.add(duck);
          duck.swim();
          const duckControl = createDuckControl(world.duckCount());
          duckControl.appendChild(controlButton(world.duckCount(), "Fly"));
          duckControl.appendChild(controlButton(world.duckCount(), "Quack"));
          duckControls.appendChild(duckControl);
        }
      };
      addDucks.appendChild(button);
    }
  }
  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  let world: World, canvasContext: CanvasRenderingContext2D;
  if (canvasElement) {
    let context = canvasElement.getContext("2d");
    if (context) {
      canvasContext = context;
      world = new World(context);
      gameLoop(world);
    }
  }
  function createDuck(duckType: string): IDuck | null {
    switch (duckType) {
      case Ducks.MALLARD:
        return new MallardDuck(canvasContext);
      case Ducks.REDHEAD:
        return new RedHeadDuck(canvasContext);
      case Ducks.NORMAL:
        return new Duck(canvasContext);
    }
    return null;
  }
  function createDuckControl(index: number) {
    const result = document.createElement("div");
    result.className = "duck-control";
    result.innerText = `Duck ${index}`;
    return result;
  }
  function controlButton(index: number, purpose: string) {
    const result = document.createElement("button");
    result.setAttribute("data-index", index.toString());
    result.innerText = purpose;
    result.onclick = function (ev) {
      const that = this as HTMLElement;
      const duckIndex = parseInt(that.getAttribute("data-index") as string) - 1;
      const duck = world.getDuck(duckIndex);
      if (purpose == "Quack") duck.quack();
      if (purpose == "Fly") duck.fly();
    };
    return result;
  }
  function gameLoop(world: World) {
    world.update();
    setTimeout(() => {
      gameLoop(world);
    }, 25);
  }
}

init();
