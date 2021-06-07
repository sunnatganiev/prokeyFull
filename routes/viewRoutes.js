const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", viewsController.home);

router.get("/index.html", viewsController.home);

router.get("/mahsulotlar.html", viewsController.getProducts);

router.get("/mahsulotichi.html", viewsController.proIn);

router.get("/hududiydokonlar.html", viewsController.dokonlar);

router.get("/galereya.html", viewsController.galereya);

router.get("/kontaktlar.html", viewsController.kontakt);

router.get("/yangiliklar.html", viewsController.yangiliklar);

router.get("/yangiliklarichi.html", viewsController.yangilikIchi);

router.get(
  "/login.html",
  authController.isLoggedIn,
  viewsController.getLoginForm
);

//DASHBOARD

router.get(
  "/dashboard",
  authController.isLoggedIn,
  viewsController.dashboard.index
);

//customers
router.get(
  "/dashboard/customers",
  authController.isLoggedIn,
  viewsController.dashboard.customers.index
);

router.get(
  "/dashboard/customers/add",
  authController.isLoggedIn,
  viewsController.dashboard.customers.add
);

//registrators
router.get(
  "/dashboard/registrators",
  authController.isLoggedIn,
  viewsController.dashboard.registrators.index
);

router.get(
  "/dashboard/registrators/add",
  authController.isLoggedIn,
  viewsController.dashboard.registrators.add
);

//team
router.get(
  "/dashboard/team",
  authController.isLoggedIn,
  viewsController.dashboard.team.index
);

router.get(
  "/dashboard/team/add",
  authController.isLoggedIn,
  viewsController.dashboard.team.add
);

//transfers
router.get(
  "/dashboard/transfers",
  authController.isLoggedIn,
  viewsController.dashboard.transfers.index
);

//warehouses
router.get(
  "/dashboard/warehouses",
  authController.isLoggedIn,
  viewsController.dashboard.warehouses.index
);

router.get(
  "/dashboard/warehouses/:id",
  authController.isLoggedIn,
  viewsController.dashboard.warehouses.single
);

//products
router.get(
  "/dashboard/products",
  authController.isLoggedIn,
  viewsController.dashboard.products.index
);

router.get(
  "/dashboard/product/:id",
  authController.isLoggedIn,
  viewsController.dashboard.products.single
);

router.get(
  "/dashboard/product/delete/:id",
  authController.isLoggedIn,
  viewsController.dashboard.products.delete
);

// handle logic
// router.put(
//   "/dashboard/product/edit/:id",
//   authController.isLoggedIn,
//   viewsController.dashboard.products.edit
// );

router.get(
  "/dashboard/products/add",
  authController.isLoggedIn,
  viewsController.dashboard.products.add
);

//news
router.get(
  "/dashboard/news",
  authController.isLoggedIn,
  viewsController.dashboard.news.index
);

router.get(
  "/dashboard/news/id/:id",
  authController.isLoggedIn,
  viewsController.dashboard.news.single
);

router.get(
  "/dashboard/news/delete/:id",
  authController.isLoggedIn,
  viewsController.dashboard.news.delete
);
// handle logic
// router.put(
//   "/dashboard/product/edit/:id",
//   authController.isLoggedIn,
//   viewsController.dashboard.news.edit
// );

router.get(
  "/dashboard/news/add",
  authController.isLoggedIn,
  viewsController.dashboard.news.add
);

//gallery
router.get(
  "/dashboard/gallery",
  authController.isLoggedIn,
  viewsController.dashboard.gallery.index
);

//banners
router.get(
  "/dashboard/banners",
  authController.isLoggedIn,
  viewsController.dashboard.banners.index
);
router.get(
  "/dashboard/banners/id/:id",
  authController.isLoggedIn,
  viewsController.dashboard.banners.single
);

//workers
router.get(
  "/dashboard/workers",
  authController.isLoggedIn,
  viewsController.dashboard.workers.index
);
router.get(
  "/dashboard/workers/id/:id",
  authController.isLoggedIn,
  viewsController.dashboard.workers.single
);

//workers
router.get(
  "/dashboard/settings",
  authController.isLoggedIn,
  viewsController.dashboard.settings.index
);

module.exports = router;
