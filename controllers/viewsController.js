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
};
