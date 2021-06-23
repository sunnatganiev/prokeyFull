const Territory = require("../../models/territoryModel");
const { getError, dashUrl } = require("../utilities");
const { territories: territoryView } = require("./index");
const regions = require("../../data/regions.json");
const User = require("../../models/userModel");

module.exports = {
  async createTerritory(req, res) {
    const territoryObj = req.body;
    const region = regions.find((x) => x.id === territoryObj.region);
    territoryObj.region = region.id;
    try {
      await Territory.create(territoryObj);
    } catch (error) {
      const errMsg = getError(error);
      res.locals.error = errMsg;
      return territoryView.add(req, res);
    }
    res.redirect(dashUrl(`/territories`));
  },
  async updateTerritory(req, res) {
    const territoryObj = req.body;
    const oldTerritory = await Territory.findByIdAndUpdate(
      territoryObj.id,
      territoryObj
    );

    res.redirect(dashUrl(`/territories/id/${oldTerritory._id}`));
  },
  async deleteTerritory(req, res) {
    const ter = await Territory.findById(req.body.id).populate("registrator");
    await User.updateMany({ territory: ter._id }, { territory: null });
    await Territory.findByIdAndDelete(req.body.id);
    res.redirect(dashUrl("/territories"));
  },
};
