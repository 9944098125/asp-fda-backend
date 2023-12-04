const router = require("express").Router();

const {
	register,
	login,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
} = require("../controllers/auth");
const { verifyToken } = require("../middleware/verify");

router.route("/registration").post(register);

router.route("/login").post(login);

router.route("/").get(getUsers);

router.route("/:userId").get(verifyToken, getUserById);

router.route("/update/:userId").patch(verifyToken, updateUser);

router.route("/delete/:userId").delete(verifyToken, deleteUser);

module.exports = router;
