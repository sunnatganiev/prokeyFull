const Product = require("../../models/productModel");
const { dashUrl, getFileName } = require("../utilities");

module.exports = {
  addProduct: async (req, res, next) => {
    const productObj = req.body;
    productObj.images = [];
    if (req.files) {
      req.files.forEach((x) => {
        productObj.images.push(getFileName(x.path));
      });
    }

    const product = await Product.create(req.body);

    if (product) return res.redirect(dashUrl(`/products/id/${product._id}`));

    res.redirect(dashUrl("/products"));
  },
};
