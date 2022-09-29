import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Controls from "./Controls";
import { MeshBasicMaterial, MeshStandardMaterial } from "three";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.camera = this.experience.camera.perspectiveCamera;
    GSAP.registerPlugin(ScrollTrigger);

    this.lerp = {
      current: 0,
      target: -1.57,
      ease: 0.1,
    };
    this.mouse = { x: 0, y: 0 };
    this.desktopBorder = {};
    this.clickFlag = false;

    this.pageContentFlag = false;

    this.raycastObjectHover();
    this.raycastSceneZoom();
    this.setModel();
    this.onMouseMove();
  }

  setModel() {
    this.actualRoom.children[0].children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }
    });

    this.scene.add(this.actualRoom);
    this.actualRoom.scale.set(2, 2, 2);
    this.actualRoom.position.set(0, 0, -1);
    this.actualRoom.rotation.y = -Math.PI / 2;
    // console.log(this.actualRoom.children[0]);

    //seeting desktop border
    this.desktopBorder = this.actualRoom.children[0].children.find(
      (child) => child.name === "Display"
    );
    this.desktopBorder.material = new THREE.MeshBasicMaterial({
      color: 0xc5a651,
    });
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      if (!this.clickFlag) {
        this.rotation =
          -((e.clientX - window.innerWidth / 2) / window.innerWidth / 2) / 1.7;
        this.lerp.target = this.rotation - 1.6;
      }
    });
  }


  raycastObjectHover() {
    document
      .getElementsByTagName("canvas")[0]
      .addEventListener("mousemove", (e) => {
        this.raycaster = new THREE.Raycaster();

        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        //2. set the picking ray from the camera position and mouse coordinates
        this.raycaster.setFromCamera(this.mouse, this.camera);

        //3. compute intersections
        var intersects = this.raycaster.intersectObjects(
          this.actualRoom.children[0].children,
          true
        );

        this.desktopBorder = this.actualRoom.children[0].children.find(
          (child) => child.name === "Display"
        );

        if (intersects[0].object.name == "Display001") {
          document.body.style.cursor = "pointer";
          this.desktopBorder.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
          });
        } else {
          document.body.style.cursor = "context-menu";
          this.desktopBorder.material = new THREE.MeshBasicMaterial({
            color: 0xc5a651,
          });
        }
      });
  }

  raycastSceneZoom() {
    document
      .getElementsByTagName("canvas")[0]
      .addEventListener("click", (e) => {
        this.raycaster = new THREE.Raycaster();

        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

        //2. set the picking ray from the camera position and mouse coordinates
        this.raycaster.setFromCamera(this.mouse, this.camera);

        //3. compute intersections
        var intersects = this.raycaster.intersectObjects(
          this.actualRoom.children[0].children,
          true
        );
        if (intersects[0].object.name == "Display001") {
          this.lerp.target = -1.57;
          this.clickFlag = true;

          this.timeline = new GSAP.timeline();
          this.timeline
            .to(this.camera.position, {
              x: 0,
              // y: 1.3,
              // z: -1.45,
              y: 1.35,
              z: -1.5,
              duration: 2,
              onComplete: () => {
                document.getElementsByClassName("experience")[0].style.display =
                  "none";
                document.body.style.cursor = "initial";
                document.getElementsByClassName(
                  "homeDevName"
                )[0].style.display = "none";
                document.getElementsByClassName("page")[0].style.display =
                  "block";
                document.getElementsByClassName("page-2")[0].style.display =
                  "block";
                document.getElementsByClassName("page-3")[0].style.display =
                  "block";
                // this.pageContentFlag = true;
                this.controls = new Controls();
              },
            })
            .to(
              document.getElementsByClassName("homeDevName")[0],
              {
                opacity: 0,
                duration: 1,
              },
              "<"
            );
        }
      });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.actualRoom.rotation.y = this.lerp.current;
  }
}
