const mongoose = require("mongoose");
const User = require("../../models/userModel");
const { getCurrentUser } = require("../authController");
const { getCompactObj } = require("../utilities");

module.exports = {
  clients: {
    index(req, res) {
      res.status(200).render("admin/pages/clients/index");
    },
  },
  registrators: {
    index(req, res) {
      res.status(200).render("admin/pages/registrators/index");
    },
  },
  users: {
    async index(req, res) {
      const query = getCompactObj(req.query);
      const users = await User.find(query);
      res.status(200).render("admin/pages/users/index", {
        users: users,
        query,
      });
    },
    async single(req, res) {
      const currentUser = await getCurrentUser(req, res);
      const id = req.params.id ? req.params.id : await currentUser._id;
      if (mongoose.Types.ObjectId.isValid(id)) {
        const viewUser = await User.findById(id);
        res.status(200).render("admin/pages/users/single", {
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
      res.status(200).render("admin/pages/users/add", {
        error: res.locals.error,
        user: currentUser,
      });
    },
  },
};
