const fs = require("fs");

module.exports = {
  async galleryAdd(req, res) {
    console.log(req.file);
    res.status(200).json({ file: req.file });
  },
  async galleryDelete(req, res) {
    console.log(req.body.key);
    try {
      await fs.promises.unlink(`${__dirname}/../../public${req.body.key}`);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(404).json({ ok: false });
    }
  },
};
