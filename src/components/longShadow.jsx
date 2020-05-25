
function longShadowCalculator(direction, length, color) {
  let shadows = "";
  let i;
  for (i = 1; i < length; i++) {
    let xLength = Math.round(Math.sin(direction) * 100) / 100;
    let yLength = Math.round(Math.cos(direction) * 100) / 100;

    shadows =
      shadows + xLength * i + "px " + yLength * i + "px " + color + ", ";
  }
  shadows = shadows.slice(0, -2);
  return shadows;
}

function shadowAngleCalculator(xVector, yVector) {
  let angle = -(
    Math.round((Math.atan(yVector / xVector) - Math.PI / 2) * 50) / 50
  );

  if (xVector < 0 && yVector > 0) {
    angle += Math.PI;
  }
  if (xVector < 0 && yVector < 0) {
    angle += Math.PI;
  }
  return angle;
}

function longShadow(xVector, yVector, colour="#000000") {
  let angle = shadowAngleCalculator(xVector, yVector);
  let styles = {
    textShadow: longShadowCalculator(angle, 8, colour)
  }
  return styles
}



export default longShadow;