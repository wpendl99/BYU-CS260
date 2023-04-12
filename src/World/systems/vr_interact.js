
import { scene, pl_instance, panorama, panel } from "../World.js"
import { createPanel } from "../components/panel.js";

let panorama_prev;
let panorama_next;
let prev_panel = createPanel("Loading previous destination...");
let next_panel = createPanel("Loading next destination...");

function onSelectStart2(e) {

    scene.remove(panel);
    // let prev_panel = createPanel("Loading previous destination...");
    scene.remove(next_panel);
    scene.add(prev_panel);

    let promise = pl_instance.loadPanorama("prev")
    .then(
        (result) => {
            console.log("prev");
            
            scene.remove(panorama);

            panorama_prev = pl_instance.setPanorama();
            scene.add(panorama_prev);
        }, 
        (reject) => {
            console.log("ERROR");
            
        });
    console.log(promise)

    
}

function onSelectStart1(e) {

    scene.remove(panel);
    // let next_panel = createPanel("Loading next destination...");
    scene.remove(prev_panel);
    scene.add(next_panel);


    let promise = pl_instance.loadPanorama("next")
    .then(
        (result) => {
            console.log("next");
            
            scene.remove(panorama);

            panorama_next = pl_instance.setPanorama();
            scene.add(panorama_next);
        }, 
        (reject) => {
            console.log("ERROR");
            
        });
    console.log(promise)
}

export { onSelectStart1, onSelectStart2 };