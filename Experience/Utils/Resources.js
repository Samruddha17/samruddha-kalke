import * as THREE from "three";
import { EventEmitter } from "events";
import Experience from "../Experience";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  startLoading() {
    for (const asset of this.assets) {
      if (asset.type === "glbModel") {
        this.loaders.gltfLoader.load(asset.path, (file) => {

          this.singleAssetLoaded(asset, file);

          const textureLoader = new THREE.TextureLoader();
          const bakedTexture = textureLoader.load("/models/bake1.jpg");
          bakedTexture.flipY = false;
          bakedTexture.encoding = THREE.sRGBEncoding;

          const bakedMaterial = new THREE.MeshBasicMaterial({
            map: bakedTexture,
          });

          file.scene.children[0].traverse((child) => {
            child.material = bakedMaterial;
          });
          
        });
      }
    }
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit("ready");
    }
  }
}
