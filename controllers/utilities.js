exports.sum = (side, sum = 0) => {
  side.forEach((user) => {
    Object.values(user).forEach((u) => {
      if (typeof u === 'number') {
        sum += u;
      }
    });
  });
  return sum;
};
