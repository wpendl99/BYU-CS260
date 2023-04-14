import { World } from "./src/World/World.js";

async function main() {
	// get the URL parameters
	const urlParams = new URLSearchParams(window.location.search);

	// extract the ID from the URL
	const excursionID = urlParams.get("id");

	fetch(`/api/excursion/${excursionID}`)
		.then((response) => response.json())
		.then((excursion) => {
			console.log(excursion);
			const xrEnabledStops = excursion.stops.filter((stop) => stop.vrReady);

			// Get a reference to the container element
			const container = document.querySelector("#scene-container");

			// 1. Create an instance of the World app
			const world = new World(container, xrEnabledStops);

			// 2. Render the scene
			world.start();
		})
		.catch((error) => {
			const errorMessage = document.createElement("p");
			errorMessage.textContent =
				"Error: Server failed to load excursion data. Please try again later.";
			errorMessage.style.width = "100%";
			errorMessage.style.height = "100%";
			errorMessage.style.fontSize = "24px";
			errorMessage.style.display = "flex";
			errorMessage.style.justifyContent = "center";
			errorMessage.style.alignItems = "center";
			console.log(error);

			const container = document.querySelector("#scene-container");

			container.appendChild(errorMessage);
		});
}

main();
