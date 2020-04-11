import React from "react";

class LongShadow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      text: props.text,
    };
  }

  longShadowCalculator(direction, length, color) {
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

  shadowAngleCalculator(xVector, yVector) {
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
  
  render() {
    let angle = this.shadowAngleCalculator(this.props.xVector, this.props.yVector);
    let styles = {
      textShadow: this.longShadowCalculator(angle, 300, "#202020"),
    };
    return (
      <div style={styles} id={this.state.id} className="long-shadow">
        {this.state.text}
      </div>
    );
  }
}

export default LongShadow;
