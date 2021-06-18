const express = require("express");
const authController = require("../controllers/authController");
const apiController = require("../controllers/dashboard/apiController");
const newsController = require("../controllers/dashboard/newsController");
const { upload } = require("../utils/uploadMiddleware");

const router = express.Router();

//GALLERY
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
///////

//NEWS
router.post(
  "/news/add",
  upload().single("photo"),
  authController.isLoggedIn,
  authController.protect,
  authController.restirctTo("admin"),
  newsController.createNews
);

router.post(
  "/news/edit",
  upload().single("photo"),
  authController.isLoggedIn,
  authController.protect,
  authController.restirctTo("admin"),
  newsController.updateNews
);

router.post(
  "/news/delete",
  authController.isLoggedIn,
  authController.protect,
  authController.restirctTo("admin"),
  newsController.deleteNews
);
////////

module.exports = router;
