const express = require("express");
const authController = require("../controllers/authController");
const apiController = require("../controllers/dashboard/apiController");
const bannerController = require("../controllers/dashboard/bannerController");
const feedbackController = require("../controllers/dashboard/feedbackController");
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

//FEEDBACKS
router.post(
  "/feedbacks/add",
  upload().single("photo"),
  authController.isLoggedIn,
  authController.protect,
  authController.restirctTo("admin"),
  feedbackController.createFeedback
);

router.post(
  "/feedbacks/edit",
  upload().single("photo"),
  authController.isLoggedIn,
  authController.protect,
  authController.restirctTo("admin"),
  feedbackController.updateFeedback
);

router.post(
  "/feedbacks/delete",
  authController.isLoggedIn,
  authController.protect,
  authController.restirctTo("admin"),
  feedbackController.deleteFeedback
);
////////

//BANNERS
router.post(
  "/banners/add",
  upload().single("photo"),
  authController.isLoggedIn,
  authController.protect,
  authController.restirctTo("admin"),
  bannerController.createBanner
);

router.post(
  "/banners/edit",
  upload().single("photo"),
  authController.isLoggedIn,
  authController.protect,
  authController.restirctTo("admin"),
  bannerController.updateBanner
);

router.post(
  "/banners/delete",
  authController.isLoggedIn,
  authController.protect,
  authController.restirctTo("admin"),
  bannerController.deleteBanner
);
////////

module.exports = router;
