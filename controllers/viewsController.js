exports.getProducts = (req, res) => {
  res.status(200).render('mahsulotlar', {
    title: 'Mahsulotlar',
  });
};

exports.home = (req, res) => {
  res.status(200).render('index', {
    title: 'Home',
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    user: res.locals.user
  });
};

exports.asosiy = (req, res) => {
  res.status(200).render('adasosiy');
};

exports.yangiliklar = (req, res) => {
  res.status(200).render('yangiliklar');
};
