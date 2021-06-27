const fs = require("fs");
const Banner = require("../../models/bannerModel");
const Message = require("../../models/messageModel");
const News = require("../../models/newsModel");
const { Product } = require("../../models/productModel");
const User = require("../../models/userModel");
const { ERRORS } = require("../../utils/constants");
const { getCurrentUser } = require("../authController");
const { transfer } = require("../logic");
const { dashUrl } = require("../utilities");

module.exports = {
  async galleryAdd(req, res) {
    res.status(200).json({ file: req.file });
  },
  async galleryDelete(req, res) {
    try {
      await fs.promises.unlink(`${__dirname}/../../public${req.body.key}`);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(404).json({ ok: false });
    }
  },
  async transfersAdd(req, res) {
    const transactionObj = req.body;
    const currentUser = await getCurrentUser(req, res);
    const receiver = await User.findOne({ email: transactionObj.email });
    if (!receiver) {
      return res.status(200).render("admin/pages/transfers/index", {
        error: ERRORS.USER_DOES_NOT_EXIST,
      });
    }
    if (
      transactionObj.amount > currentUser.balance ||
      transactionObj.amount < 0
    ) {
      return res.status(200).render("admin/pages/transfers/index", {
        error: ERRORS.NOT_ENOUGH_BALL,
      });
    }

    const transaction = await transfer(currentUser, receiver, transactionObj);

    if (!transaction) {
      return res.status(200).render("admin/pages/transfers/index", {
        error: ERRORS.ERROR,
      });
    }

    res.redirect(dashUrl("/transfers"));
  },
  async addMessage(req, res) {
    const messageObj = req.body;
    const message = await Message.create(messageObj);

    if (message) {
      res.redirect("/?message=success");
    } else {
      res.redirect("/?message=danger");
    }
  },
  async staticTranslationEdit(req, res) {
    try {
      const lang = res.getLocale();
      const data = req.body;
      const strings = await fs.promises.readFile(
        `${__dirname}/../../locales/${lang}.json`
      );
      const translations = JSON.parse(strings.toString());

      translations[data.key] = data.value;

      await fs.promises.writeFile(
        `${__dirname}/../../locales/${lang}.json`,
        JSON.stringify(translations, null, 2)
      );

      res.json({
        status: true,
        body: req.body,
      });
    } catch (error) {
      res.json({
        status: false,
        body: req.body,
      });
    }
  },
  async translateProduct(req, res) {
    const data = req.body;
    const lang = res.getLocale();
    const translation = {
      name: data.name,
      description: data.description,
    };
    try {
      const product = await Product.findById(data.id);
      product.translations[lang] = translation;
      await product.save({ validateBeforeSave: false });
      res.json({ product });
    } catch (error) {
      res.json({ error });
    }
  },
  async translateBanner(req, res) {
    const data = req.body;
    const lang = res.getLocale();
    const translation = {
      title: data.title,
      description: data.description,
    };
    try {
      const banner = await Banner.findById(data.id);
      banner.translations[lang] = translation;
      await banner.save({ validateBeforeSave: false });
      res.json({ banner });
    } catch (error) {
      res.json({ error });
    }
  },
  async translateNews(req, res) {
    const data = req.body;
    const lang = res.getLocale();
    const translation = {
      title: data.title,
      description: data.description,
      shortDescription: data.shortDescription,
    };
    try {
      const news = await News.findById(data.id);
      news.translations[lang] = translation;
      await news.save({ validateBeforeSave: false });
      res.json({ news });
    } catch (error) {
      res.json({ error });
    }
  },
};
