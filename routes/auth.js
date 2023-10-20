const router = require("express").Router();

const {
	register,
	login,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
} = require("../controllers/auth");
const upload = require("../multerConfig/multer");
const { verifyToken } = require("../middleware/verify");

router.route("/registration").post(upload.single("image"), register);

router.route("/login").post(login);

router.route("/").get(getUsers);

router.route("/:userId").get(verifyToken, getUserById);

router
	.route("/update/:userId")
	.patch(verifyToken, upload.single("image"), updateUser);

router.route("/delete/:userId").delete(verifyToken, deleteUser);

module.exports = router;
