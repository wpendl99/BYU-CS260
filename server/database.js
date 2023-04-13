const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
	throw Error("Database not configured. Set environment variables");
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db("excursions").collection("user");
const excursionCollection = client.db("excursions").collection("excursions");

function getUser(email) {
	return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
	return userCollection.findOne({ token: token });
}

async function createUser(name, email, password) {
	// Hash the password before we insert it into the database
	const passwordHash = await bcrypt.hash(password, 10);

	const user = {
		name: name,
		email: email,
		password: passwordHash,
		token: uuid.v4(),
	};
	await userCollection.insertOne(user);

	return user;
}

function getExcursionByID(id) {
	return excursionCollection.findOne({ _id: id });
}

function getExcursions() {
	return excursionCollection.find({});
}

async function createExcursion(excursion) {
	await excursionCollection.insertOne(excursion);

	return excursion;
}

async function updateExcursion(excursion) {
	await excursionCollection.replaceOne({ _id: excursion.id }, excursion);

	return excursion;
}

async function deleteExcursion(excursion) {
	await excursionCollection.deleteOne({ _id: excursion.id });
}

function getExcursionLikesByEmail(email) {
	return excursionCollection.find({ likes: email });
}

function addExcursionLikeByEmail(id, email) {
	return excursionCollection.updateOne(
		{ _id: id },
		{ $push: { likes: email } }
	);
}

function removeExcursionLikeByEmail(id, email) {
	return excursionCollection.updateOne(
		{ _id: id },
		{ $pull: { likes: email } }
	);
}

// function addScore(score) {
// 	scoreCollection.insertOne(score);
// }

// function getHighScores() {
// 	const query = {};
// 	const options = {
// 		sort: { score: -1 },
// 		limit: 10,
// 	};
// 	const cursor = scoreCollection.find(query, options);
// 	return cursor.toArray();
// }

module.exports = {
	getUser,
	getUserByToken,
	createUser,
	getExcursionByID,
	getExcursions,
	createExcursion,
	updateExcursion,
	deleteExcursion,
	getExcursionLikesByEmail,
	addExcursionLikeByEmail,
	removeExcursionLikeByEmail,
};
