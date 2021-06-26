const fs = require("fs");
const User = require("../models/userModel");
const logic = require("./logic");
const { users: userViews } = require("./dashboard/userController");
const { ERRORS } = require("../utils/constants");
const { getCurrentUser } = require("./authController");
const { getFileName, dashUrl, getImgPath, getError } = require("./utilities");

module.exports = {
  async createUser(req, res, next) {
    const currentUser = await getCurrentUser();
    const following = await User.findOne({ email: req.body.following });
    const whoInvited = await User.findOne({ email: req.body.whoInvited });

    if (!following && !whoInvited) {
      // eslint-disable-next-line no-nested-ternary
      res.locals.error = following
        ? whoInvited
          ? null
          : ERRORS.NO_USER_TO_BE_INVITED
        : ERRORS.NO_USER_TO_FOLLOW;
      return userViews.add(req, res);
    }

    const userObj = req.body;
    if (currentUser.role === "registrator") {
      userObj.role = "watcher";
    }
    userObj.photo = getFileName(req.file.path);
    let user = {};

    await logic.invite(req, whoInvited);

    try {
      user = await User.create(userObj);
      await logic.assignToTerritory(userObj.territory, user);
      await logic.side(req, following, user);
    } catch (error) {
      const errMsg = getError(error);
      res.locals.error = errMsg;
      return userViews.add(req, res);
    }
    if (await user.save()) {
      res.locals.viewUser = user;
    } else {
      res.locals.error = ERRORS.DB_INSERTION_FAILED;
    }

    res.redirect(dashUrl(`/users/id/${user._id}`));
  },
  async updateUser(req, res, next) {
    const currentUser = await getCurrentUser(req, res);
    const { file } = req;
    const userObj = req.body;
    if (currentUser.role === "registrator") {
      userObj.role = "watcher";
    }
    if (!["admin", "registrator"].includes(currentUser.role)) {
      if (currentUser._id.toString() !== userObj.id) {
        return res.redirect("back");
      }
    }
    if (file) {
      userObj.photo = getFileName(file.path);
    }
    const oldUser = await User.findByIdAndUpdate(userObj.id, userObj);
    await logic.assignToTerritory(userObj.territory, oldUser);
    const oldFileName = oldUser.photo;

    if (file) {
      fs.unlink(getImgPath(oldFileName), (err) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err);
        // eslint-disable-next-line no-console
        else console.log("deleted");
      });
    }
    if (currentUser._id.toString() === userObj.id) {
      res.redirect(dashUrl(`/settings`));
    } else {
      res.redirect(dashUrl(`/users/id/${oldUser._id}`));
    }
  },
};
