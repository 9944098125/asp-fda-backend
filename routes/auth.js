const router = require("express").Router();

const { register, login, getUsers } = require("../controllers/auth");
const upload = require("../multerConfig/multer");

router.route("/registration").post(upload.single("image"), register);

router.route("/login").post(login);

router.route("/").get(getUsers);

module.exports = router;
