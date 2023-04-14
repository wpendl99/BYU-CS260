var createMode = false;
var editMode = false;
var viewMode = false;
var prevExcursion = "";

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

$(document).ready(function () {
	// Add new stop
	$(document).on("click", ".add-stop-btn", function () {
		const stops = document.getElementById("stops");
		// Check that all previous stops have been filled out
		const allStopsFilledOut = Array.from(stops.children).every((stop) => {
			const nameInput = stop.querySelector("#stopName");
			const descriptionInput = stop.querySelector("#stopDescription");
			const addressInput = stop.querySelector("#stopAddress");

			return (
				nameInput.value !== "" &&
				descriptionInput.value !== "" &&
				addressInput.value !== ""
			);
		});

		if (allStopsFilledOut) {
			// Get Copy of last stop
			var $newStop = $(".stop-li").last().clone();
			$newStop.find(":input").val("");
			$newStop.appendTo("#stops");
		}
	});

	// Delete stop
	$(document).on("click", ".delete-stop-btn", function () {
		if ($("#stops").children().length > 1) {
			$(this).closest("li").remove();
		} else {
			$(this).closest("li").find(":input").val("");
		}
	});
});

// Update Image Preview when you upload an image
$(document).on("change", "#excursion-upload", function () {
	var file = this.files[0];
	if (file) {
		var reader = new FileReader();
		reader.onload = function (event) {
			// Update Image Preview
			$("#excursion-preview").attr("src", event.target.result);
			// Update Blur
			const img = document.querySelector("#excursion-preview");
			const blur = document.querySelector(".blur-preview");
			blur.src = event.target.result;
			img.parentNode.insertBefore(blur, img);
		};
		reader.readAsDataURL(file);
	}
});

// Set the default image background when the trash logo is pressed
$(document).on("click", "#modal-trash-icon", function () {
	$("#excursion-preview").attr("src", "./images/default-background.jpg");
	$(".blur-preview").attr("src", "./images/default-background.jpg");
});

// Make the stops dragable
$(document).ready(function () {
	waitForElm("#stops").then(() => {
		$("#stops").sortable({
			handle: ".drag-handle",
			cursor: "move",
			opacity: 0.8,
			axis: "y",
		});
	});
});

// Make the text areas auto resizing
$(document).on("input", ".autoresizing", function () {
	this.style.height = "auto";

	this.style.height = this.scrollHeight + "px";
});

// Show Lat and Long Fields when VR Enabled
$(document).on("click", "#showLatLong", function () {
	if (!viewMode) {
		var $stop = $(this).closest(".stop");
		if (this.checked) {
			$stop.find(".lat-long-container").css("display", "flex");
		} else {
			$stop.find(".lat-long-container").css("display", "none");
		}
	}
});

// Open create modal when user presses create button
$(document).on("click", "#create-modal-button", function () {
	resetInputFields();
	createExcursion();
});

// Switch to Edit Mode when user presses edit button
$(document).on("click", "#modal-icon-edit", function () {
	editExcursion();
});

// Switch to Edit Mode when user presses edit button
$(document).on("click", "#modal-icon-vr", function (event) {
	let excursionId = $(event.target)
		.closest(".modal")
		.find("#excursion-id")
		.val();
	window.location.href = `/xr.html?id=${excursionId}`;
});

// Delete Excursion
$(document).on("click", "#modal-icon-trash", function () {
	const confirmDelete = confirm(
		"Are you sure you want to delete this excursion?\nYour data will be lost forever!"
	);
	if (confirmDelete) {
		deleteExcursion($("#excursion-id").val());
	}
});

// Close the modal when they click off of it, click the x or click cancel, or esc
// Helper Functions
function fieldsFilledIn() {
	return (
		$("#modal-background input, #modal-background textarea").filter(
			function () {
				return this.value !== "";
			}
		).length !== 0
	);
}

