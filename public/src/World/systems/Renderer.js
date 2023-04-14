import { WebGLRenderer } from 'three';

let renderer;

function createRenderer() {
  renderer = new WebGLRenderer({ antialias: true });

  // turn on the physically correct lighting model
  renderer.physicallyCorrectLights = true;

  //turn on xr
  renderer.xr.enabled = true;

  return renderer;
}

class Renderer {
  static getRenderer() {
    if (typeof renderer === 'undefined') {
      createRenderer();
    }

    return renderer;
  }
}

export { Renderer };

