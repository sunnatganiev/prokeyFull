const Warehouse = require("../models/warehouseModel");
const { dashUrl } = require("./utilities");

module.exports = {
  async addWarehouse(req, res) {
    await Warehouse.create(req.body);

    res.redirect(dashUrl("/warehouses"));
  },
  async updateWarehouse(req, res) {
    await Warehouse.findByIdAndUpdate(req.body.id, req.body);

    res.redirect(dashUrl("/warehouses"));
  },
  async deleteWarehouse(req, res) {
    res.send("ok");
  },
  async addWarehouseProduct(req, res) {
    res.send("ok");
  },
  async updateWarehouseProduct(req, res) {
    res.send("ok");
  },
  async deleteWarehouseProduct(req, res) {
    res.send("ok");
  },
};
