const Territory = require("../../models/territoryModel");
const { ERRORS } = require("../../utils/constants");
const { getError, dashUrl } = require("../utilities");
const { territories: territoryView } = require("./index");
const regions = require("../../data/regions.json");

module.exports = {
  async createTerritory(req, res) {
    const territoryObj = req.body;
    let territory = {};
    const region = regions.find((x) => x.id === territoryObj.region);
    const cities = territoryObj.city.includes("*")
      ? region.cities.map((x) => x.id)
      : territoryObj.city;
    territoryObj.region = region.id;
    territoryObj.cities = cities;
    try {
      territory = await Territory.create(territoryObj);
    } catch (error) {
      const errMsg = getError(error);
      res.locals.error = errMsg;
      return territoryView.add(req, res);
    }

    if (await territory.save()) {
      res.locals.territory = territory;
    } else {
      res.locals.error = ERRORS.DB_INSERTION_FAILED;
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
    await Territory.findByIdAndDelete(req.body.id);
    res.redirect(dashUrl("/territories"));
  },
};
