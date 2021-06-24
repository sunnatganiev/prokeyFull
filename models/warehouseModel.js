const mongoose = require("mongoose");

const warehouseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  territory: {
    type: mongoose.Types.ObjectId,
    ref: "Territory",
  },
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
