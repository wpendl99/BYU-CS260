
import { scene, pl_instance, panorama } from "../World.js"

let panorama_prev;
let panorama_next;

function onSelectStart2(e) {
    let promise = pl_instance.loadPanorama("prev")
    .then(
        (result) => {
            console.log("prev");
            
            scene.remove(panorama);

            panorama_next = pl_instance.setPanorama();
            scene.add(panorama_next);
        }, 
        (reject) => {
            console.log("ERROR");
            
        });
    console.log(promise)
    
}

function onSelectStart1(e) {
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