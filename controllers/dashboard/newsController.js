const fs = require("fs");
const News = require("../../models/newsModel");
const { ERRORS } = require("../../utils/constants");
const { getFileName, getError, dashUrl, getImgPath } = require("../utilities");
const { news: newsView } = require("./index");

module.exports = {
  async createNews(req, res) {
    const newsObj = req.body;
    newsObj.photo = getFileName(req.file.path);
    let news = {};
    try {
      news = await News.create(newsObj);
    } catch (error) {
      const errMsg = getError(error);
      res.locals.error = errMsg;
      return newsView.add(req, res);
    }

    if (await news.save()) {
      res.locals.news = news;
    } else {
      res.locals.error = ERRORS.DB_INSERTION_FAILED;
    }
    console.log(news);
    res.redirect(dashUrl(`/news`));
  },
  async updateNews(req, res) {
    const { file } = req;
    const newsObj = req.body;

    if (file) {
      newsObj.photo = getFileName(file.path);
    }
    const oldNews = await News.findByIdAndUpdate(newsObj.id, newsObj);
    const oldFileName = oldNews.photo;

    if (file) {
      fs.unlink(getImgPath(oldFileName), (err) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err);
        // eslint-disable-next-line no-console
        else console.log("deleted");
      });
    }
    res.redirect(dashUrl(`/news/id/${oldNews._id}`));
  },
  async deleteNews(req, res) {
    const deletedNews = await News.findByIdAndDelete(req.body.id);

    if (deletedNews) {
      fs.unlink(getImgPath(deletedNews.photo), (err) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err);
        // eslint-disable-next-line no-console
        else console.log("deleted");
      });
    }
    res.redirect(dashUrl("/news"));
  },
};
