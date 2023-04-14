import { BoxGeometry, Mesh, MeshStandardMaterial, MeshBasicMaterial, MathUtils } from 'three';

const radiansPerSecond = MathUtils.degToRad(30);

function createCube() {
    const geometry = new BoxGeometry(0.3,0.3,0.3);
    const material = new MeshStandardMaterial({ color: 'purple' });
    const cube = new Mesh(geometry, material);
  
    cube.rotation.set(-0.5, -0.1, 0.8);
  
    const radiansPerSecond = MathUtils.degToRad(30);
  
    // this method will be called once per frame
    cube.tick = (delta) => {
      // increase the cube's rotation each frame
      cube.rotation.z += radiansPerSecond * delta;
      cube.rotation.x += radiansPerSecond * delta;
      cube.rotation.y += radiansPerSecond * delta;
    };
  
    return cube;
  }
  
  export { createCube };