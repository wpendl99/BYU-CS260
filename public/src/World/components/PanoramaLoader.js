import {
	SphereGeometry,
	Mesh,
	MeshBasicMaterial,
	TextureLoader,
	RepeatWrapping,
	DoubleSide,
	Texture,
} from "three";

let texture;
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
		return new Promise(async (resolve, reject) => {
			// texture = new Texture();

			// let image = new Image();
			// image.onload = function () {
			//   texture.image = image;
			//   texture.needsUpdate = true;
			// };

			let lat = _coordinate_list[_pos].lat;
			let lon = _coordinate_list[_pos].lng;
			let zoom = 3;

			const response = await fetch(
				//`http://10.37.250.26:5000/panorama?lat=${lat}&lon=${lon}&zoom=${zoom}`
				`https://pano.worldexcursions.click/panorama/cdn?lat=${lat}&lon=${lon}&zoom=${zoom}`
			);
			console.log(response);
			if (response.ok) {
				const data = await response.json();

				texture = new TextureLoader().load(
					data.imageUrl + "?not-from-cache-please",
					function (texture) {}
				);
				// const base64Image = data.base64Image;
				// image.src = base64Image;
				// Do something with the base64Image, e.g., display it on the page
				// console.log(base64Image);

				console.log(_location_list[_pos]);
				resolve({
					panorama_new: this.setPanorama(),
					locationName: _location_list[_pos],
					description: _desc_list[_pos],
				});
			} else {
				// Handle HTTP errors
				console.error(
					"Error fetching panorama image:",
					response.status,
					response.statusText
				);
				reject(response);
			}
		});
	}
}

export { PanoramaLoader };
