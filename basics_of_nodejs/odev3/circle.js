function circleArea(r) {
  const pi = Math.PI;
  return pi * Math.pow(r, 2);
}

function circleCircumference(r) {
  const pi = Math.PI;
  return 2 * pi * r;
}

module.exports = {
  circleArea,
  circleCircumference,
};
