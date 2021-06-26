const User = require("../../models/userModel");
const { clients, registrators, users } = require("./userController");
const getGallery = require("../../utils/getGallery");
const News = require("../../models/newsModel");
const Feedback = require("../../models/feedbackModel");
const Banner = require("../../models/bannerModel");
const regions = require("../../data/regions.json");
const Territory = require("../../models/territoryModel");
const { getPopulatedTerritories, dashUrl } = require("../utilities");
const { getCurrentUser } = require("../authController");
const Transaction = require("../../models/transactionModel");
const { Product } = require("../../models/productModel");
const Warehouse = require("../../models/warehouseModel");
const { ERRORS } = require("../../utils/constants");

module.exports = {
  async index(req, res) {
    const currentUser = await getCurrentUser(req, res);
    if (currentUser.role === "watcher" || currentUser.role === "registrator") {
      return res.redirect(dashUrl("/settings"));
    }
    const regs = await User.find(
      { role: "registrator" },
      {},
      { limit: 4 }
    ).populate("followers");
    const watchers = await User.find(
      { role: "watcher" },
      {},
      { limit: 4 }
    ).populate("followers");
    const clientCount = await User.countDocuments({ status: "client" });
    const partnerCount = await User.countDocuments({ status: "partner" });
    const masterCount = await User.countDocuments({ status: "master" });
    const managerCount = await User.countDocuments({ status: "manager" });
    res.status(200).render("admin/index", {
      registrators: regs,
      watchers: watchers,
      clientCount,
      partnerCount,
      masterCount,
      managerCount,
    });
  },
  clients: clients,
  registrators: registrators,
  users: users,
  team: {
    async index(req, res) {
      const currentUser = await getCurrentUser(req, res, ["followers"]);
      let followers = currentUser?.followers;
      if (req.query.id) {
        const user = await User.findById(req.query.id).populate("followers");
        // eslint-disable-next-line prefer-destructuring
        if (
          currentUser.followers.find((x) => x._id.toString() === req.query.id)
        ) {
          // eslint-disable-next-line prefer-destructuring
          followers = user.followers;
        } else {
          return res.status(403).render("admin/error", {
            err_code: 403,
            error: res.__(ERRORS.PERMISSION_DENIED),
          });
        }
      }

      res.status(200).render("admin/pages/team/index", {
        followers: followers,
      });
    },
  },
  transfers: {
    async index(req, res) {
      const currentUser = await getCurrentUser(req, res);
      const transactions = await Transaction.find({
        $or: [{ from: currentUser._id }, { to: currentUser._id }],
      }).populate("from to", "name surname _id photo");
      res.status(200).render("admin/pages/transfers/index", {
        transactions: transactions,
      });
    },
  },
  warehouses: {
    async index(req, res) {
      const currentUser = await getCurrentUser(req, res);
      const territoriesDB = await Territory.find();
      let warehouses = await Warehouse.find().populate({
        path: "territory",
        populate: {
          path: "registrator",
          select: "name surname",
        },
      });

      if (currentUser.role === "registrator") {
        warehouses = warehouses.filter((x) =>
          x.territory.registrator._id.equals(currentUser._id)
        );
      }

      res.status(200).render("admin/pages/warehouses/index", {
        territories: getPopulatedTerritories(territoriesDB),
        warehouses,
      });
    },
    async single(req, res) {
      const currentUser = await getCurrentUser(req, res);
      const warehouse = await Warehouse.findById(req.params.id).populate(
        "territory products.product"
      );
      if (currentUser.role === "registrator") {
        if (!warehouse.territory.registrator._id.equals(currentUser._id)) {
          return res.status(403).render("admin/error", {
            err_code: 403,
            error: res.__(ERRORS.PERMISSION_DENIED),
          });
        }
      }
      const products = await Product.find();
      res.status(200).render("admin/pages/warehouses/single", {
        warehouse,
        products,
      });
    },
  },
  products: {
    async index(req, res) {
      const products = await Product.find();
      res.status(200).render("admin/pages/products/index", {
        products,
      });
    },
    async single(req, res) {
      const product = await Product.findById(req.params.id);
      res.status(200).render("admin/pages/products/single", {
        product,
      });
    },
    add(req, res) {
      res.status(200).render("admin/pages/products/add", {
        id: req.params.id,
      });
    },
  },
  news: {
    async index(req, res) {
      //TODO apply pagination
      const newsList = await News.find({});
      res.status(200).render("admin/pages/news/index", {
        newsList,
      });
    },
    async single(req, res) {
      const news = await News.findById(req.params.id);
      res.status(200).render("admin/pages/news/single", {
        news,
      });
    },
    add(req, res) {
      res.status(200).render("admin/pages/news/add");
    },
  },
  gallery: {
    async index(req, res) {
      const images = await getGallery();
      res.status(200).render("admin/pages/gallery/index", {
        images: images,
      });
    },
  },
  banners: {
    async index(req, res) {
      const banners = await Banner.find({});
      res.status(200).render("admin/pages/banners/index", {
        banners,
      });
    },
    async single(req, res) {
      const banner = await Banner.findById(req.params.id);
      res.status(200).render("admin/pages/banners/single", {
        banner,
      });
    },
  },
  feedbacks: {
    async index(req, res) {
      const feedbacks = await Feedback.find({});
      res.status(200).render("admin/pages/feedbacks/index", {
        feedbacks,
      });
    },
    async single(req, res) {
      const feedback = await Feedback.findById(req.params.id);
      res.status(200).render("admin/pages/feedbacks/single", {
        feedback,
      });
    },
  },
  territories: {
    async index(req, res) {
      const territoriesDB = await Territory.find().populate("registrator");
      // territoriesDB.forEach((db) => {
      //   const region = regions.find((y) => y.id === db.region);
      //   region.mapUrl = db.mapUrl;
      //   region._id = db._id;
      //   if (region) {
      //     region.cities.filter((z) => db.cities.includes(z.id));
      //     territories.push(region);
      //   }
      // });
      const territories = getPopulatedTerritories(territoriesDB);
      res.status(200).render("admin/pages/territories/index", {
        territories,
      });
    },
    async add(req, res) {
      const { region: id } = req.query;
      const region = regions.find((x) => x.id === id);
      res.status(200).render("admin/pages/territories/add", {
        regions,
        cities: region.cities,
        regionId: id,
      });
    },
    async single(req, res) {
      const { region: id } = req.query;
      const { id: _id } = req.params;
      const territory = await Territory.findById(_id).populate("registrator");
      const temp = id || (await territory.region);
      // console.log(regions.filter((x) => x.id === temp));
      const regionObj = regions.find((x) => x.id === temp);

      res.status(200).render("admin/pages/territories/single", {
        regionId: regionObj.id,
        regions,
        cities: regionObj.cities,
        territory,
      });
    },
  },
};
