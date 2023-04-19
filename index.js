const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const DB = require("./database.js");

const authCookieName = "token";

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
// CHANGE THIS AND LINE 177 on PROD load
app.use(express.static("./public/"));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post("/auth/create", async (req, res) => {
	console.log("Post /auth/create Request");
	if (await DB.getUser(req.body.email)) {
		res.status(409).send({ msg: "Existing user" });
	} else {
		const user = await DB.createUser(
			req.body.name,
			req.body.email,
			req.body.password
		);

		// Set the cookie
		setAuthCookie(res, user.token);

		res.send({
			id: user._id,
		});
	}
});

// GetAuth token for the provided credentials
apiRouter.post("/auth/login", async (req, res) => {
	console.log("Post /auth/login Request");
	const user = await DB.getUser(req.body.email);
	if (user) {
		if (await bcrypt.compare(req.body.password, user.password)) {
			setAuthCookie(res, user.token);
			res.send({ id: user._id });
			return;
		}
	}
	res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth token if stored in cookie
apiRouter.delete("/auth/logout", (_req, res) => {
	console.log("Delete /auth/logout Request");
	res.clearCookie(authCookieName);
	res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get("/user/:email", async (req, res) => {
	console.log("Get /user/:email Request");
	const user = await DB.getUser(req.params.email);
	if (user) {
		const token = req?.cookies.token;
		res.send({
			name: user.name,
			email: user.email,
			authenticated: token === user.token,
		});
		return;
	}
	res.status(404).send({ msg: "Unknown" });
});

// Get Excursion By Id
apiRouter.get("/excursion/:id", async (req, res) => {
	console.log("Get /excursion/:id Request");
	const excursion = await DB.getExcursionByID(req.params.id);
	if (excursion) {
		res.send(excursion);
		return;
	}
	res.status(404).send({ msg: "Unknown" });
});

// Get Excursions
apiRouter.get("/excursions", async (req, res) => {
	console.log("Get /excursions Request");
	res.send(await DB.getExcursions());
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
	authToken = req.cookies[authCookieName];
	const user = await DB.getUserByToken(authToken);
	if (user) {
		next();
	} else {
		res.status(401).send({ msg: "Unauthorized" });
	}
});

// Get Liked Excursions
secureApiRouter.get("/excursions/likes", async (req, res) => {
	console.log("Get /excursions/likes Request");
	authToken = req.cookies[authCookieName];
	const user = await DB.getUserByToken(authToken);
	res.send(await DB.getExcursionLikesByEmail(user.email));
});

// Add Liked Excursions
secureApiRouter.post("/excursions/likes/", async (req, res) => {
	console.log("Post /excursions/likes Request");
	authToken = req.cookies[authCookieName];
	const user = await DB.getUserByToken(authToken);
	const id = req.body.id;
	res.send(await DB.addExcursionLikeByEmail(id, user.email));
});

// Remove Liked Excursions
secureApiRouter.delete("/excursions/likes/", async (req, res) => {
	console.log("Delete /excursions/likes Request");
	authToken = req.cookies[authCookieName];
	const user = await DB.getUserByToken(authToken);
	const id = req.body.id;
	res.send(await DB.removeExcursionLikeByEmail(id, user.email));
});

// Create Excursion
secureApiRouter.post("/excursion", async (req, res) => {
	console.log("Post /excursion Request");
	console.log("Hey all scott here: " + JSON.stringify(req.body));
	let resultExcursion = await DB.createExcursion(req.body);

	res.send({
		id: resultExcursion._id,
	});
});

// Update Excursion
secureApiRouter.put("/excursion", async (req, res) => {
	console.log("put /excursion Request");
	authToken = req.cookies[authCookieName];
	const user = await DB.getUserByToken(authToken);
	console.log(req.body);
	const excursion = await DB.getExcursionByID(req.body.id);
	if (user.email == excursion.creator) {
		let result = await DB.updateExcursion(req.body);

		res.send({
			id: result._id,
		});
	} else {
		res.status(401).send({ msg: "Unauthorized" });
	}
});

// Delete Excursion
secureApiRouter.delete("/excursion", async (req, res) => {
	console.log("Delete /excursions Request");
	authToken = req.cookies[authCookieName];
	const user = await DB.getUserByToken(authToken);
	const excursion = await DB.getExcursionByID(req.body.id);
	if (user.email == excursion.creator) {
		await DB.deleteExcursion(excursion);

		res.status(204).end();
	} else {
		res.status(401).send({ msg: "Unauthorized" });
	}
});

// Default error handler
app.use(function (err, req, res, next) {
	res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
	res.sendFile("../index.html", { root: "public" });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
	res.cookie(authCookieName, authToken, {
		secure: true,
		httpOnly: true,
		sameSite: "strict",
	});
}

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
