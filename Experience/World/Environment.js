import * as THREE from "three";
import Experience from "../Experience";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
import * as dat from "dat.gui";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    console.log(this.actualRoom);

    this.gui = new dat.GUI();

    // this.setSunLight();
  }

  setSunLight() {
    this.spotLight = new THREE.SpotLight("rgb(255, 244, 85)", 3);
    this.spotLight.position.set(5, 3, -8);
    this.spotLight.intensity = 20;
    this.spotLight.decay = 1.5;
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 4096;
    this.spotLight.shadow.mapSize.height = 4096;
    this.spotLight.shadow.camera.near = 0.5;
    this.spotLight.shadow.camera.far = 4000;
    this.spotLight.shadow.camera.fov = 2;
    this.spotLight.angle = Math.PI / 8;
    //this.actualRoom.add(this.spotLight);

    this.spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
    //this.scene.add(this.spotLightHelper);

    this.ambientLight = new THREE.AmbientLight("white", 0.2); // soft white light
    //this.actualRoom.add(this.ambientLight);

    this.sunLight = new THREE.SpotLight("white", 7);
    this.sunLight.rotation.z = 1.1;
    this.sunLight.position.set(3.8, 2.5, 2.7);
    this.actualRoom.add(this.sunLight);
    const helper = new THREE.SpotLightHelper(this.sunLight, 5);
    //this.scene.add(helper);

    this.width = 0.55;
    this.height = 0.1;
    this.intensity = 3.5;
    this.rectLight = new THREE.RectAreaLight(
      "rgb(201, 19, 233)",
      this.intensity,
      this.width,
      this.height
    );
    this.rectLight.position.set(-0.25, 0.368, 0.14);
    this.rectLight.rotation.set(1.56, -0.1, 1.4);
    this.rectLight.decay = 20;

    this.actualRoom.add(this.rectLight);
    const rectLightHelper = new RectAreaLightHelper(this.rectLight);
    this.rectLight.add(rectLightHelper);

    const computerSetting = this.gui.addFolder("main scene");
    computerSetting
      .add(this.sunLight.rotation, "x")
      .min(-10)
      .max(10)
      .step(0.05);
    computerSetting
      .add(this.sunLight.rotation, "y")
      .min(-10)
      .max(10)
      .step(0.05);
    computerSetting
      .add(this.sunLight.rotation, "z")
      .min(-10)
      .max(10)
      .step(0.05);
    computerSetting
      .add(this.sunLight.position, "x")
      .min(-10)
      .max(10)
      .step(0.05);
    computerSetting
      .add(this.sunLight.position, "y")
      .min(-10)
      .max(10)
      .step(0.05);
    computerSetting
      .add(this.sunLight.position, "z")
      .min(-10)
      .max(10)
      .step(0.05);
    computerSetting.add(this.sunLight, "intensity").min(-10).max(10).step(0.05);
  }

  resize() {}

  update() {}
}
