const fs = require("fs");
const Banner = require("../../models/bannerModel");
const { ERRORS } = require("../../utils/constants");
const { getFileName, getError, dashUrl, getImgPath } = require("../utilities");
const { banners: bannerView } = require("./index");

module.exports = {
  async createBanner(req, res) {
    const bannerObj = req.body;
    bannerObj.photo = getFileName(req.file.path);
    let banner = {};
    try {
      banner = await Banner.create(bannerObj);
    } catch (error) {
      const errMsg = getError(error);
      res.locals.error = errMsg;
      return bannerView.add(req, res);
    }

    if (await banner.save()) {
      res.locals.banner = banner;
    } else {
      res.locals.error = ERRORS.DB_INSERTION_FAILED;
    }
    res.redirect(dashUrl(`/banners`));
  },
  async updateBanner(req, res) {
    const { file } = req;
    const bannerObj = req.body;

    if (file) {
      bannerObj.photo = getFileName(file.path);
    }
    const oldBanner = await Banner.findByIdAndUpdate(bannerObj.id, bannerObj);
    const oldFileName = oldBanner.photo;

    if (file) {
      fs.unlink(getImgPath(oldFileName), (err) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err);
        // eslint-disable-next-line no-console
        else console.log("deleted");
      });
    }
    res.redirect(dashUrl(`/banners/id/${oldBanner._id}`));
  },
  async deleteBanner(req, res) {
    const deletedBanner = await Banner.findByIdAndDelete(req.body.id);

    if (deletedBanner) {
      fs.unlink(getImgPath(deletedBanner.photo), (err) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err);
        // eslint-disable-next-line no-console
        else console.log("deleted");
      });
    }
    res.redirect(dashUrl("/banners"));
  },
};
