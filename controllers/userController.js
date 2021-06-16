const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const logic = require("./logic");

module.exports = {
  async getUsers(role, count) {
    const users = await User.find({ role });
    return users;
  },
  createUser: catchAsync(async (req, res, next) => {
    // const following = await User.findOne({ email: req.body.following });
    const userObj = req.body;
    userObj.photo = `/${req.file.path.split("\\").join("/")}`;
    console.log(userObj);
    const user = await User.create(userObj);

    await logic.invite(req);
    await logic.side(req);

    if (await user.save()) {
      res.locals.user = user;
      return dashboard.user.index(req, res);
    } else {
      res.locals.error = ERRORS.DB_INSERTION_FAILED;
      return dashboard.user.index(req, res);
    }
  }),
};
