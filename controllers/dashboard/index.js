const User = require("../../models/userModel");
const { clients, registrators, users } = require("./userController");
const getGallery = require("../../utils/getGallery");
const News = require("../../models/newsModel");
const Feedback = require("../../models/feedbackModel");
const Banner = require("../../models/bannerModel");

module.exports = {
  async index(req, res) {
    const regs = await User.find({ role: "registrator" });
    const watchers = await User.find({ role: "watcher" });
    const clientCount = await User.count({ status: "client" });
    const partnerCount = await User.count({ status: "partner" });
    const masterCount = await User.count({ status: "master" });
    const managerCount = await User.count({ status: "manager" });
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
    index(req, res) {
      res.status(200).render("admin/pages/team/index");
    },
    add(req, res) {
      res.status(200).render("admin/pages/team/add");
    },
  },
  transfers: {
    index(req, res) {
      res.status(200).render("admin/pages/transfers/index");
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
};
