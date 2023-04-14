import ThreeMeshUI from "three-mesh-ui";
import * as THREE from "three";

let text;
let textBlock;
let desc;

function createControllerPanel(direction) {
  const container = new ThreeMeshUI.Block({
    height: 0.03,
    width: 0.1,
    backgroundColor: new THREE.Color("white"),
  });

  container.position.set(0.0, -0.03, -0.05);
  container.rotation.x = -0.65;

  container.set({
    fontFamily: "/src/World/assets/Roboto-msdf.json",
    fontTexture: "/src/World/assets/Roboto-msdf.png",
  });

  textBlock = new ThreeMeshUI.Block({
    height: 0.03,
    width: 0.1,
    margin: 0.0, // like in CSS, horizontal and vertical distance from neighbour
    offset: 0.0, // distance separating the inner block from its parent
    backgroundColor: new THREE.Color("white"),
    fontColor: new THREE.Color("black"),
  });

  container.add(textBlock);

  text = new ThreeMeshUI.Text({
    content: direction,
  });

  text.set({
    fontColor: new THREE.Color("black"),
    fontSize: 0.01,
    textAlign: "center",
    offset: 0.0,
  });

  textBlock.add(text);

  textBlock.set({
    // alignContent: 'right', // could be 'center' or 'left'
    // alignContent has been deprecated, rely on alignItems or textAlign
    textAlign: "center",
    justifyContent: "center", // could be 'start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'
    padding: 0.0,
  });

  return container;
}

export { createControllerPanel };
