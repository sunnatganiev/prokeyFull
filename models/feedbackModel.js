const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Iltimos sarlavha kirgizing!"],
  },
  description: {
    type: String,
    required: [true, "Iltimos ta'rif kirgizing!"],
  },
  photo: {
    type: String,
    required: [true, "Iltimos rasm kirgizing!"],
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
