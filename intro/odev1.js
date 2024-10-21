const arguments = process.argv.slice(2);
const radius = Number(arguments[0]);

function calculateCircleArea(radius) {
  const pi = Math.PI;
  const conclusion = pi * radius * radius;
  console.log(`Yarıçapı ${radius} olan dairenin alanı: ${conclusion}`);
}

calculateCircleArea(radius);
