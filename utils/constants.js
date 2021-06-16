const BASE_URL = "/api/v1/";

module.exports = {
  BASE_URL: BASE_URL,
  api(name) {
    return `${BASE_URL}${name}`;
  },
  ERRORS: {
    WRONG_CREDENTIALS: "WRONG_CREDENTIALS",
    DB_INSERTION_FAILED: "DB_INSERTION_FAILED",
    USER_DOES_NOT_EXIST: "USER_DOES_NOT_EXIST",
  },
};
