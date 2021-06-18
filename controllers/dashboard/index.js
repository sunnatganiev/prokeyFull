const User = require("../../models/userModel");
const { customers, registrators, user } = require("./userController");
const fs = require("fs");
const getGallery = require("../../utils/getGallery");

module.exports = {
  async index(req, res) {
    const registrators = await User.find({ role: "registrator" });
    const clients = await User.find({ role: "client" });

    res.status(200).render("admin/index", {
      registrators,
      clients,
    });
  },
  customers: customers,
  registrators: registrators,
  user: user,
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
    index(req, res) {
      res.status(200).render("admin/pages/news/index", {
        isDeleted: false,
      });
    },
    delete(req, res) {
      //if successfull send isDeleted: true
      res.status(200).render("admin/pages/news/index", {
        isDeleted: true,
      });
    },
    single(req, res) {
      //handle id
      console.log(req.params.id);
      res.status(200).render("admin/pages/news/single", {
        error: true,
      });
    },
    add(req, res) {
      res.status(200).render("admin/pages/news/add", {
        id: req.params.id,
      });
    },
  },
  gallery: {
    async index(req, res) {
      const images = await getGallery();
      res.status(200).render("admin/pages/gallery/index", {
        images: images,
      });
    },
    async delete(req, res) {},
  },
  banners: {
    index(req, res) {
      res.status(200).render("admin/pages/banners/index");
    },
    single(req, res) {
      res.status(200).render("admin/pages/banners/single");
    },
  },
  workers: {
    index(req, res) {
      res.status(200).render("admin/pages/workers/index");
    },
    single(req, res) {
      res.status(200).render("admin/pages/workers/single");
    },
  },
};
