const User = require("../../models/userModel");
const { getCurrentUser } = require("../authController");

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
      const id = req.params.id;
      const viewUser = await User.findById(id);
      const currentUser = await getCurrentUser(req, res);
      res.status(200).render("admin/pages/user/index", {
        user: currentUser,
        error: res.locals.error,
        viewUser,
      });
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
