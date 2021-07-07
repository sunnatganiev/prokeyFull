const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { ERRORS } = require("../utils/constants");

// const userRelation = {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "User",
// };

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Iltimos ismingizni kirgizing!"],
    trim: true,
  },
  surname: {
    type: String,
    required: [true, "Iltimos familiyangizni kirgizing!"],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: [true, "Iltimos tug'ilgan kuningizni tanlang"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Iltimos elektron pochtangizni kirgizing!"],
    lowercase: true,
    immutable: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  whoInvited: {
    type: String,
    required: [
      true,
      "Iltimos sizni taklif qilgan mijozning emailini kirgizing",
    ],
  },
  // followers: [],
  following: {
    type: String,
    required: [true, "email kirgizing"],
  },
  followingSide: {
    type: String,
    required: [true, "A user must select a side to followe"],
    enum: {
      values: ["left", "right"],
      message: "Side is either left or right",
    },
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "registrator", "watcher"],
    default: "watcher",
  },
  balance: {
    type: Number,
    default: 0,
  },
  followers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  transactions: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Transaction",
    },
  ],
  left: {
    leftSum: {
      type: Number,
      default: 0,
    },
    week: [Object],
    month: [Object],
  },
  right: {
    rightSum: {
      type: Number,
      default: 0,
    },
    week: [Object],
    month: [Object],
  },
  territory: {
    type: mongoose.Types.ObjectId,
    ref: "Territory",
  },
  status: {
    type: String,
    enum: {
      values: ["client", "partner", "master", "manager"],
      message: "status is either: client, partner, master, manager",
    },
    required: [true, "Mijozning statusini tanlang"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      // this only works on CREATE and SAVE!!!
      validator: function (val) {
        return val === this.password;
      },
      message: ERRORS.PASSWORDS_NOT_SAME,
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } }).populate("territory");
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPasaword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
