module.exports = {
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
  user: {
    index(req, res) {
      res.status(200).render("admin/pages/user/index", {
        user: res.locals.user,
        error: res.locals.error,
      });
    },
  },
};
