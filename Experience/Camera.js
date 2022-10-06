import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      100
    );
    // this.perspectiveCamera.position.set(0, 1.6, 0.67);
    // this.perspectiveCamera.rotation.set(-0.25, -0.03, 0.0);

    this.perspectiveCamera.position.set(-0.05, 1.75, 0.8);
    this.perspectiveCamera.rotation.set(-0.3, -0.03, 0.0);

    if (window.innerWidth < 900) {
      // this.perspectiveCamera.position.set(-0.05, 1.75, 1.5);
      // this.perspectiveCamera.rotation.set(-0.3, -0.03, 0.0);
      
      this.perspectiveCamera.position.set(-0.05, 1.6, 0.67);
      this.perspectiveCamera.rotation.set(-0.25, -0.03, 0.0);
    }

    this.scene.add(this.perspectiveCamera);
    console.log(this.perspectiveCamera.rotation.y);

    // this.perspectiveCamera.position.set(-5, 5, 8);
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -10,
      10
    );
    this.scene.add(this.orthographicCamera);
    this.helper = new THREE.CameraHelper(this.orthographicCamera);
    // this.scene.add(this.helper);

    const size = 10;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(5);
    // this.scene.add(axesHelper);
  }

  setOrbitControls() {
    // this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    // this.controls.enableDamping = true;
    // this.controls.enableZoom = true;
  }

  resize() {
    // Update perspective camera on resize
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();

    if (window.innerWidth < 900) {
      this.perspectiveCamera.position.set(-0.05, 1.75, 1.5);
      this.perspectiveCamera.rotation.set(-0.3, -0.03, 0.0);
    }
  }

  update() {
    //this.controls.update();
    //console.log(this.perspectiveCamera.position);
    //console.log(this.perspectiveCamera.rotation);

    this.helper.matrixWorldNeedsUpdate = true;
    this.helper.update();
    this.helper.position.copy(this.orthographicCamera.position);
    this.helper.rotation.copy(this.orthographicCamera.rotation);
  }
}
