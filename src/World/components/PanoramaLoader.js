import {
  SphereGeometry,
  Mesh,
  MeshBasicMaterial,
  TextureLoader,
  RepeatWrapping,
  DoubleSide,
} from "three";

let texture = new TextureLoader().load("images/tower_default.png");
let _coordinate_list;
let _location_list;
let _desc_list;
let _pos;

class PanoramaLoader {
  constructor(coordinate_list, location_list, desc_list) {
    _location_list = location_list;
    _pos = 0;
    _coordinate_list = coordinate_list;
    _desc_list = desc_list;
    console.log(_pos);
  }

  setPanorama() {
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;

    let panorama = new Mesh(
      new SphereGeometry(500, 60, 40),
      new MeshBasicMaterial({ map: texture, side: DoubleSide })
    );

    // panorama.material.side(DoubleSide)
    // panorama.scale.x = -1;
    // panorama.scale.y = -1;
    // panorama.scale.z = -1
    panorama.tick = (delta) => {};
    return panorama;
  }

  async movePanorama(move) {
    return new Promise((resolve, reject) => {
      if (move == "prev" && _pos > 0) {
        _pos--;
      } else if (move == "next" && _pos < _location_list.length - 1) {
        _pos++;
      } else {
        console.log(_pos);
        reject("outofbounds");
      }
      console.log(_pos);

      this.loadPanorama().then(
        ({ panorama_new, locationName, description }) => {
          resolve({ panorama_new, locationName, description });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async loadPanorama() {
    return new Promise((resolve, reject) => {
      //TODO: call to server and get new image
      //TODO: set texture to image
      console.log(_coordinate_list[_pos]);
      console.log(_location_list[_pos]);
      resolve({
        panorama_new: this.setPanorama(),
        locationName: _location_list[_pos],
        description: _desc_list[_pos],
      });
    });
  }
}

export { PanoramaLoader };
