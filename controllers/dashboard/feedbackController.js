const fs = require("fs");
const Feedback = require("../../models/feedbackModel");
const { ERRORS } = require("../../utils/constants");
const { getFileName, getError, dashUrl, getImgPath } = require("../utilities");
const { feedbacks: feedbackView } = require("./index");

module.exports = {
  async createFeedback(req, res) {
    const feedbackObj = req.body;
    feedbackObj.photo = getFileName(req.file.path);
    let feedback = {};
    try {
      feedback = await Feedback.create(feedbackObj);
    } catch (error) {
      const errMsg = getError(error);
      res.locals.error = errMsg;
      return feedbackView.add(req, res);
    }

    if (await feedback.save()) {
      res.locals.feedback = feedback;
    } else {
      res.locals.error = ERRORS.DB_INSERTION_FAILED;
    }
    res.redirect(dashUrl(`/feedbacks`));
  },
  async updateFeedback(req, res) {
    const { file } = req;
    const feedbackObj = req.body;

    if (file) {
      feedbackObj.photo = getFileName(file.path);
    }
    const oldFeedback = await Feedback.findByIdAndUpdate(
      feedbackObj.id,
      feedbackObj
    );
    const oldFileName = oldFeedback.photo;

    if (file) {
      fs.unlink(getImgPath(oldFileName), (err) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err);
        // eslint-disable-next-line no-console
        else console.log("deleted");
      });
    }
    res.redirect(dashUrl(`/feedbacks/id/${oldFeedback._id}`));
  },
  async deleteFeedback(req, res) {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.body.id);

    if (deletedFeedback) {
      fs.unlink(getImgPath(deletedFeedback.photo), (err) => {
        // eslint-disable-next-line no-console
        if (err) console.log(err);
        // eslint-disable-next-line no-console
        else console.log("deleted");
      });
    }
    res.redirect(dashUrl("/feedbacks"));
  },
};
