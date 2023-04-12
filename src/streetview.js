const fetch = require("node-fetch");
const { createCanvas, Image } = require("canvas");
const sharp = require("sharp");
const fs = require("fs");

// Builds the URL of the script on Google's servers that returns the closest
// panoramas (ids) to a give GPS coordinate.
function buildPanoidsUrl(lat, lon) {
	const url = `https://maps.googleapis.com/maps/api/js/GeoPhotoService.SingleImageSearch?pb=!1m5!1sapiv3!5sUS!11m2!1m1!1b0!2m4!1m2!3d${lat}!4d${lon}!2d50!3m10!2m2!1sen!2sGB!9m1!1e2!11m4!1m3!1e2!2b1!3e2!4m10!1e1!1e2!1e3!1e4!1e8!1e6!5m1!1e2!6m1!1e2&callback=_xdc_._v2mub5`;
	return url;
}

// Gets the response of the script on Google's servers that returns the
// closest panoramas (ids) to a give GPS coordinate.
async function fetchPanoidsData(lat, lon) {
	const url = buildPanoidsUrl(lat, lon);
	const response = await fetch(url);
	return response;
}

// Gets the closest panoramas (ids) to the GPS coordinates.
// If the 'closest' boolean parameter is set to true, only the closest panorama
// will be gotten (at all the available dates)
function panoids(lat, lon, closest = false, disp = false) {
	return fetchPanoidsData(lat, lon)
		.then((response) => response.text())
		.then((text) => {
			const panRegExp =
				/\[[0-9]+,"(.+?)"\].+?\[\[null,null,(-?[0-9]+.[0-9]+),(-?[0-9]+.[0-9]+)\]/g;
			const dateRegExp = /([0-9]?[0-9]?[0-9])?,?\[(20[0-9][0-9]),([0-9]+)\]/g;

			let pans = [...text.matchAll(panRegExp)].map((p) => ({
				panoid: p[1],
				lat: parseFloat(p[2]),
				lon: parseFloat(p[3]),
			}));

			pans = pans.filter((p, i, arr) => arr.indexOf(p) === i);

			if (disp) {
				console.log(pans);
			}

			// let dates = [...text.matchAll(dateRegExp)].map((d) => [
			// 	parseInt(d[2]),
			// 	parseInt(d[3]),
			// ]);
			// dates = dates.filter((d) => d[1] >= 1 && d[1] <= 12);

			// if (dates.length > 0) {
			// 	const [year, month] = dates.pop();
			// 	pans[0] = { ...pans[0], year, month };

			// 	dates.reverse();

			// 	dates.forEach((date, i) => {
			// 		const [year, month] = date;
			// 		pans[pans.length - 1 - i] = {
			// 			...pans[pans.length - 1 - i],
			// 			year,
			// 			month,
			// 		};
			// 	});
			// }

			return pans;
		});
}

function tilesInfo(panoid, zoom = 5) {
	const tilesX = 2 ** (zoom + 2);
	const tilesY = 2 ** (zoom - 1);

	const coord = Array.from({ length: tilesX }, (_, x) =>
		Array.from({ length: tilesY }, (_, y) => [x, y])
	).flat();

	const image_url =
		"https://maps.google.com/cbk?output=tile&panoid={}&zoom={}&x={}&y={}";

	const tiles = coord.map(([x, y]) => {
		const fname = `${panoid}_${x}x${y}.jpg`;
		const url = image_url
			.replace("{}", panoid)
			.replace("{}", zoom)
			.replace("{}", x)
			.replace("{}", y);
		return [x, y, fname, url];
	});

	return tiles;
}

async function downloadPanoramaV3(panoid, zoom = 5, disp = false) {
	const tileWidth = 512;
	const tileHeight = 512;
	const imgW = 512 * 2 ** zoom;
	const imgH = 512 * 2 ** (zoom - 1);
	const tiles = tilesInfo(panoid, zoom);

	const validTiles = [];
	for (let i = 0; i < tiles.length; i++) {
		const [x, y, fname, url] = tiles[i];
		if (disp && i % 20 === 0) {
			console.log(`Image ${i} / ${tiles.length}`);
		}
		if (x * tileWidth < imgW && y * tileHeight < imgH) {
			const response = await fetch(url);
			const arrayBuffer = await response.arrayBuffer();
			validTiles.push(await sharp(Buffer.from(arrayBuffer)).toBuffer());
		}
	}

	const panorama = sharp({
		create: {
			width: imgW,
			height: imgH,
			channels: 3,
			background: { r: 0, g: 0, b: 0 },
		},
	});

	let operations = [];
	for (let i = 0, j = 0; i < tiles.length; i++) {
		const [x, y] = tiles[i];
		if (x * tileWidth < imgW && y * tileHeight < imgH) {
			const tile = validTiles[j++];
			operations.push({
				input: tile,
				left: x * tileWidth,
				top: y * tileHeight,
			});
		}
	}

	const buffer = await panorama.composite(operations).png().toBuffer();
	return buffer;
}

async function getPanoramaImageAsBase64(lat, lon, zoom = 5) {
	try {
		const pans = await panoids(lat, lon);
		if (pans.length === 0) {
			throw new Error("No panoids found for the given coordinates.");
		}

		const panoid = pans[0].panoid;
		console.log(panoid);
		const buffer = await downloadPanoramaV3(panoid, zoom);

		const base64Image = `data:image/png;base64,${buffer.toString("base64")}`;
		return base64Image;
	} catch (error) {
		console.error("Error getting panorama image as base64:", error);
		throw error;
	}
}

async function savePanoramaImageToFile(
	lat,
	lon,
	zoom = 5,
	filename = "panorama.png"
) {
	try {
		const base64Image = await getPanoramaImageAsBase64(lat, lon, zoom);

		// Remove the data:image/png;base64, prefix
		const base64Data = base64Image.replace(/^data:image\/png;base64,/, "");

		// Convert the base64 string back to a binary buffer
		const buffer = Buffer.from(base64Data, "base64");

		// Write the buffer to a file
		fs.writeFileSync(filename, buffer);
	} catch (error) {
		console.error("Error saving panorama image to file:", error);
		throw error;
	}
}

// // Usage example
// downloadPanoramaV3("PANOID_HERE", 3)
// 	.then((buffer) => {
// 		// Save the buffer to a file or use it in any other way
// 		require("fs").writeFileSync("panorama.png", buffer);
// 	})
// 	.catch((error) => {
// 		console.error("Error downloading panorama:", error);
// 	});

// // Usage example:
// panoids(40.2506346, -111.6605027)
// 	.then((pans) => {
// 		console.log(pans);
// 	})
// 	.catch((error) => {
// 		console.error("Error getting panoids:", error);
// 	});

// // Usage example:
// getPanoramaImageAsBase64(40.2506346, -111.6605027, 3)
// 	.then((base64Image) => {
// 		console.log(base64Image);
// 	})
// 	.catch((error) => {
// 		console.error("Error getting panorama image as base64:", error);
// 	});

// // Usage example:
// savePanoramaImageToFile(40.2506346, -111.6605027, 3, "panorama.png")
// 	.then(() => {
// 		console.log("Panorama image saved to panorama.png");
// 	})
// 	.catch((error) => {
// 		console.error("Error saving panorama image to file:", error);
// 	});
