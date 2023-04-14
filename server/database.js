const { MongoClient } = require("mongodb");
const mongodb = require("mongodb");
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
const userCollection = client.db("excursions").collection("users");
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

async function getExcursionByID(id) {
	return await excursionCollection.findOne({
		_id: new mongodb.ObjectId(id),
	});
}

async function getExcursions() {
	return await excursionCollection.find({}).toArray();
}

async function createExcursion(excursion) {
	await excursionCollection.insertOne(excursion);

	return excursion;
}

async function updateExcursion(excursion) {
	await excursionCollection.replaceOne(
		{ _id: new mongodb.ObjectId(id) },
		excursion
	);

	return excursion;
}

async function deleteExcursion(excursion) {
	await excursionCollection.deleteOne({ _id: new mongodb.ObjectId(id) });
}

function getExcursionLikesByEmail(email) {
	return excursionCollection.find({ likes: email }).toArray();
}

function addExcursionLikeByEmail(id, email) {
	return excursionCollection.updateOne(
		{ _id: new mongodb.ObjectId(id) },
		{ $push: { likes: email } }
	);
}

function removeExcursionLikeByEmail(id, email) {
	return excursionCollection.updateOne(
		{ _id: new mongodb.ObjectId(id) },
		{ $pull: { likes: email } }
	);
}

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
