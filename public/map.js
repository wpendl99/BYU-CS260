function initMap() {
	const myLatlng = { lat: -25.363, lng: 131.044 };
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 4,
		center: myLatlng,
	});
	// Create the initial InfoWindow.
	let infoWindow = new google.maps.InfoWindow({
		content: "Click the map to get Lat/Lng!",
		position: myLatlng,
	});

	infoWindow.open(map);
	// Configure the click listener.
	map.addListener("click", (mapsMouseEvent) => {
		// Close the current InfoWindow.
		infoWindow.close();
		// Create a new InfoWindow.
		infoWindow = new google.maps.InfoWindow({
			position: mapsMouseEvent.latLng,
		});
		infoWindow.setContent(
			JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
		);
		infoWindow.open(map);
		const lat = mapsMouseEvent.latLng.lat();
		const lng = mapsMouseEvent.latLng.lng();
		const parentWindow = window.opener;

		parentWindow.postMessage({ lat, lng, id }, "*");
	});
}

window.initMap = initMap;

const id = getUrlParameter("id");

function getUrlParameter(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	const results = regex.exec(location.search);
	return results === null
		? ""
		: decodeURIComponent(results[1].replace(/\+/g, " "));
}
