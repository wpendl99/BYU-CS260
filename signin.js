(async () => {
	let authenticated = false;
	const userName = localStorage.getItem("userName");
	if (userName) {
		const user = await getUser(username);
		authenticated = user?.authenticated;
	}

	if (authenticated) {
		window.location.href = "/home.html";
	}
})();

// Variables
// signin form
const signinForm = document.getElementById("signin-form");
const usernameLabel = document.getElementById("username-label");
const usernameField = document.getElementById("username");
const passwordLabel = document.getElementById("password-label");
const passwordField = document.getElementById("password");
const errorLabel = document.getElementById("error-label");
const submitButton = document.getElementById("submit-button");

async function signin(username, password) {
	let endpoint = `/api/auth/login`;

	const response = await fetch(endpoint, {
		method: "post",
		body: JSON.stringify({ email: username.toLowerCase(), password: password }),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	});
	const body = await response.json();

	if (response?.status === 200) {
		localStorage.setItem("userName", username);
		return true;
	} else {
		return false;
	}
}

// Add event listeners to disable button until the form is filled out
function validateForm() {
	if (usernameField.value && passwordField.value) {
		errorLabel.classList.add("hidden");
		submitButton.removeAttribute("disabled");
	} else {
		console.log("Hiding Button");
		submitButton.setAttribute("disabled", true);
	}
}
validateForm();

usernameField.addEventListener("input", validateForm);
passwordField.addEventListener("input", validateForm);

// Add listener for signin event
signinForm.addEventListener("submit", function (event) {
	event.preventDefault();

	// Get the values from the form
	const email = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	if (signin(email, password)) {
		// Successful login
		window.location.assign("./home.html");
	} else {
		// Error Handling
		// Remove Password field, show error, turn labels red and shake buttons
		// Remove PAssword Field
		passwordField.value = "";
		// Show Error
		errorLabel.classList.remove("hidden");
		// Turn Labels red
		usernameLabel.classList.add("error");
		passwordLabel.classList.add("error");
		// Shake Button
		submitButton.classList.add("shake");
		submitButton.setAttribute("disabled", true);
	}
});

// Listener to remove shake effect when the animation ends
submitButton.addEventListener("animationend", () => {
	submitButton.classList.remove("shake");
});

async function getUser(email) {
	let scores = [];
	// See if we have a user with the given email.
	const response = await fetch(`/api/user/${email}`);
	if (response.status === 200) {
		return response.json();
	}

	return null;
}
