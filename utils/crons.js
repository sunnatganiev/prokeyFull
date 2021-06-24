/* eslint-disable no-console */
const cron = require("node-cron");
const { checkDay, checkSalary } = require("../controllers/logic");

module.exports = {
  eachWeek: () => {
    console.log("Job for every week is running...");
    return cron.schedule(
      "0 0 * * monday",
      async () => {
        await checkDay();
      },
      {
        timezone: "Asia/Tashkent",
        scheduled: false,
      }
    );
  },
  eachMonth: () => {
    console.log("Job for every month is running...");
    return cron.schedule(
      "0 0 1 * *",
      async () => {
        await checkSalary();
      },
      {
        timezone: "Asia/Tashkent",
        scheduled: false,
      }
    );
  },
};
