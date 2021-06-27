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
  translations: {
    ru: {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
    },
    en: {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  },
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
