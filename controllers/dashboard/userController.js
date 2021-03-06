const mongoose = require("mongoose");
const Territory = require("../../models/territoryModel");
const User = require("../../models/userModel");
const { ERRORS } = require("../../utils/constants");
const { getCurrentUser } = require("../authController");
const { getCompactObj, getPopulatedTerritories } = require("../utilities");

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
      const currentPage = parseInt(req.query.page, 10) || 0;
      const query = getCompactObj(req.query);
      delete query.page;
      const users = await User.find(
        query,
        {},
        { sort: "-createdAt", limit: 10, skip: currentPage * 10 }
      ).populate("followers");
      const usersCount = await User.countDocuments();
      const territories = await Territory.find();

      res.status(200).render("admin/pages/users/index", {
        users: users,
        query,
        pages: users.length >= 10 ? Math.ceil(usersCount / 10) : 0,
        currentPage,
        territories: getPopulatedTerritories(territories),
      });
    },
    async single(req, res) {
      const currentUser = await getCurrentUser(req, res, ["followers"]);

      const territoriesDB = await Territory.find();
      const id = req.params.id ? req.params.id : await currentUser._id;
      if (mongoose.Types.ObjectId.isValid(id)) {
        const viewUser = await User.findById(id).populate("followers");
        const following = await User.findOne({
          email: viewUser.following,
        }).populate("followers");

        if (
          ["registrator"].includes(currentUser.role) &&
          currentUser._id.toString() !== id.toString()
        ) {
          if (!currentUser.followers.find((x) => x._id.equals(viewUser._id))) {
            return res.status(403).render("admin/error", {
              err_code: 403,
              error: res.__(ERRORS.PERMISSION_DENIED),
            });
          }
        }
        res.status(200).render("admin/pages/users/single", {
          user: currentUser,
          error: res.locals.error,
          viewUser,
          following,
          territories: getPopulatedTerritories(territoriesDB),
        });
      } else {
        res.send("");
      }
    },
    async add(req, res, next) {
      const currentUser = await getCurrentUser(req, res);
      const territoriesDB = await Territory.find();
      res.status(200).render("admin/pages/users/add", {
        error: res.locals.error,
        user: currentUser,
        territories: getPopulatedTerritories(territoriesDB),
      });
    },
  },
};
