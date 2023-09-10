const router = require("express").Router();

const { register, login } = require("../controllers/auth");
const upload = require("../multerConfig/multer");

router.route("/register").post(upload.single("image"), register);

router.route("/login").post(login);

module.exports = router;
