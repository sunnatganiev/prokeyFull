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
      ? Object.values(error.errors)[0].properties.message
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
};
