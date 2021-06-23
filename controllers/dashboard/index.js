const User = require("../../models/userModel");
const { clients, registrators, users } = require("./userController");
const getGallery = require("../../utils/getGallery");
const News = require("../../models/newsModel");
const Feedback = require("../../models/feedbackModel");
const Banner = require("../../models/bannerModel");
const regions = require("../../data/regions.json");
const Territory = require("../../models/territoryModel");
const { getPopulatedTerritories } = require("../utilities");
const { getCurrentUser } = require("../authController");
const Transaction = require("../../models/transactionModel");

module.exports = {
  async index(req, res) {
    const regs = await User.find({ role: "registrator" }).populate("followers");
    const watchers = await User.find({ role: "watcher" }).populate("followers");
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
      const currentUser = await getCurrentUser(req, res);
      res.status(200).render("admin/pages/team/index", {
        followers: currentUser.followers,
      });
    },
  },
  transfers: {
    async index(req, res) {
      const currentUser = await getCurrentUser(req, res);
      const transactions = await Transaction.find({
        $or: [{ from: currentUser._id }, { to: currentUser._id }],
      }).populate("from to", "name surname _id photo");
      console.log(transactions);
      res.status(200).render("admin/pages/transfers/index", {
        transactions: transactions,
      });
    },
  },
  warehouses: {
    index(req, res) {
      res.status(200).render("admin/pages/warehouses/index");
    },
    single(req, res) {
      //handle id
      console.log(req.params.id);
      res.status(200).render("admin/pages/warehouses/single", {
        id: req.params.id,
      });
    },
  },
  products: {
    index(req, res) {
      res.status(200).render("admin/pages/products/index", {
        isDeleted: false,
      });
    },
    delete(req, res) {
      //if successfull send isDeleted: true
      res.status(200).render("admin/pages/products/index", {
        isDeleted: true,
      });
    },
    single(req, res) {
      //handle id
      console.log(req.params.id);
      res.status(200).render("admin/pages/products/single", {
        error: true,
      });
    },
    add(req, res) {
      res.status(200).render("admin/pages/products/add", {
        id: req.params.id,
      });
    },
    // edit(req, res) {
    //   res.status(200).render("admin/pages/products/edit", { error: null });
    // },
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
