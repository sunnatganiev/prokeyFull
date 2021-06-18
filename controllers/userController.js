const User = require("../models/userModel");
const logic = require("./logic");
const { user: userViews } = require("./dashboard/userController");
const { ERRORS } = require("../utils/constants");
const fs = require("fs");
const { getCurrentUser } = require("./authController");

const dashUrl = (url) => `/dashboard${url}`;
const getFileName = (path) =>
  `${path.replace("public", "").split("\\").join("/")}`;
const getImgPath = (img) => `${__dirname}/../public${img}`;

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
    userObj.photo = getFileName(req.file.path);
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
      console.log(error);
      return userViews.add(req, res);
    }
    if (await user.save()) {
      res.locals.viewUser = user;
    } else {
      res.locals.error = ERRORS.DB_INSERTION_FAILED;
    }

    res.redirect(dashUrl(`/user/id/${user._id}`));
  },
  async updateUser(req, res, next) {
    const currentUser = await getCurrentUser(req, res);
    console.log(currentUser);
    const file = req.file;
    const userObj = req.body;
    if (!["admin", "registrator"].includes(currentUser.role)) {
      if (currentUser._id.toString() !== userObj.id) {
        return res.redirect("back");
      }
    }
    if (file) {
      userObj.photo = getFileName(file.path);
    }
    const oldUser = await User.findByIdAndUpdate(userObj.id, userObj);
    const oldFileName = oldUser.photo;

    if (file) {
      fs.unlink(getImgPath(oldFileName), (err) => {
        if (err) console.log(err);
        else console.log("deleted");
      });
    }
    if (currentUser._id.toString() === userObj.id) {
      res.redirect(dashUrl(`/settings`));
    } else {
      res.redirect(dashUrl(`/user/id/${oldUser._id}`));
    }
  },
};
