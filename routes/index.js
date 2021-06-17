const userRouter = require("./userRoutes");
const viewRouter = require("./viewRoutes");
const dashboardRouter = require("./dashboardRoutes");
const api = require("../utils/constants").api;

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
};
