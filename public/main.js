// Verify if already signed in
async function authorize() {
	let authenticated = false;
	const localUser = await JSON.parse(localStorage.getItem("user"));
	if (localUser) {
		const user = await getUser(localUser.username);
		authenticated = user?.authenticated;
	}

	if (authenticated) {
		const currentPath = location.pathname;
		if (currentPath === "/index.html" || currentPath === "/") {
			window.location.href = "/home.html";
		}
	}
}
authorize();

window.addEventListener("load", function () {
	// Get user
	let user = JSON.parse(localStorage.getItem("user"));

	waitForElm("#userHeaderBar").then(() => {
		// User HeaderBar
		const userHeaderBar = document.getElementById("userHeaderBar");
		const navBarLogo = document.getElementById("navbar-logo");

		// User Javascript
		// Code for If the user is logged in, change the header bar
		if (userHeaderBar) {
			if (user) {
				console.log("User Found");
				// user is logged in
				// Change href for center button
				navBarLogo.href = "./home.html";
				// remove signin and signup buttons, replace with name and logout
				const name = user.name.split(" ")[0]; // assuming you stored the user's name in localStorage

				// Drop down Stuff
				// Main Dropdown div
				const dropdown = document.createElement("div");
				dropdown.classList.add("dropdown");

				// Welcome User and Caret
				const welcomeUserLink = document.createElement("div");
				welcomeUserLink.innerText = `Welcome, ${user.name}`;
				welcomeUserLink.classList.add("dropdown-toggle");
				welcomeUserLink.id = "dropdownMenuButton";
				welcomeUserCaret = document.createElement("span");
				welcomeUserCaret.classList.add("fa", "fa-angle-down", "caret");
				welcomeUserLink.appendChild(welcomeUserCaret);

				// Sign out button and dropdown
				const dropdownMenu = document.createElement("div");
				dropdownMenu.classList.add("dropdown-content");
				dropdownMenu.classList.add("hidden");
				const signOutButton = document.createElement("a");
				signOutButton.innerText = "Sign Out";
				signOutButton.classList.add("dropdown-item");
				signOutButton.addEventListener("click", () => {
					signout();
				});
				dropdownMenu.appendChild(signOutButton);

				// Event listener to show menu
				welcomeUserLink.addEventListener("click", () => {
					dropdownMenu.classList.toggle("hidden");
				});
				// Add click event listener to document
				document.addEventListener("click", (event) => {
					// Check if click event target is inside the menu
					if (
						!welcomeUserLink.contains(event.target) &&
						!signOutButton.contains(event.target)
					) {
						// Close the menu
						dropdownMenu.classList.add("hidden");
					}
				});

				dropdown.appendChild(welcomeUserLink);
				dropdown.appendChild(dropdownMenu);
				userHeaderBar.appendChild(dropdown);
			} else {
				console.log("No user Found");
				// user is not logged in
				// Change href back to index.html
				navBarLogo.href = "./index.html";
				// Add Back signin and signup buttons
				const signinButton = document.createElement("a");
				signinButton.innerText = "Sign In";
				signinButton.classList.add("reverse-button");
				signinButton.addEventListener("click", () => {
					window.location.assign("./signin.html");
				});

				const signupButton = document.createElement("a");
				signupButton.innerText = "Sign Up";
				signupButton.classList.add("button");
				signupButton.addEventListener("click", () => {
					// perform signup logic
					window.location.assign("./signup.html");
				});

				userHeaderBar.appendChild(signinButton);
				userHeaderBar.appendChild(signupButton);
			}
		} else {
			console.log("Header Not Found");
		}
	});
});

function signout() {
	// Sign user out;
	localStorage.removeItem("user");
	fetch(`/api/auth/logout`, {
		method: "delete",
	}).then(() => (window.location.href = "./signout.html"));
}

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

function waitForElm(selector) {
	return new Promise((resolve) => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver((mutations) => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	});
}
