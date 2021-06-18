const express = require("express");
const authController = require("../controllers/authController");
const apiController = require("../controllers/dashboard/apiController");
const { upload } = require("../utils/uploadMiddleware");

const router = express.Router();

router.post(
  "/gallery/add",
  upload("gallery").single("image"),
  authController.isLoggedIn,
  authController.protect,
  authController.restirctTo("admin"),
  apiController.galleryAdd
);

router.post(
  "/gallery/delete",
  authController.isLoggedIn,
  authController.protect,
  authController.restirctTo("admin"),
  apiController.galleryDelete
);

module.exports = router;
