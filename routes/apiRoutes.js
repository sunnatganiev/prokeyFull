const express = require("express");
const authController = require("../controllers/authController");
const { transfersAdd } = require("../controllers/dashboard/apiController");
const apiController = require("../controllers/dashboard/apiController");
const bannerController = require("../controllers/dashboard/bannerController");
const feedbackController = require("../controllers/dashboard/feedbackController");
const newsController = require("../controllers/dashboard/newsController");
const { addProduct } = require("../controllers/dashboard/productController");
const territoryController = require("../controllers/dashboard/territoryController");
const { upload } = require("../utils/uploadMiddleware");

const router = express.Router();

//GALLERY
router.post(
  "/gallery/add",
  upload("gallery").single("image"),
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  apiController.galleryAdd
);

router.post(
  "/gallery/delete",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  apiController.galleryDelete
);
///////

//NEWS
router.post(
  "/news/add",
  upload().single("photo"),
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  newsController.createNews
);

router.post(
  "/news/edit",
  upload().single("photo"),
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  newsController.updateNews
);

router.post(
  "/news/delete",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  newsController.deleteNews
);
////////

//FEEDBACKS
router.post(
  "/feedbacks/add",
  upload().single("photo"),
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  feedbackController.createFeedback
);

router.post(
  "/feedbacks/edit",
  upload().single("photo"),
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  feedbackController.updateFeedback
);

router.post(
  "/feedbacks/delete",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  feedbackController.deleteFeedback
);
////////

//BANNERS
router.post(
  "/banners/add",
  upload().single("photo"),
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  bannerController.createBanner
);

router.post(
  "/banners/edit",
  upload().single("photo"),
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  bannerController.updateBanner
);

router.post(
  "/banners/delete",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  bannerController.deleteBanner
);
////////

//TERRITORIES
router.post(
  "/territories/add",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  territoryController.createTerritory
);

router.post(
  "/territories/edit",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  territoryController.updateTerritory
);

router.post(
  "/territories/delete",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  territoryController.deleteTerritory
);
////////

//TRANSFERS
router.post("/transfers/add", authController.isLoggedIn, transfersAdd);

//PRODUCTS
router.post(
  "/products/add",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  upload().array("images"),
  addProduct
);

module.exports = router;
