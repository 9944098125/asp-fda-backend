const express = require("express");

const {
  postItem,
  getItems,
  updateItem,
  deleteItem,
} = require("../controllers/cart");

const router = express.Router();

router.route("/addItem").post(postItem);

router.route("/").get(getItems);

router.route("/update/:cartItemId").patch(updateItem);

router.route("/delete/:cartItemId").delete(deleteItem);

module.exports = router;
