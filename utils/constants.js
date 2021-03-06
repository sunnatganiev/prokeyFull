const BASE_URL = "/api/v1/";
const regions = require("../data/regions.json");

module.exports = {
  BASE_URL: BASE_URL,
  api(name) {
    return `${BASE_URL}${name}`;
  },
  getTerritory(territory) {
    if (!territory) return null;
    const region = regions.find((reg) => reg.id === territory.region);
    const city = region.cities.find((x) => x.id === territory.city);
    return {
      city,
      region,
      mapUrl: territory.mapUrl,
      _id: territory._id,
      registrator: territory.registrator,
    };
  },
  ERRORS: {
    WRONG_CREDENTIALS: "WRONG_CREDENTIALS",
    DB_INSERTION_FAILED: "DB_INSERTION_FAILED",
    USER_DOES_NOT_EXIST: "USER_DOES_NOT_EXIST",
    PASSWORDS_NOT_SAME: "PASSWORDS_NOT_SAME",
    NO_USER_TO_BE_INVITED: "NO_USER_TO_BE_INVITED",
    NO_USER_TO_FOLLOW: "NO_USER_TO_FOLLOW",
    PERMISSION_DENIED: "PERMISSION_DENIED",
    NOT_ENOUGH_BALL: "NOT_ENOUGH_BALL",
    PAGE_NOT_FOUND: "PAGE_NOT_FOUND",
    ERROR: "ERROR",
    INCORRECT_PASSWORD: "INCORRECT_PASSWORD",
    PASSWORD_MUST_CONTAIN_8_CHARS: "PASSWORD_MUST_CONTAIN_8_CHARS",
    EMAIL_IS_SENT: "EMAIL_IS_SENT",
    INVALID_TOKEN: "INVALID_TOKEN",
  },
  translate(obj, lang) {
    if (lang === "uz") return obj;
    if (!obj) {
      return null;
    }
    return { ...obj, ...obj.translations[lang] };
  },
};
