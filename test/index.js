const fs = require("fs");
const regions = require("../resources/js/regions.json");
const districts = require("../resources/js/districts.json");

regions.map((x) => {
  x.cities = [];
  return x;
});

districts.forEach((x) => {
  regions[x.region_id - 1].cities.push(x);
});

fs.writeFileSync("data.json", JSON.stringify(regions, null, 2));

console.log(regions);
