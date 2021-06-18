const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const { sum } = require("./utilities");

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

exports.side = async (req, following) => {
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
  return await following.save({ validateBeforeSave: false });
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
  await user.save({ validateBeforeSave: false });
});

exports.checkSalary = catchAsync(async () => {
  const users = await User.find();

  users.forEach((user) => {
    if (user.status === "partner") salary(user, 100000);
    if (user.status === "master") salary(user, 200000);
    if (user.status === "manager") salary(user, 400000);

    console.log({
      name: user.name,
      hands: {
        left: user.left.month,
        right: user.right.month,
      },
    });
  });
});
