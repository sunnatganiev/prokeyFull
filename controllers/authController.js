const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");
const viewsController = require("./viewsController");
const { ERRORS } = require("../utils/constants");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_END === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  // res.status(statusCode).json({
  //   status: "success",
  //   token,
  //   data: {
  //     user,
  //   },
  // });
  // res.status(statusCode).render("static/login", {
  //   user: user,
  // });
  res.redirect("/dashboard");
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPasaword(password, user.password))) {
    // return next(new AppError("Incorrect email or password", 401));
    res.locals.message = {
      type: "danger",
      content: ERRORS.WRONG_CREDENTIALS,
    };

    return viewsController.login(req, res);
  }

  // 3) If everything ok, send token to client

  // const day = new Date();
  // const dayOfTheWeek = day.getDay();
  // const date = day.getDate();
  // if (dayOfTheWeek === 2)
  // }

  createSendToken(user, 200, res);
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) Verification token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;

      return next();
    } catch (error) {
      return next();
    }
  }
  next();
};

exports.getCurrentUser = async (req, res, populations = ["followers"]) => {
  if (req.cookies.jwt) {
    try {
      // 1) Verification token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id).populate(
        populations.join(" ")
      );
      if (!currentUser) {
        return null;
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return null;
      }

      // THERE IS A LOGGED IN USER
      return currentUser;
    } catch (error) {
      return null;
    }
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  // res.status(200).json({ status: "success" });
  res.redirect("/login");
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Pleaes log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belongign to this token does no longer exist", 401)
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.allowTo = (...roles) => (req, res, next) => {
  // roles ['admin', 'registrator']. role='user'
  if (!roles.includes(req.user.role)) {
    // return next(
    //   new AppError("You do not have permission to perfomr this action", 403)
    // );
    return res.status(403).render("admin/error", {
      err_code: 403,
      error: res.__(ERRORS.PERMISSION_DENIED),
    });
  }
  next();
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.locals.message = {
      type: "danger",
      content: ERRORS.USER_DOES_NOT_EXIST,
    };

    return viewsController.login(req, res);
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/reset-password/${resetToken}`;

  const message = `Forgot your password? Follow the link below: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10min)",
      message,
    });

    res.locals.message = {
      type: "success",
      content: ERRORS.EMAIL_IS_SENT,
    };

    return viewsController.login(req, res);
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError(error), 500);
  }
});

exports.resetPasswordView = async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    res.locals.message = {
      type: "danger",
      content: ERRORS.INVALID_TOKEN,
    };
  }
  return res.status(200).render("static/reset-password", {
    title: res.__("resetPassword"),
    token: req.params.token,
  });
};

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (req.body.password !== req.body.passwordConfirm) {
    res.locals.message = {
      type: "danger",
      content: ERRORS.PASSWORDS_NOT_SAME,
    };
    return res.status(400).render("static/reset-password", {
      title: res.__("resetPassword"),
    });
  }

  if (req.body.password.length < 8) {
    res.locals.message = {
      type: "danger",
      content: ERRORS.PASSWORD_MUST_CONTAIN_8_CHARS,
    };
    return res.status(400).render("static/reset-password", {
      title: res.__("resetPassword"),
    });
  }
  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    res.locals.message = {
      type: "danger",
      content: ERRORS.INVALID_TOKEN,
    };
    return res.status(400).render("static/reset-password", {
      title: res.__("resetPassword"),
    });
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save({ validateBeforeSave: false });

  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  if (req.body.newPassword?.length < 8) {
    return res.status(401).render("admin/error", {
      err_code: 401,
      error: res.__(ERRORS.PASSWORD_MUST_CONTAIN_8_CHARS),
      user: user,
    });
  }

  // 2) Check if POSTed current password is correct\
  try {
    if (!(await user.correctPasaword(req.body.password, user.password))) {
      return res.status(401).render("admin/error", {
        err_code: 401,
        error: res.__(ERRORS.INCORRECT_PASSWORD),
        user: user,
      });
    }
  } catch (error) {
    return res.status(401).render("admin/error", {
      err_code: 401,
      error: res.__(ERRORS.INCORRECT_PASSWORD),
      user: user,
    });
  }

  // 3) If so, update password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPassword;
  await user.save({ validateBeforeSave: false });

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
