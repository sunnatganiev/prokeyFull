const User = require("../models/userModel");
const logic = require("./logic");
const { user: userViews } = require("./dashboard/userController");
const { ERRORS } = require("../utils/constants");

const dashUrl = (url) => `/dashboard${url}`;

module.exports = {
  async createUser(req, res, next) {
    const following = await User.findOne({ email: req.body.following });
    const whoInvited = await User.findOne({ email: req.body.whoInvited });

    if (!following && !whoInvited) {
      res.locals.error = following
        ? whoInvited
          ? null
          : ERRORS.NO_USER_TO_BE_INVITED
        : ERRORS.NO_USER_TO_FOLLOW;
      return userViews.add(req, res);
    }

    const userObj = req.body;
    userObj.photo = `${req.file.path
      .replace("public", "")
      .split("\\")
      .join("/")}`;

    let user = {};

    await logic.invite(req, whoInvited);
    await logic.side(req, following);

    try {
      user = await User.create(userObj);
    } catch (error) {
      const errMsg = error.errors
        ? Object.values(error.errors)[0].properties.message
        : error.toString();
      res.locals.error = errMsg;
      return userViews.add(req, res);
    }
    if (await user.save()) {
      res.locals.viewUser = user;
    } else {
      res.locals.error = ERRORS.DB_INSERTION_FAILED;
    }

    res.redirect(dashUrl(`/user/id/${user._id}`));
  },
};
