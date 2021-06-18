const path = require("path");
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");

const i18n = require("i18n");
const globalErrorHandler = require("./controllers/errorController");
const routes = require("./routes");
const constants = require("./utils/constants");
const { getCurrentUser } = require("./controllers/authController");

const locales = ["uz", "ru", "en"];

i18n.configure({
  locales: locales,
  defaultLocale: "uz",
  directory: path.join(__dirname, "locales"),
  retryInDefaultLocale: true,
  queryParameter: "lang",
  cookie: "language",
});

const app = express();

// 1) GLOBAL MIDDLEWARES
// Serving static files

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
// Set security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.locals = constants;

// Development loginqa
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: `Too many requests from this IP, please try again in an hour!`,
});

app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization agains XSS
app.use(xss());

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//register language
app.use(i18n.init);

// 2) ROUTES
app.use(routes.views.endpoint, routes.views.router);
app.use(routes.dashboard.endpoint, routes.dashboard.router);
app.use(routes.api.endpoint, routes.api.router);
app.use(routes.users.endpoint, routes.users.router);

app.use((req, res, next) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // as you configured 'language' as cookiename, set it to current requests locale'
  res.cookie("language", res.getLocale(), cookieOptions);
  next();
});

app.get("/setlocale/:lang", (req, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // as you configured 'language' as cookiename, set it to current requests locale'
  res.cookie("language", req.params.lang, cookieOptions);
  res.redirect("back");
});

app.all("*", async (req, res, next) => {
  if (req.path.includes("/dashboard/")) {
    const currentUser = await getCurrentUser(req, res);
    res.status(404).render("admin/error", {
      err_code: 404,
      error: "Bunday sahifa topilmadi!",
      user: currentUser,
    });
  } else {
    res.status(404).render("static/error", {
      err_code: 404,
      error: "Bunday sahifa topilmadi!",
    });
  }
});

app.use(globalErrorHandler);

module.exports = app;
