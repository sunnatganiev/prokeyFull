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

exports.gallery = (req, res) => {
  res.status(200).render("static/gallery", {
    title: "Do'konlar",
  });
};

exports.contacts = (req, res) => {
  res.status(200).render("static/contacts", {
    title: "Kontaktlar",
  });
};

exports.home = (req, res) => {
  res.status(200).render("static/index", {
    title: "Home",
    user: res.locals.user,
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
  index(req, res) {
    res.status(200).render("news/index", {
      title: "Yangiliklar",
    });
  },
  single(req, res) {
    //TODO handle id
    res.status(200).render("news/single", {
      title: "Yangiliklar",
    });
  },
};

exports.laws = (req, res) => {
  res.status(200).render(`laws/${req.params.id}`);
};
