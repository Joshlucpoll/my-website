import React from "react";

class LongShadow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      textOne: props.textOne,
      textTwo: props.textTwo,
      color: "#000000",
    };
    this.getRandomColor = this.getRandomColor.bind(this);
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

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  setColor() {
    this.setState({
      color: this.getRandomColor(),
    });
    setTimeout(() => this.setColor(), 1000);
  }
  
  componentDidMount() {
    this.setColor()
  }
  
  render() {
    let angle = this.shadowAngleCalculator(this.props.xVector, this.props.yVector);
    let styles = {
      textShadow: this.longShadowCalculator(angle, 8, this.state.color),
    };
    return (
      <div style={styles} id="headline-title" className="long-shadow">
        {this.state.textOne}
        <span style={styles} className="long-shadow"> {this.state.textTwo}</span>
      </div>
    );
  }
}

export default LongShadow;
