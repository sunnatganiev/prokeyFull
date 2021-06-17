const express = require("express");
const dashboard = require("../controllers/dashboard");
const authController = require("../controllers/authController");

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

router.get(
  "/news/delete/:id",
  authController.isLoggedIn,
  dashboard.news.delete
);
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
router.get("/workers", authController.isLoggedIn, dashboard.workers.index);
router.get(
  "/workers/id/:id",
  authController.isLoggedIn,
  dashboard.workers.single
);

//user
router.get("/user/id/:id", authController.isLoggedIn, dashboard.user.index);
router.get("/user/add", authController.isLoggedIn, dashboard.user.add);

module.exports = router;
