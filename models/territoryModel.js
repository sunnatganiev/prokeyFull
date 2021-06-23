const mongoose = require("mongoose");

const territorySchema = mongoose.Schema({
  region: {
    type: String,
    required: [true, "Viloyatni kiriting"],
  },
  city: {
    type: String,
    required: [true, "Shahar/Tuman tanlang"],
  },
  mapUrl: {
    type: String,
    required: [true, "Google iframe linkini qo'ying!!!"],
  },
  registrator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  // warehouse: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "Warehouse",
  // },
});

const Territory = mongoose.model("Territory", territorySchema);

module.exports = Territory;
