import { createCamera } from './components/camera.js';
import { PanoramaLoader } from './components/PanoramaLoader.js';
import { createScene } from './components/scene.js';
import { createLights } from './components/lights.js';
import { Renderer } from './systems/Renderer.js';
import { Resizer } from './systems/Resizer.js';
import { ARButton } from 'three/addons/webxr/ARButton.js';
import { VRButton } from 'three/addons/webxr/VRButton.js'
import { Loop } from './systems/Loop.js';
import { VRControl } from './systems/VRControl.js';
import { Vector3 } from 'three';
import { controller1, controller2, controllerGrip1, controllerGrip2, hand1, hand2 } from './components/controllers.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import ThreeMeshUI from 'three-mesh-ui';
//import { onSelectStart1, onSelectStart2 } from './systems/vr_interact.js'
import { createPanel } from './components/panel.js';

// These variables are module-scoped: we cannot access them
// from outside the module
let camera;
let renderer;
let scene;
let loop;
let controls;
let vrControl;
let pl_instance;
let panorama;
let panel;


class World {
    constructor(container, xrEnabledStops) {
      const _xrEnabledStops = xrEnabledStops;
      camera = createCamera();
      scene = createScene();
      renderer = Renderer.getRenderer();
      loop = new Loop(camera, scene, renderer);
      container.append(renderer.domElement);
  
      const light = createLights();

      const coordinateList = xrEnabledStops.map(stop => ({ lat: stop.lat, lng: stop.lng }));
      const locationList = xrEnabledStops.map(stop => stop.name);

      pl_instance = new PanoramaLoader(coordinateList, locationList);
      scene.add(camera, light);
      let promise = pl_instance.loadPanorama()
        .then(
            (resolve) => {
                panorama = resolve.panorama_new;
                scene.add(panorama);

                panel = createPanel(resolve.locationName);
                scene.add(panel);
            }, 
            (reject) => {
                console.log(reject);
                if (reject == "outofbounds") {
                  scene.remove(panel);
                  panel = createPanel("Server error, please refresh the page.");
                  scene.add(panel);
                }
                else {
                  scene.remove(panel);
                  panel = createPanel("Server error, please refresh the page.");
                  scene.add(panel);
                }
                
            });

      // const controls = new OrbitControls(camera, renderer.domElement);
      // controls.maxPolarAngle = Math.PI * 1;
      // controls.target = new Vector3(0, 1, -5);
      // controls.target = new Vector3(0, 0, -0.01);
      // controls.minDistance = 450;
      // controls.maxDistance = 450;
      
      // controls.update();

      controls = new OrbitControls( camera, renderer.domElement );
      controls.target.set( 0, 0, 0 );
      camera.position.set(0, 0, 1);
      controls.update();
  
      const resizer = new Resizer(container, camera, renderer);

      //TODO: The below two lines are for local preview vs. production
      //document.body.appendChild(ARButton.createButton(renderer));
      document.body.appendChild(VRButton.createButton(renderer));


      //controllers
      const _controller1 = controller1;
      const _controllerGrip1 = controllerGrip1;
      const _controller2 = controller2;
      const _controllerGrip2 = controllerGrip2;

      _controller1.addEventListener('selectstart', onSelectStart1);
      _controller2.addEventListener('selectstart', onSelectStart2);

      const button = new ThreeMeshUI.Text({textContent: "click me"});
      scene.add( button );


      scene.add(_controller1, _controllerGrip1, _controller2, _controllerGrip2);




    }
  
    render() {
      // draw a single frame
      renderer.render(scene, camera);
    }

    start() {
        loop.start();
      }
      
    stop() {
      loop.stop();
    }

    getPanorama() {
      return panorama;
    }

    setPanorama(new_panorama) {
      panorama = new_panorama;
    }

    getPanel() {
      return panel;
    }

    setPanel(new_panel) {
      panel = new_panel;
    }

    getPanoramaLoader() {
      return pl_instance
    }

    
  }

  function onSelectStart2(e) {

    

    scene.remove(panel);
    let oldPanel = panel; 
    panel = createPanel("Loading previous destination...");
    scene.add(panel);


    let promise = pl_instance.movePanorama("prev")
    .then(
        (resolve) => {
            console.log("prev");
            
            scene.remove(panorama);
            panorama = resolve.panorama_new;
            scene.add(panorama);

            scene.remove(panel);;
            panel = createPanel(resolve.locationName);
            scene.add(panel);
        }, 
        (reject) => {
            console.log(reject);
            if (reject == "outofbounds") {
              scene.remove(panel);
              panel = oldPanel;
              scene.add(panel);
            }
            else {
              scene.remove(panel);
              panel = createPanel("Server error, please refresh the page.");
              scene.add(panel);
            }
        });
    console.log(promise)

    
}

function onSelectStart1(e) {

    scene.remove(panel);
    let oldPanel = panel; 
    panel = createPanel("Loading next destination...");
    scene.add(panel);


    let promise = pl_instance.movePanorama("next")
    .then(
        (resolve) => {
            console.log("next");
            
            scene.remove(panorama);
            panorama = resolve.panorama_new;
            scene.add(panorama);

            scene.remove(panel);;
            panel = createPanel(resolve.locationName);
            scene.add(panel);
        }, 
        (reject) => {
            console.log(reject);
            if (reject == "outofbounds") {
              scene.remove(panel);
              panel = oldPanel;
              scene.add(panel);
            }
            else {
              scene.remove(panel);
              panel = createPanel("Server error, please refresh the page.");
              scene.add(panel);
            }
            
        });
    console.log(promise)
}
  
export { World, renderer, scene};

  
  