// Global Variables
// logged-in user

// excursions data
let excursions = JSON.parse(localStorage.getItem("excursions"));

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
		heartIcon.classList.add("fas", "fa-heart");
		heartSpan.appendChild(heartIcon);

		const vrSpan = document.createElement("span");
		vrSpan.classList.add("vr-icon");
		const vrIcon = document.createElement("i");
		vrIcon.classList.add("fas", "fa-vr-cardboard");
		vrSpan.appendChild(vrIcon);

		iconsDiv.appendChild(heartSpan);
		iconsDiv.appendChild(vrSpan);

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
		// If user doesn't exist, append sign in message
		const message = document.createElement("p");
		message.innerHTML = `<a href="./signin.html" class="inline-red-link">Sign in</a> to start creating your excursions!`;
		message.classList.add("excursions-message");
		yourExcursions.appendChild(message);
		yourExcursions.style.display = "flex";
		yourExcursions.style.flexDirection = "column";
	} else if (yourExcursions.childElementCount === 0) {
		const message = document.createElement("p");
		message.textContent =
			"Click the '+' sign to start creating your excursions!";
		message.classList.add("excursions-message");
		yourExcursions.appendChild(message);
		yourExcursions.style.display = "flex";
		yourExcursions.style.flexDirection = "column";
	} else {
		yourExcursions.style.display = "grid";
	}
};
