/* eslint-disable no-console */
const mongoose = require("mongoose");

const dotenv = require("dotenv");

const { eachWeek, eachMonth } = require("./utils/crons");

process.on("uncaughtException", (err) => {
  console.log("UNHALDED EXCEPTION! 💥 Shutting down...");
  console.log(err);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!");
    eachWeek().start();
    eachMonth().start();
  });

const app = require("./app");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  if (new Date().getTimezoneOffset() / 60 !== -5) {
    console.error(
      new Error(
        `TIMEZONE MUST BE Asia/Tashkent (JS timezone offset must be -300), current timezone offset from JS DATE is ${new Date().getTimezoneOffset()}`
      )
    );
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
