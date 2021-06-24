const regions = require("../data/regions.json");

module.exports = {
  sum(side, sum = 0) {
    side.forEach((user) => {
      Object.values(user).forEach((u) => {
        if (typeof u === "number") {
          sum += u;
        }
      });
    });
    return sum;
  },
  dashUrl: (url) => `/dashboard${url}`,
  getFileName: (path) => `${path.replace("public", "").split("\\").join("/")}`,
  getImgPath: (img) => `${__dirname}/../public${img}`,
  getError: (error) =>
    error.errors
      ? Object.values(error.errors)[0].properties?.message
      : error.toString(),
  getCompactObj: (obj) => {
    const newObj = {};
    Object.keys(obj).forEach((prop) => {
      if (obj[prop]) {
        newObj[prop] = obj[prop];
      }
    });
    return newObj;
  },
  getPopulatedTerritories: (territories) => {
    const temp = [];
    territories.forEach((db) => {
      const region = regions.find((reg) => reg.id === db.region);
      const city = region.cities.find((x) => x.id === db.city);
      temp.push({
        city,
        region,
        mapUrl: db.mapUrl,
        _id: db._id,
        registrator: db.registrator,
      });
    });
    return temp;
  },
};
