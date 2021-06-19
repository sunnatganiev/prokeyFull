const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Iltimos sarlavha kirgizing!"],
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
    required: [true, "Iltimos rasm kirgizing!"],
  },
  url: {
    type: String,
    required: [true, "Iltimos url kirgizing!"],
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
