const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/index.html', viewsController.home);

router.get('/mahsulotlar.html', viewsController.getProducts);

router.get('/yangiliklar.html', viewsController.yangiliklar);

router.get('/login.html', authController.isLoggedIn, viewsController.getLoginForm);

router.get('/adasosiy.html', authController.isLoggedIn, viewsController.asosiy);

module.exports = router;
