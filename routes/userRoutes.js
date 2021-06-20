const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const { upload } = require("../utils/uploadMiddleware");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

// =========USER==========
//CREATE USER
router.post(
  "/user",
  upload().single("photo"),
  authController.protect,
  authController.allowTo("admin", "registrator"),
  userController.createUser
);
//UPDATE USER
router.post("/user/edit", upload().single("photo"), userController.updateUser);
// ==========================

// router.patch('/updateMyPassword', authController.updatePassword);

// router.get('/me', userController.getMe, userController.getUser);

// router.patch('/updateMe', userController.updateMe);
// router.delete('/deleteMe', userController.deleteMe);

// router.use(authController.allowTo('admin'));

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
