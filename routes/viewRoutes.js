const express = require("express");
const viewsController = require("../controllers/viewsController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewsController.home);

router.get("/products", viewsController.products.index);

router.get("/products/:id", viewsController.products.single);

router.get("/local-shops", viewsController.localShops);

router.get("/gallery", viewsController.gallery);

router.get("/contacts", viewsController.contacts);

router.get("/news", viewsController.news.index);

router.get("/news/:id", viewsController.news.single);

router.get("/laws/:id", viewsController.laws);

router.get("/login", authController.isLoggedIn, viewsController.login);

module.exports = router;
