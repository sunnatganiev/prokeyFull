const fs = require("fs");
const User = require("../../models/userModel");
const { ERRORS } = require("../../utils/constants");
const { getCurrentUser } = require("../authController");
const { transfer } = require("../logic");
const { dashUrl } = require("../utilities");

module.exports = {
  async galleryAdd(req, res) {
    console.log(req.file);
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
};
