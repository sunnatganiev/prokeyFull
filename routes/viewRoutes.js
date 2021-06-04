const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const app = express();
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.post(
  "/dashboard/customers/add",
  authController.isLoggedIn,
  viewsController.dashboard.customers.add
);

module.exports = router;
