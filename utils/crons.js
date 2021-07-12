/* eslint-disable no-console */
const cron = require("node-cron");
const { checkDay, checkSalary, sendReport } = require("../controllers/logic");
const User = require("../models/userModel");
const sendEmail = require("./email");

module.exports = {
  eachWeek: () => {
    console.log("Job for every week is running...");
    return cron.schedule(
      "0 0 * * monday",
      async () => {
        await checkDay();
        await sendReport("week");
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
        await await sendReport("month");
      },
      {
        timezone: "Asia/Tashkent",
        scheduled: false,
      }
    );
  },
};
