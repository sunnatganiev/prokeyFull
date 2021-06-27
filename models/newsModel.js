const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Iltimos sarlavha kirgizing!"],
    },
    shortDescription: {
      type: String,
      required: [true, "Iltimos qisqa ta'rif kirgizing!"],
    },
    description: {
      type: String,
      required: [true, "Iltimos ta'rif kirgizing!"],
    },
    photo: {
      type: String,
      required: [true, "Iltimos rasm kirgizing!"],
    },
    translations: {
      ru: {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        shortDescription: {
          type: String,
        },
      },
      en: {
        title: {
          type: String,
        },
        shortDescription: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;
