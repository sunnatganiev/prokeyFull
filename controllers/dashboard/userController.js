const User = require("../../models/userModel");
const { getCurrentUser } = require("../authController");
const mongoose = require("mongoose");

module.exports = {
  customers: {
    index(req, res) {
      res.status(200).render("admin/pages/customers/index");
    },
  },
  registrators: {
    index(req, res) {
      res.status(200).render("admin/pages/registrators/index");
    },
  },
  user: {
    async index(req, res) {
      const currentUser = await getCurrentUser(req, res);
      let id = req.params.id ? req.params.id : await currentUser._id;
      if (mongoose.Types.ObjectId.isValid(id)) {
        const viewUser = await User.findById(id);
        res.status(200).render("admin/pages/user/index", {
          user: currentUser,
          error: res.locals.error,
          viewUser,
        });
      } else {
        res.send("");
      }
    },
    async add(req, res, next) {
      const currentUser = await getCurrentUser(req, res);
      res.status(200).render("admin/pages/user/add", {
        error: res.locals.error,
        user: currentUser,
      });
    },
  },
};
