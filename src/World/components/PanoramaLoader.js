
import { SphereGeometry, Mesh, MeshBasicMaterial, TextureLoader, RepeatWrapping, DoubleSide}  from 'three';

let texture = new TextureLoader().load('images/tower_default.png');
let _location_list;
let _pos;

class PanoramaLoader {
  constructor(location_list) {
    _location_list = location_list
    _pos = 0
    
  }

  setPanorama() {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;

    let panorama = new Mesh(new SphereGeometry(500, 60, 40), new MeshBasicMaterial({map: texture, side: DoubleSide}));
  
    // panorama.material.side(DoubleSide)
    // panorama.scale.x = -1;
    // panorama.scale.y = -1;
    // panorama.scale.z = -1
    panorama.tick = (delta) => {
    };
    return panorama;
  }

  async loadPanorama(move) {
    return new Promise((resolve, reject) => {
      if (move == "prev" && _pos > 0) {
        _pos--;
      }
      else if (move == "next" && _pos < _location_list.length) {
        _pos++;
      }
      else {
        reject(_pos)
      }

      // get new image through API call
      let data = "nice"
      
      resolve(data)

      //TODO: call to server and get new image
      //TODO: set texture to image
    });

  }

}

export { PanoramaLoader };