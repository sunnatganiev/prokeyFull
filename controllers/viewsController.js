const Banner = require("../models/bannerModel");
const Feedback = require("../models/feedbackModel");
const News = require("../models/newsModel");
const Product = require("../models/productModel");
const Territory = require("../models/territoryModel");
const getGallery = require("../utils/getGallery");
const { getPopulatedTerritories } = require("./utilities");

exports.products = {
  async index(req, res) {
    const products = await Product.find();
    res.status(200).render("products/index", {
      title: "Mahsulotlar",
      products,
    });
  },
  async single(req, res) {
    const product = await Product.findById(req.params.id);
    const products = await Product.find();
    res.status(200).render("products/single", {
      title: "Mahsulotlar",
      product,
      products,
    });
  },
};

exports.localShops = async (req, res) => {
  const territoriesDB = await Territory.find();

  res.status(200).render("static/local-shops", {
    title: "Do'konlar",
    territories: getPopulatedTerritories(territoriesDB),
    territory: req.query.territory
      ? getPopulatedTerritories(territoriesDB).find(
          (x) => x._id.toString() === req.query.territory
        )
      : getPopulatedTerritories(territoriesDB)[0],
  });
};

exports.gallery = async (req, res) => {
  const images = await getGallery();
  const rows = [];
  const imagesLength = images.length;
  while (images.length > 0) {
    const chunk = images.splice(0, imagesLength / 3);
    rows.push(chunk);
  }
  res.status(200).render("static/gallery", {
    title: res.__("gallery"),
    rows,
  });
};

exports.contacts = (req, res) => {
  res.status(200).render("static/contacts", {
    title: "Kontaktlar",
  });
};

exports.home = async (req, res) => {
  const newsList = await News.find({}, {}, { limit: 4 });
  const feedbacks = await Feedback.find({});
  const banners = await Banner.find({});
  const products = await Product.find();
  res.status(200).render("static/index", {
    title: "Home",
    user: res.locals.user,
    newsList,
    feedbacks,
    banners,
    products,
  });
};

exports.login = (req, res) => {
  res.status(200).render("static/login", {
    user: res.locals.user,
    title: "Login",
    error: res.locals.error,
  });
};

exports.news = {
  async index(req, res) {
    const newsList = await News.find({});
    res.status(200).render("news/index", {
      title: "Yangiliklar",
      newsList,
    });
  },
  async single(req, res) {
    const news = await News.findById(req.params.id);
    res.status(200).render("news/single", {
      title: news.title,
      news,
    });
  },
};

exports.laws = (req, res) => {
  res.status(200).render(`laws/${req.params.id}`);
};
