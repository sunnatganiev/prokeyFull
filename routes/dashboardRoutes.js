const express = require("express");
const dashboard = require("../controllers/dashboard");
const authController = require("../controllers/authController");

const router = express.Router();
//DASHBOARD

router.get("/", authController.isLoggedIn, dashboard.index);

//clients
router.get("/clients", authController.isLoggedIn, dashboard.clients.index);

//registrators
// router.get(
//   "/registrators",
//   authController.isLoggedIn,
//   dashboard.registrators.index
// );

//team
router.get("/team", authController.isLoggedIn, dashboard.team.index);

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
router.get("/settings", authController.isLoggedIn, dashboard.users.single);

router.get(
  "/users",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  dashboard.users.index
);
router.get(
  "/users/id/:id",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin", "registrator"),
  dashboard.users.single
);
router.get(
  "/users/add",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin", "registrator"),
  dashboard.users.add
);

//territories
router.get(
  "/territories",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  dashboard.territories.index
);
router.get(
  "/territories/add",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  dashboard.territories.add
);
router.get(
  "/territories/id/:id",
  authController.isLoggedIn,
  authController.protect,
  authController.allowTo("admin"),
  dashboard.territories.single
);

module.exports = router;
