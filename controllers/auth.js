const Users = require("../models/Users");
const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendRegistrationEmail } = require("../helpers/nodemailer");
const Restaurants = require("../models/Restaurants");
const FoodItems = require("../models/FoodItems");

const register = async (req, res, next) => {
	const { userName, email, password, location, isRestaurantOwner } = req.body;
	// console.log(req.body, req.file);
	try {
		if (!req.file) {
			return res.status(403).json({ message: "Please, Upload an Image !" });
		}
		const existingUser = await Users.findOne({ email });
		if (existingUser) {
			return res
				.status(403)
				.json({ message: "User already exists with this email" });
		}
		const saltRounds = bcryptJs.genSaltSync(12);
		const hashedPassword = bcryptJs.hashSync(password, saltRounds);
		const newUser = new Users({
			userName,
			email,
			password: hashedPassword,
			location,
			image: req.file?.path,
			isRestaurantOwner,
		});
		await newUser.save();
		sendRegistrationEmail(newUser.email);
		res.status(201).json({
			message: `Congratulations ${userName}, you have registered successfully`,
		});
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		// console.log(email, password);
		const existingUser = await Users.findOne({ email });
		if (!existingUser) {
			return res.status(400).json({ message: "No User with this email..." });
		}
		const passwordMatches = bcryptJs.compare(password, existingUser.password);
		if (!passwordMatches) {
			return res.status(504).json({ message: "Wrong Password !" });
		}
		const userWithoutPassword = await Users.findOne({ email }).select(
			"-password",
		);
		const token = jwt.sign(
			{
				userId: existingUser._id,
				isRestaurantOwner: existingUser.isRestaurantOwner,
			},
			process.env.SECRET_TOKEN,
		);
		res.status(200).json({
			message: "Login Success",
			token: token,
			user: userWithoutPassword,
		});
	} catch (err) {
		next(err);
	}
};

const getUsers = async (req, res, next) => {
	try {
		const users = await Users.find();
		res.status(200).json({ message: "Found Users", users: users });
	} catch (err) {
		next(err);
	}
};

const getUserById = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const user = await Users.findOne({ _id: userId });
		res.status(200).json({ message: "User Found !", user: user });
	} catch (err) {
		next(err);
	}
};

const updateUser = async (req, res, next) => {
	const { userId } = req.params;
	try {
		console.log(req.body.email);
		const updatedUser = await Users.findByIdAndUpdate(
			userId,
			{
				$set: {
					userName: req.body.userName,
					email: req.body.email,
					location: req.body.location,
					image: req.file?.path,
				},
			},
			{ new: true },
		);
		await updatedUser.save();
		res
			.status(200)
			.json({ message: "Updated the user successfully...", user: updatedUser });
	} catch (err) {
		next(err);
	}
};

const deleteUser = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const user = await Users.find({ _id: userId });
		const restaurantId = user[0].restaurantId;
		await FoodItems.deleteMany({ restaurantId });
		await Restaurants.deleteOne({ owner: userId });
		await Users.findByIdAndDelete(userId);
		res.status(200).json({
			message: "Your Account Got Deleted..., Hope you create a new account.!",
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	register,
	login,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
};
