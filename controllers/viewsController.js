exports.getProducts = (req, res) => {
  res.status(200).render("mahsulotlar", {
    title: "Mahsulotlar",
  });
};

exports.proIn = (req, res) => {
  res.status(200).render("mahsulotichi", {
    title: "Mahsulotlar",
  });
};

exports.dokonlar = (req, res) => {
  res.status(200).render("hududiydokonlar", {
    title: "Do'konlar",
  });
};

exports.galereya = (req, res) => {
  res.status(200).render("galereya", {
    title: "Do'konlar",
  });
};

exports.kontakt = (req, res) => {
  res.status(200).render("kontaktlar", {
    title: "Kontaktlar",
  });
};

exports.home = (req, res) => {
  res.status(200).render("index", {
    title: "Home",
    user: res.locals.user,
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    user: res.locals.user,
  });
};

exports.yangiliklar = (req, res) => {
  res.status(200).render("yangiliklar");
};

exports.yangilikIchi = (req, res) => {
  res.status(200).render("yangiliklarichi");
};

exports.laws = (req, res) => {
  res.status(200).render(`laws/${req.params.id}`);
};

//DASHBOARD

exports.dashboard = {
  index(req, res) {
    res.status(200).render("admin/index");
  },
  customers: {
    index(req, res) {
      res.status(200).render("admin/pages/customers/index");
    },
    add(req, res) {
      res.status(200).render("admin/pages/customers/add");
      console.log("viewsController line 64: ", req.body);
    },
  },

  registrators: {
    index(req, res) {
      res.status(200).render("admin/pages/registrators/index");
    },
    add(req, res) {
      res.status(200).render("admin/pages/registrators/add");
    },
  },
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
      res
        .status(200)
        .render("admin/pages/warehouses/single", { id: req.params.id });
    },
  },
  products: {
    index(req, res) {
      res
        .status(200)
        .render("admin/pages/products/index", { isDeleted: false });
    },
    delete(req, res) {
      //if successfull send isDeleted: true
      res.status(200).render("admin/pages/products/index", { isDeleted: true });
    },
    single(req, res) {
      //handle id
      console.log(req.params.id);
      res.status(200).render("admin/pages/products/single", { error: true });
    },
    add(req, res) {
      res.status(200).render("admin/pages/products/add", { id: req.params.id });
    },
    // edit(req, res) {
    //   res.status(200).render("admin/pages/products/edit", { error: null });
    // },
  },
  news: {
    index(req, res) {
      res.status(200).render("admin/pages/news/index", { isDeleted: false });
    },
    delete(req, res) {
      //if successfull send isDeleted: true
      res.status(200).render("admin/pages/news/index", { isDeleted: true });
    },
    single(req, res) {
      //handle id
      console.log(req.params.id);
      res.status(200).render("admin/pages/news/single", { error: true });
    },
    add(req, res) {
      res.status(200).render("admin/pages/news/add", { id: req.params.id });
    },
  },
  gallery: {
    index(req, res) {
      res.status(200).render("admin/pages/gallery/index");
    },
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
  settings: {
    index(req, res) {
      res.status(200).render("admin/pages/settings/index");
    },
  },
};
