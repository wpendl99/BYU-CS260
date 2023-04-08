// Variables
// Retrieve the user data from local storage
let userData = JSON.parse(localStorage.getItem("userData"));
// signin form
const signinForm = document.getElementById("signin-form");
const usernameLabel = document.getElementById("username-label");
const usernameField = document.getElementById("username");
const passwordLabel = document.getElementById("password-label");
const passwordField = document.getElementById("password");
const errorLabel = document.getElementById("error-label");
const submitButton = document.getElementById("submit-button");

// Signin function
function signin(username, password) {
	// Check if the user exists in local storage
	if (
		userData &&
		userData[username] &&
		userData[username].password === password
	) {
		// User is logged in, do something
		localStorage.setItem("user", JSON.stringify(userData[username]));
		console.log("Successful User Login");
		return true;
	} else {
		// User doesn't exist or password is incorrect, show error message
		console.log("Error logging user in, try a new password or signup for one");
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
	const email = document.getElementById("username").value.toLowerCase();
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
