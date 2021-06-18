const userRouter = require("./userRoutes");
const viewRouter = require("./viewRoutes");
const dashboardRouter = require("./dashboardRoutes");
const apiRouter = require("./apiRoutes");
const api = require("../utils/constants").api;
const { BASE_URL } = require("../utils/constants");

console.log(api("user"));

module.exports = {
  users: {
    endpoint: api("users"),
    router: userRouter,
  },
  views: {
    endpoint: "/",
    router: viewRouter,
  },
  dashboard: {
    endpoint: "/dashboard",
    router: dashboardRouter,
  },
  api: {
    endpoint: BASE_URL,
    router: apiRouter,
  },
};
