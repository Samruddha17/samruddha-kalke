import * as THREE from "three";
import Experience from "../Experience";
import Controls from "./Controls";
import Environment from "./Environment";
import Room from "./Room";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.resources.on("ready", () => {
      this.environemnt = new Environment();
      this.room = new Room();
      this.removeLoading();
    });
  }

  removeLoading() {
    setTimeout(() => {
      document
        .getElementsByClassName("loadingScreen")[0]
        .classList.add("removeLoad");
      document.getElementsByClassName("homeDevName")[0].style.display = "flex";
    }, 2000);
    setTimeout(() => {
      document.getElementsByClassName("loadingScreen")[0].style.display =
        "none";
    }, 3000);
  }

  resize() {}

  update() {
    if (this.room) {
      this.room.update();
    }
  }
}
