// Verify if already signed in
async function authorize() {
	let authenticated = false;
	const localUser = await JSON.parse(localStorage.getItem("user"));
	if (localUser) {
		const user = await getUser(user.username);
		authenticated = user?.authenticated;
	}

	if (authenticated) {
		const currentPath = location.pathname;
		if (currentPath !== "/home.html") {
			window.location.href = "/home.html";
		}
	}
}
authorize();

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

	if (response?.status === 200) {
		// Set User in Local Storage
		const user = await getUser(username);
		console.log(user);
		localStorage.setItem(
			"user",
			JSON.stringify({ name: user.name, username: user.email })
		);
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
signinForm.addEventListener("submit", async function (event) {
	event.preventDefault();

	// Get the values from the form
	const email = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	if (await signin(email, password)) {
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
	try {
		const response = await fetch(`/api/user/${email}`);
		if (response.status === 200) {
			return response.json();
		} else if (response.status === 404) {
			return false;
		} else {
			throw new Error("Error fetching user data");
		}
	} catch (error) {
		console.log(error);
		throw new Error("Error fetching user data");
	}
}