function resetInputFields() {
	$("#excursion-id").val("");
	$("#excursion-preview").attr("src", "./images/default-background.jpg");
	$(".blur-preview").attr("src", "./images/default-background.jpg");
	$(".modal-background").find(":input").val("");
	$("#stops").children().slice(1).remove();
	$("#showLatLong").prop("checked", false);
	$(".lat-long-container").css("display", "none");
}

function confirmClose() {
	if (!viewMode && fieldsFilledIn()) {
		const confirmClose = confirm(
			"Are you sure you want to discard your changes?"
		);
		if (confirmClose) {
			resetInputFields();
			// close the modal
			$(".modal-background").toggle();
		}
	} else {
		resetInputFields();
		// close the modal
		$(".modal-background").toggle();
		createMode = false;
		editMode = false;
		viewMode = false;
	}
}

// Close off Modal if click on something
$(document).on("click", "#modal-background", function (e) {
	if (
		e.target !== $("#modal-background").get(0) &&
		!$(e.target).hasClass("modal-close")
	) {
		return;
	}

	confirmClose();
});

// Close off Modal if press "Esc" key
$(document).keydown(function (event) {
	if (event.keyCode == 27 && $("#modal-background").css("display") == "block") {
		confirmClose();
	}
});

// Handle Modal Submittion
$(document).on("click", "#submit-modal", async function () {
	if (modalSubmitValidation()) {
		// Create new Excursion
		let excursion = {
			title: $("#excursion-title").val(),
			description: $("#excursion-description").val(),
			creator: JSON.parse(localStorage.getItem("user")).username,
			coverPhoto: "./images/default-background.jpg",
			stops: [],
			vrReady: false,
		};

		// Add stops to excursion
		$(".stop").each(function () {
			if (
				$(this)
					.find("input")
					.filter(function () {
						return this.value !== "";
					}).length !== 0
			) {
				const stop = {
					name: $(this).find("#stopName").val(),
					description: $(this).find("#stopDescription").val(),
					address: $(this).find("#stopAddress").val(),
					vrReady: $(this).find("#showLatLong").is(":checked"),
					lat: $(this).find("#stopLat").val(),
					lng: $(this).find("#stopLng").val(),
				};
				if (stop.vrReady) {
					excursion.vrReady = true;
				}
				excursion.stops.push(stop);
			}
		});

		if (editMode) {
			excursion.id = $("#excursion-id").val();
			// API Request the Update Excursion
			await fetch(`/api/excursion`, {
				method: "put",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(excursion),
			});

			location.reload();
		} else {
			// API Request to Create Excursion
			await fetch(`/api/excursion`, {
				method: "post",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(excursion),
			});
			location.reload();
		}
	} else {
		alert("Please fill out the required information");
	}
});

// Enable and Disable Submit Button
$(document).on(
	"input",
	"#excursion-title, #excursion-description",
	function () {
		if (modalSubmitValidation()) {
			$("#submit-modal").removeClass("disabled-a");
		} else {
			$("#submit-modal").addClass("disabled-a");
		}
	}
);

function modalSubmitValidation() {
	return $("#excursion-title").val() && $("#excursion-description").val();
}

// Viewing Excursions
// When you click on an excursion card
$(document).on("click", ".excursions-card", function (event) {
	if (event.target.tagName !== "I") {
		let excursionId = $(event.target)
			.closest(".excursions-card")
			.find("#excursion-card-id")
			.val();
		// Reset Modal
		resetInputFields();
		viewExcursion(excursionId);
	}
});

