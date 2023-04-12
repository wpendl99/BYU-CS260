import ThreeMeshUI from "three-mesh-ui";
import * as THREE from "three";

let text;
let textBlock;
let desc;

function createPanel(input_text, input_desc) {
  const container = new ThreeMeshUI.Block({
    height: 0.8,
    width: 1.2,
    backgroundColor: new THREE.Color("white"),
  });

  container.position.set(0, -0.2, -1.8);
  container.rotation.x = -0.55;

  container.set({
    fontFamily: "/src/World/assets/Roboto-msdf.json",
    fontTexture: "/src/World/assets/Roboto-msdf.png",
  });

  const imageBlock = new ThreeMeshUI.Block({
    height: 0.17,
    width: 1,
    offset: 0.05, // distance separating the inner block from its parent
    margin: 0.1,
  });

  textBlock = new ThreeMeshUI.Block({
    height: 0.4,
    width: 0.8,
    margin: 0.0, // like in CSS, horizontal and vertical distance from neighbour
    offset: 0.05, // distance separating the inner block from its parent
    backgroundColor: new THREE.Color("white"),
    fontColor: new THREE.Color("black"),
  });

  container.add(imageBlock, textBlock);

  const loader = new THREE.TextureLoader();

  loader.load("/images/Excursions.jpg", (texture) => {
    imageBlock.set({ backgroundTexture: texture });
  });

  text = new ThreeMeshUI.Text({
    content: input_text,
  });

  text.set({
    fontColor: new THREE.Color("black"),
    fontSize: 0.08,
    textAlign: "left",
  });

  textBlock.add(text);

  textBlock.add(
    new ThreeMeshUI.Text({
      content: input_desc,
      fontSize: 0.04,
      textAlign: "right",
    })
  );

  textBlock.set({
    // alignContent: 'right', // could be 'center' or 'left'
    // alignContent has been deprecated, rely on alignItems or textAlign
    textAlign: "center",
    justifyContent: "center", // could be 'start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'
    padding: 0.03,
  });

  return container;
}

export { createPanel };
