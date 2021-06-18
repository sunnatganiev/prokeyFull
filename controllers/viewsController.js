const News = require("../models/newsModel");
const getGallery = require("../utils/getGallery");

exports.products = {
  index(req, res) {
    res.status(200).render("products/index", {
      title: "Mahsulotlar",
    });
  },
  single(req, res) {
    //TODO handle id
    res.status(200).render("products/single", {
      title: "Mahsulotlar",
    });
  },
};

exports.localShops = (req, res) => {
  res.status(200).render("static/local-shops", {
    title: "Do'konlar",
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
  res.status(200).render("static/index", {
    title: "Home",
    user: res.locals.user,
    newsList,
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