function createExcursion() {
	createMode = true;
	editMode = false;
	viewMode = false;

	// Set fields equal to the excursion value
	var modal = $(".modal-background");
	// Hide header bar
	modal.find(".modal-header").toggle(true);
	// Change header Text
	modal.find(".modal-header h1").html("Create Excursion");
	// Hide Edit button
	modal.find("#modal-icon-edit").css("display", "none");
	// Hide Trash button
	modal.find("#modal-icon-trash").css("display", "none");
	// hide vr button
	modal.find("#modal-icon-vr").css("display", "none");

	// Hide image edit icons and update image preview
	modal.find(".icon-container-gradient").toggle(true);

	// For the following text: 1. Remove view-only class to add border, 2. remove readonly properly to enable input
	// Excursion Title
	modal.find("#excursion-title").removeClass("view-only-input");
	modal.find("#excursion-title").prop("readonly", false);

	// Excursion Description
	modal.find("#excursion-description").removeClass("view-only-input");
	modal.find("#excursion-description").prop("readonly", false);

	// Stops
	modal.find("#stopName").removeClass("view-only-input");
	modal.find("#stopName").prop("readonly", false);
	modal.find("#stopAddress").removeClass("view-only-input");
	modal.find("#stopAddress").prop("readonly", false);
	modal.find("#stopDescription").removeClass("view-only-input");
	modal.find("#stopDescription").prop("readonly", false);
	modal.find("#showLatLong").prop("disabled", false);
	modal.find(".delete-stop-btn").toggle(true);
	modal.find(".drag-handle").toggle(true);

	// reset stops
	modal.find("#no-stops-label").css("display", "none");
	modal.find("#stops").toggle(true);

	// Hide "Add Stop" Button
	modal.find(".add-stop-container").toggle(true);

	// Hide Footer
	modal.find(".modal-footer").toggle(true);

	// Toggle modal
	modal.toggle();
}

function editExcursion() {
	viewMode = false;
	editMode = true;

	// Set fields equal to the excursion value
	var modal = $(".modal-background");
	// Hide header bar
	modal.find(".modal-header").toggle(true);
	// Change header Text
	modal.find(".modal-header h1").html("Edit Excursion");
	// Hide Edit button
	modal.find("#modal-icon-edit").css("display", "none");
	// Show Trash button
	modal.find("#modal-icon-trash").css("display", "block");
	// hide vr button
	modal.find("#modal-icon-vr").css("display", "none");

	// Show image edit icons and update image preview
	modal.find(".icon-container-gradient").toggle(true);

	// For the following text: 1. Change the value, 2. Add view-only class to remove border, 3. add readonly properly to diable input
	// Excursion Title
	modal.find("#excursion-title").removeClass("view-only-input");
	modal.find("#excursion-title").prop("readonly", false);
	// REMOVE WHEN IN PROD
	prevExcursion = modal.find("#excursion-title").val();

	// Excursion Description
	modal.find("#excursion-description").removeClass("view-only-input");
	modal.find("#excursion-description").prop("readonly", false);

	// Stops
	modal.find(".stopName").removeClass("view-only-input");
	modal.find(".stopName").prop("readonly", false);
	modal.find(".stopAddress").removeClass("view-only-input");
	modal.find(".stopAddress").prop("readonly", false);
	modal.find(".stopDescription").removeClass("view-only-input");
	modal.find(".stopDescription").prop("readonly", false);
	modal.find(".showLatLong").prop("disabled", false);
	modal.find(".delete-stop-btn").toggle(true);
	modal.find(".drag-handle").toggle(true);

	// Show Stops
	modal.find("#no-stops-label").css("display", "none");
	modal.find("#stops").toggle(true);

	// Show "Add Stop" Button
	modal.find(".add-stop-container").toggle(true);

	// Show Footer
	modal.find(".modal-footer").toggle(true);
	// Enable Submit Button
	$("#submit-modal").removeClass("disabled-a");
}

