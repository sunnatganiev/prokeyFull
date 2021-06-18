const express = require("express");
const dashboard = require("../controllers/dashboard");
const authController = require("../controllers/authController");
const { api } = require("../utils/constants");
const apiController = require("../controllers/dashboard/apiController");
const { upload } = require("../utils/uploadMiddleware");

const router = express.Router();
//DASHBOARD

router.get("/", authController.isLoggedIn, dashboard.index);

//customers
router.get("/customers", authController.isLoggedIn, dashboard.customers.index);

//registrators
router.get(
  "/registrators",
  authController.isLoggedIn,
  dashboard.registrators.index
);

//team
router.get("/team", authController.isLoggedIn, dashboard.team.index);

router.get("/team/add", authController.isLoggedIn, dashboard.team.add);

//transfers
router.get("/transfers", authController.isLoggedIn, dashboard.transfers.index);

//warehouses
router.get(
  "/warehouses",
  authController.isLoggedIn,
  dashboard.warehouses.index
);

router.get(
  "/warehouses/:id",
  authController.isLoggedIn,
  dashboard.warehouses.single
);

//products
router.get("/products", authController.isLoggedIn, dashboard.products.index);

router.get(
  "/product/:id",
  authController.isLoggedIn,
  dashboard.products.single
);

router.get(
  "/product/delete/:id",
  authController.isLoggedIn,
  dashboard.products.delete
);

// handle logic
// router.put(
//   "/product/edit/:id",
//   authController.isLoggedIn,
//   dashboard.products.edit
// );

router.get("/products/add", authController.isLoggedIn, dashboard.products.add);

//news
router.get("/news", authController.isLoggedIn, dashboard.news.index);

router.get("/news/id/:id", authController.isLoggedIn, dashboard.news.single);

// handle logic
// router.put(
//   "/product/edit/:id",
//   authController.isLoggedIn,
//   dashboard.news.edit
// );

router.get("/news/add", authController.isLoggedIn, dashboard.news.add);

//gallery
router.get("/gallery", authController.isLoggedIn, dashboard.gallery.index);

//banners
router.get("/banners", authController.isLoggedIn, dashboard.banners.index);
router.get(
  "/banners/id/:id",
  authController.isLoggedIn,
  dashboard.banners.single
);

//workers
router.get("/feedbacks", authController.isLoggedIn, dashboard.feedbacks.index);
router.get(
  "/feedbacks/id/:id",
  authController.isLoggedIn,
  dashboard.feedbacks.single
);

//user
router.get("/settings", authController.isLoggedIn, dashboard.user.index);

router.get(
  "/user/id/:id",
  authController.isLoggedIn,
  authController.protect,
  authController.restirctTo("admin", "registrator"),
  dashboard.user.index
);
router.get(
  "/user/add",
  authController.isLoggedIn,
  authController.protect,
  authController.restirctTo("admin", "registrator"),
  dashboard.user.add
);

module.exports = router;
