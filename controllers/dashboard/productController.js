const fs = require("fs");
const Product = require("../../models/productModel");
const { dashUrl, getFileName, getImgPath } = require("../utilities");

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
  async updateProduct(req, res) {
    const productObj = req.body;

    if (req.files) {
      productObj.images = [];
      req.files.forEach((x) => {
        productObj.images.push(getFileName(x.path));
      });
    }
    const oldProduct = await Product.findByIdAndUpdate(
      productObj.id,
      productObj
    );
    const oldFileNames = oldProduct.images;

    if (req.files) {
      oldFileNames.forEach((x) => {
        fs.unlink(getImgPath(x), (err) => {
          // eslint-disable-next-line no-console
          if (err) console.log(err);
          // eslint-disable-next-line no-console
          else console.log("deleted");
        });
      });
    }
    res.redirect(dashUrl(`/products/id/${oldProduct._id}`));
  },
  async deleteProduct(req, res) {
    const deletedProduct = await Product.findByIdAndDelete(req.body.id);

    if (deletedProduct) {
      deletedProduct.images.forEach((x) => {
        fs.unlink(getImgPath(x), (err) => {
          // eslint-disable-next-line no-console
          if (err) console.log(err);
          // eslint-disable-next-line no-console
          else console.log("deleted");
        });
      });
    }
    res.redirect(dashUrl("/products"));
  },
};
