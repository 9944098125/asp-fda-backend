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

router.route("/registration").post(upload.single("image"), register);

router.route("/login").post(login);

router.route("/").get(getUsers);

router.route("/:userId").get(getUserById);

router.route("/update/:userId").patch(updateUser);

router.route("/delete/:userId").delete(deleteUser);

module.exports = router;
