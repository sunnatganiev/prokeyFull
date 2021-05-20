const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const logic = require('./logic');

exports.createUser = catchAsync(async (req, res, next) => {
  // const following = await User.findOne({ email: req.body.following });

  const user = await User.create(req.body);

  await logic.invite(req);
  await logic.side(req);

  res.status(201).json({
    status: 'success',
    data: {
      data: user,
    },
  });
});
