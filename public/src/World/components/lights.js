import { DirectionalLight } from 'three';

function createLights() {
    const light = new DirectionalLight('white', 8); // color, intensity

    // move the light right, up, and towards us
    light.position.set(10, 10, 10); //left, up, towards us

    return light;
}

export { createLights };