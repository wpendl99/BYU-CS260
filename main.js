// Global Variables
// Retrieve the user data from local storage
let userData = JSON.parse(localStorage.getItem("userData"));
// logged-in user
let user = JSON.parse(localStorage.getItem("user"));

// User Javascript
// Login function
function login(username, password) {
	// Check if the user exists in local storage
	if (
		userData &&
		userData[username] &&
		userData[username].password === password
	) {
		// User is logged in, do something
		user = userData[username];
		localStorage.setItem("user", JSON.stringify(user));
		console.log("Successful User Login");
		return true;
	} else {
		// User doesn't exist or password is incorrect, show error message
		console.log("Error logging user in, try a new password or signup for one");
		return false;
	}
}

// Signup function
function signup(name, email, password) {
	// Check if the username already exists in local storage
	if (userData && userData[username]) {
		// User already exists, show error message
		console.log("Username already exists!");
		return false;
	} else {
		// Create a new user object
		let newUser = {
			name: name,
			username: email,
			password: password,
		};

		// Add the new user to the user data object
		if (!userData) {
			userData = {};
		}
		userData[username] = newUser;

		// Save the user data to local storage
		localStorage.setItem("userData", JSON.stringify(userData));
		localStorage.setItem("user", JSON.stringify(newUser));

		// Set logged in user
		user = newUser;

		// User is signed up, do something
		console.log("User is signed up!");
		return true;
	}
}

function signout() {
	// Sign user out;
	localStorage.removeItem("user");
}

function getUser() {
	if (!user) {
		return null;
	}
	return user;
}
