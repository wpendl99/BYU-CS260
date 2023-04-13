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
const signupForm = document.getElementById("signup-form");
const nameLabel = document.getElementById("name-label");
const nameField = document.getElementById("name");
const emailLabel = document.getElementById("email-label");
const emailField = document.getElementById("email");
const passwordLabel = document.getElementById("password-label");
const passwordField = document.getElementById("password");
const errorNameLabel = document.getElementById("error-name-label");
const errorEmailInvalidLabel = document.getElementById(
	"error-email-invalid-label"
);
const errorEmailTakenLabel = document.getElementById("error-email-taken-label");
const errorPasswordLabel = document.getElementById("error-password-label");
const submitButton = document.getElementById("submit-button");

async function signup(name, email, password) {
	let endpoint = `/api/auth/create`;

	if (await getUser(email)) {
		return false;
	}

	const response = await fetch(endpoint, {
		method: "post",
		body: JSON.stringify({
			name: name,
			email: email.toLowerCase(),
			password: password,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	});
	const body = await response.json();

	if (response?.status === 200) {
		localStorage.setItem("userName", userName);
		return true;
	} else {
		return false;
	}
}

// Validate Name Field
function validateName() {
	const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
	return regex.test(nameField.value);
}

// Validate Email Field
function validateEmail() {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(emailField.value);
}

// Validate Password Field
function validatePassword() {
	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
	return regex.test(passwordField.value);
}

// Add event listeners to disable button until the form is filled out
function validateForm() {
	if (nameField.value && emailField.value && passwordField.value) {
		// Clear Emails
		errorNameLabel.classList.add("hidden");
		errorEmailInvalidLabel.classList.add("hidden");
		errorEmailTakenLabel.classList.add("hidden");
		errorPasswordLabel.classList.add("hidden");
		// Enable Button
		submitButton.removeAttribute("disabled");
	} else {
		console.log("Hiding Button");
		submitButton.setAttribute("disabled", true);
	}
}
validateForm();

nameField.addEventListener("input", validateForm);
emailField.addEventListener("input", validateForm);
passwordField.addEventListener("input", validateForm);

// Add listener for signin event
signupForm.addEventListener("submit", function (event) {
	event.preventDefault();

	// Check to see if values are valid first
	if (!validateName()) {
		// Show error
		errorNameLabel.classList.remove("hidden");
		// Shake Button
		submitButton.classList.add("shake");
		submitButton.setAttribute("disabled", true);
		return;
	} else if (!validateEmail()) {
		// Show error
		errorEmailInvalidLabel.classList.remove("hidden");
		// Shake Button
		submitButton.classList.add("shake");
		submitButton.setAttribute("disabled", true);
		return;
	} else if (!validatePassword()) {
		// Show error
		errorPasswordLabel.classList.remove("hidden");
		// Shake Button
		submitButton.classList.add("shake");
		submitButton.setAttribute("disabled", true);
		return;
	}

	// Get the values from the form
	const name = nameField.value;
	const email = emailField.value;
	const password = passwordField.value;

	if (signup(name, email, password)) {
		// Successful login
		window.location.assign("./home.html");
	} else {
		// Error Handling
		// Remove Password field, show error, turn labels red and shake buttons
		// Remove Password Field
		passwordField.value = "";
		// Show Error
		errorLabel.classList.remove("hidden");
		// Turn Labels red
		emailLabel.classList.add("error");
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
