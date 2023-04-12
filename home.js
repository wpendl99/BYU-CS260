// Global Variables
// logged-in user

// excursions data
let excursions = JSON.parse(localStorage.getItem("excursions"));
let likedExcursions = [];
try {
	likedExcursions = JSON.parse(localStorage.getItem("user")).liked;
} catch {}

const fetchData = async () => {
	const response = await fetch("./data/excursions.json");
	const excursions = await response.json();
	localStorage.setItem("excursions", JSON.stringify(excursions));
};

if (!localStorage.getItem("excursions")) {
	fetchData();
}

const addExcursion = (excursion) => {
	const storedData = JSON.parse(localStorage.getItem("excursions"));
	storedData.push(excursion);
	localStorage.setItem("excursions", JSON.stringify(storedData));
};

const removeExcursion = (excursionTitle) => {
	const storedData = JSON.parse(localStorage.getItem("excursions"));
	const index = storedData.findIndex(
		(excursion) => excursion.title === excursionTitle
	);
	if (index !== -1) {
		storedData.splice(index, 1);
		localStorage.setItem("excursions", JSON.stringify(storedData));
	}
};

window.addEventListener("load", function () {
	// load initial data
	for (let i = 0; i < excursions.excursions.length; i++) {
		const excursion = excursions.excursions[i];

		const li = document.createElement("li");
		li.classList.add("excursions-card");

		const img = document.createElement("img");
		img.classList.add("img-fluid", "imp");
		img.setAttribute("src", excursion.coverPhoto);

		const gradientDiv = document.createElement("div");
		gradientDiv.classList.add("excursions-card-gradient");

		const iconsDiv = document.createElement("div");
		iconsDiv.classList.add("card-icons");

		const heartSpan = document.createElement("span");
		heartSpan.classList.add("heart-icon");
		const heartIcon = document.createElement("i");
		// Check to see if the excursion is liked
		if (likedExcursions.keys && likedExcursions.indexOf(excursion.title) >= 0) {
			heartIcon.classList.add("fas", "fa-heart");
			heartSpan.classList.add("heart-liked");
		} else {
			heartIcon.classList.add("fas", "fa-heart");
			heartSpan.classList.add("heart-unliked");
		}
		heartSpan.appendChild(heartIcon);
		iconsDiv.appendChild(heartSpan);

		if (excursion.vrReady) {
			const vrSpan = document.createElement("span");
			vrSpan.classList.add("vr-icon");
			const vrIcon = document.createElement("i");
			vrIcon.classList.add("fas", "fa-vr-cardboard");
			vrSpan.appendChild(vrIcon);
			iconsDiv.appendChild(vrSpan);
		}

		const textDiv = document.createElement("div");
		textDiv.classList.add("excursions-card-text");

		const titleH3 = document.createElement("h3");
		titleH3.textContent = excursion.title;

		const numStops = excursion.stops ? excursion.stops.length : 0;
		const subtitleP = document.createElement("p");
		subtitleP.classList.add("excursions-card-subtitle");
		subtitleP.textContent = `${numStops} stop`;

		textDiv.appendChild(titleH3);
		textDiv.appendChild(subtitleP);

		li.appendChild(img);
		li.appendChild(gradientDiv);
		li.appendChild(iconsDiv);
		li.appendChild(textDiv);

		if (user && excursion.creator === user.username) {
			document.getElementById("your-excursions").appendChild(li);
		} else {
			document.getElementById("other-excursions").appendChild(li);
		}
	}

	updateExcursions();
});

const updateExcursions = () => {
	const yourExcursions = document.getElementById("your-excursions");
	// Check if user exists
	if (!user) {
		// If user doesn't exist, append sign in message & hide Create modal button
		const message = document.createElement("p");
		message.innerHTML = `<a href="./signin.html" class="inline-red-link">Sign in</a> to start creating your excursions!`;
		message.classList.add("excursions-message");
		yourExcursions.appendChild(message);
		yourExcursions.style.display = "flex";
		yourExcursions.style.flexDirection = "column";
		// Hide Button
		$("#create-modal-button").toggle(false);
	} else if (yourExcursions.childElementCount === 0) {
		// If they do exists, append create excursion message and show button
		const message = document.createElement("p");
		message.textContent =
			"Click the '+' sign to start creating your excursions!";
		message.classList.add("excursions-message");
		yourExcursions.appendChild(message);
		yourExcursions.style.display = "flex";
		yourExcursions.style.flexDirection = "column";
		// Show Button
		$("#create-modal-button").toggle(true);
	} else {
		yourExcursions.style.display = "grid";
		// Show Button
		$("#create-modal-button").toggle(true);
	}
};
