const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const { sum } = require("./utilities");
const Territory = require("../models/territoryModel");
const Transaction = require("../models/transactionModel");
const sendEmail = require("../utils/email");

exports.invite = async (req, invited) => {
  let ballInvite = invited.balance;

  switch (req.body.status) {
    case "client":
      ballInvite += 75;
      break;
    case "partner":
      ballInvite += 150;

      break;
    case "master":
      ballInvite += 300;
      break;
    case "manager":
      ballInvite += 600;
      break;
    default:
      break;
  }
  invited.balance = ballInvite;
  return await invited.save({ validateBeforeSave: false });
};

exports.side = async (req, following, user) => {
  let ball = 0;

  switch (req.body.status) {
    case "client":
      ball = 650;
      break;
    case "partner":
      ball = 1300;
      break;
    case "master":
      ball = 2300;
      break;
    case "manager":
      ball = 4300;
      break;
    default:
      break;
  }

  if (req.body.followingSide === "left") {
    Object.values(following.left).forEach(async (arr) => {
      if (typeof arr !== "number" && arr !== true) {
        arr.push({
          email: req.body.email,
          name: req.body.name,
          surname: req.body.surname,
          status: req.body.status,
          side: req.body.followingSide,
          ball,
          photo: req.body.photo,
        });
      }
    });
  }

  if (req.body.followingSide === "right") {
    Object.values(following.right).forEach(async (arr) => {
      if (typeof arr !== "number" && arr !== true) {
        arr.push({
          email: req.body.email,
          name: req.body.name,
          surname: req.body.surname,
          status: req.body.status,
          side: req.body.followingSide,
          ball,
          photo: req.body.photo,
        });
      }
    });
  }

  following.followers.push(user._id);

  return await following.save({ validateBeforeSave: false });
};

exports.transfer = async (from, to, transactionObj) => {
  const amount = parseInt(transactionObj.amount, 10);
  from.balance -= amount;
  to.balance += amount;
  const transaction = await Transaction.create({
    from: from._id,
    to: to._id,
    comment: transactionObj.comment,
    amount,
  });
  from.transactions.push(transaction._id);
  to.transactions.push(transaction._id);
  await from.save({ validateBeforeSave: false });
  await to.save({ validateBeforeSave: false });
  return transaction;
};

const binar = catchAsync(async (user, limit) => {
  let leftSumUpdated;
  let rightSumUpdated;

  if (user.left.week.length !== 0 && user.right.week.length !== 0) {
    const leftBall = user.left.leftSum;
    const rightBall = user.right.rightSum;

    leftSumUpdated = sum(user.left.week, leftBall);
    rightSumUpdated = sum(user.right.week, rightBall);

    if (leftSumUpdated >= rightSumUpdated) {
      leftSumUpdated -= rightSumUpdated;
      user.left.leftSum = leftBall + leftSumUpdated;

      if (rightSumUpdated <= limit) {
        user.balance += rightSumUpdated * 0.1;
      } else if (rightSumUpdated > limit) {
        user.balance += limit * 0.1;
      }
    }

    if (rightSumUpdated > leftSumUpdated) {
      rightSumUpdated -= leftSumUpdated;
      user.right.rightSum = rightBall + rightSumUpdated;
      if (leftSumUpdated <= limit) {
        user.balance += leftSumUpdated * 0.1;
      } else {
        user.balance += limit * 0.1;
      }
    }
    // eslint-disable-next-line no-multi-assign
    user.left.week = user.right.week = [];

    await user.save({ validateBeforeSave: false });
  }
});

exports.checkDay = catchAsync(async () => {
  const users = await User.find();

  users.forEach((user) => {
    if (user.status === "client") binar(user, 2000);
    if (user.status === "partner") binar(user, 40000);
    if (user.status === "master") binar(user, 80000);
    if (user.status === "manager") binar(user, 150000);
  });
});

const salary = catchAsync(async (user, limit) => {
  const leftSum = sum(user.left.month);
  const rightSum = sum(user.right.month);

  if (
    (leftSum >= rightSum && rightSum >= 10000) ||
    (rightSum >= leftSum && leftSum >= 10000)
  ) {
    const all = leftSum + rightSum;
    if (all <= limit) {
      user.balance += all * 0.05;
    }
    if (all > limit) {
      user.balance += limit * 0.05;
    }
  }
  // eslint-disable-next-line no-multi-assign
  user.left.month = user.right.month = [];
  try {
    await user.save({ validateBeforeSave: false });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
});

exports.checkSalary = catchAsync(async () => {
  const users = await User.find();

  users.forEach((user) => {
    if (user.status === "partner") salary(user, 100000);
    if (user.status === "master") salary(user, 200000);
    if (user.status === "manager") salary(user, 400000);

    // console.log({
    //   name: user.name,
    //   hands: {
    //     left: user.left.month,
    //     right: user.right.month,
    //   },
    // });
  });
});

exports.assignToTerritory = async (territoryId, user) => {
  const territory = await Territory.findById(territoryId);
  if (user.role === "registrator" && !territory?.registrator) {
    // await Territory.findOneAndUpdate(
    //   { registrator: user._id },
    //   { registrator: null }
    // );
    return await Territory.findByIdAndUpdate(territoryId, {
      registrator: user._id,
    });
  }
  return null;
};

exports.sendReport = async (type = "week") => {
  let days = 7;
  let keyStrings = ["Haftalik", "hafta"];

  if (type === "month") {
    days = 30;
    keyStrings = ["Oylik", "oy"];
  }

  const usersCount = await User.countDocuments({
    createdAt: {
      $gte: new Date(Date.now() - days * 60 * 60 * 24 * 1000),
    },
  });
  await sendEmail({
    email: "progresskeyuz@gmail.com",
    subject: `${keyStrings[0]} hisobot`,
    message: `${keyStrings[0]} ballar hisoblandi, Ushbu ${keyStrings[1]} umumiy ${usersCount} foydalanuvchi qo'shildi!`,
  });
};