async function viewExcursion(excursionID) {
	viewMode = true;
	editMode = false;

	fetch(`/api/excursion/${excursionID}`)
		.then((response) => response.json())
		.then((excursion) => {
			// Set fields equal to the excursion value
			var modal = $(".modal-background");
			// Set Excursion ID
			modal.find("#excursion-id").val(excursion._id);
			// Hide header bar
			modal.find(".modal-header").toggle(false);
			// Show Edit button IF IT IS YOURS
			if (
				JSON.parse(localStorage.getItem("user")).username === excursion.creator
			) {
				modal.find("#modal-icon-edit").css("display", "block");
			} else {
				modal.find("#modal-icon-edit").css("display", "none");
			}
			// Hide Trash button
			modal.find("#modal-icon-trash").css("display", "none");

			// show vr icon if vr ready
			console.log("HERE I AM" + excursion.vrReady);
			if (excursion.vrReady) {
				modal.find("#modal-icon-vr").css("display", "block");
			} else {
				modal.find("#modal-icon-vr").css("display", "none");
			}

			// Hide image edit icons and update image preview
			modal.find(".icon-container-gradient").toggle(false);
			modal.find("#excursion-preview").attr("src", excursion.coverPhoto);
			modal.find(".blur-preview").attr("src", excursion.coverPhoto);

			// For the following text: 1. Change the value, 2. Add view-only class to remove border, 3. add readonly properly to diable input
			// Excursion Title
			modal.find("#excursion-title").val(excursion.title);
			modal.find("#excursion-title").addClass("view-only-input");
			modal.find("#excursion-title").prop("readonly", true);

			// Excursion Description
			modal.find("#excursion-description").val(excursion.description);
			modal.find("#excursion-description").addClass("view-only-input");
			modal.find("#excursion-description").prop("readonly", true);

			// Stops
			modal.find("#stopName").addClass("view-only-input");
			modal.find("#stopName").prop("readonly", true);
			modal.find("#stopAddress").addClass("view-only-input");
			modal.find("#stopAddress").prop("readonly", true);
			modal.find("#stopDescription").addClass("view-only-input");
			modal.find("#stopDescription").prop("readonly", true);
			modal.find("#showLatLong").prop("disabled", true);
			modal.find(".delete-stop-btn").toggle(false);
			modal.find(".drag-handle").toggle(false);

			// Check to see if this excursion has any stops
			if (excursion.stops.length > 0) {
				modal.find("#no-stops-label").css("display", "none");
				modal.find("#stops").toggle(true);

				excursion.stops.forEach(function (stop) {
					modal.find("#stops").children().first().clone().appendTo("#stops");
					modal.find(".stop-li").last().find("#stopName").val(stop.name);
					modal.find(".stop-li").last().find("#stopAddress").val(stop.address);
					modal
						.find(".stop-li")
						.last()
						.find("#stopDescription")
						.val(stop.description);
					modal.find(".stop-li").last().find("#showLatLong").val(stop.vrReady);
					modal.find(".stop-li").last().find("#stopLat").val(stop.lat);
					modal.find(".stop-li").last().find("#stopLong").val(stop.long);
				});
				modal.find("#stops").children().first().remove();
			} else {
				modal.find("#no-stops-label").css("display", "block");
				modal.find("#stops").toggle(false);
			}

			// Hide "Add Stop" Button
			modal.find(".add-stop-container").toggle(false);

			// Hide Footer
			modal.find(".modal-footer").toggle(false);

			// Toggle modal
			modal.toggle();
		});
}

async function deleteExcursion(excursionID) {
	await fetch(`/api/excursion`, {
		method: "delete",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ id: excursionID }),
	});
	location.reload();
}

// Liking/unliking Excursions
// When you click on an excursion card's Heart
$(document).on("click", ".heart-icon", async function (event) {
	// If the excursion is already liked
	if ($(event.target.parentNode).hasClass("heart-liked")) {
		// Unlike clicked excursion
		let id = $(event.target)
			.closest(".excursions-card")
			.find("#excursion-card-id")
			.val();
		const response = await fetch(`/api/excursions/likes/`, {
			method: "delete",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ id: id }),
		});

		// Change Heart class to unliked
		$(event.target.parentNode).removeClass("heart-liked");
		$(event.target.parentNode).addClass("heart-unliked");
	}
	// If the excursion is not already liked
	else {
		// Like clicked excursion
		let id = $(event.target)
			.closest(".excursions-card")
			.find("#excursion-card-id")
			.val();
		const response = await fetch(`/api/excursions/likes/`, {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ id: id }),
		});

		// Change Heart class to liked
		$(event.target.parentNode).removeClass("heart-unliked");
		$(event.target.parentNode).addClass("heart-liked");
	}
});
