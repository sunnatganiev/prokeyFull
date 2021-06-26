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
    await Warehouse.findByIdAndRemove(req.body.id);
    res.redirect(dashUrl("/warehouses"));
  },
  async addWarehouseProduct(req, res) {
    const warehouse = await Warehouse.findById(req.body.warehouse);
    const prObj = {
      product: req.body.product,
      quantity: req.body.quantity,
    };
    const index = warehouse.products.findIndex(
      (e) => e.product._id.toString() === prObj.product
    );
    if (index === -1) {
      warehouse.products.push(prObj);
    } else {
      warehouse.products.splice(index, 1, prObj);
    }
    await warehouse.save({ validateBeforeSave: false });
    res.redirect(dashUrl(`/warehouses/id/${warehouse._id}`));
  },
  async deleteWarehouseProduct(req, res) {
    const warehouse = await Warehouse.findById(req.body.warehouse);
    const index = warehouse.products.findIndex(
      (e) => e.product._id.toString() === req.body.product
    );
    warehouse.products.splice(index, 1);

    await warehouse.save({ validateBeforeSave: false });

    res.redirect(dashUrl(`/warehouses/id/${warehouse._id}`));
  },
  async decrementProduct(req, res) {
    console.log(req.body);
    const warehouse = await Warehouse.findById(req.body.warehouse);

    const index = warehouse.products.findIndex(
      (e) => e.product._id.toString() === req.body.product
    );
    if (index !== -1) {
      const oldProduct = warehouse.products[index];
      warehouse.products.splice(index, 1, {
        product: oldProduct.product,
        quantity:
          oldProduct.quantity > 0
            ? oldProduct.quantity - 1
            : oldProduct.quantity,
      });
    }

    await warehouse.save({ validateBeforeSave: false });

    res.redirect(dashUrl(`/warehouses/id/${warehouse._id}`));
  },
};
