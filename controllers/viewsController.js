exports.getProducts = (req, res) => {
  res.status(200).render('mahsulotlar', {
    title: 'Mahsulotlar',
  });
};

exports.proIn = (req, res) => {
  res.status(200).render('mahsulotichi', {
    title: 'Mahsulotlar',
  });
};

exports.dokonlar = (req, res) => {
  res.status(200).render('hududiydokonlar', {
    title: "Do'konlar",
  });
};

exports.galereya = (req, res) => {
  res.status(200).render('galereya', {
    title: "Do'konlar",
  });
};

exports.kontakt = (req, res) => {
  res.status(200).render('kontaktlar', {
    title: 'Kontaktlar',
  });
};

exports.home = (req, res) => {
  res.status(200).render('index', {
    title: 'Home',
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    user: res.locals.user,
  });
};

exports.asosiy = (req, res) => {
  res.status(200).render('adasosiy');
};

exports.yangiliklar = (req, res) => {
  res.status(200).render('yangiliklar');
};

exports.yangilikIchi = (req, res) => {
  res.status(200).render('yangiliklarichi');
};
