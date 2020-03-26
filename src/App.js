import React from 'react';
import './styles/App.scss';
import Logo from './img/JP-Logo-v1.png';


class LongShadow extends React.Component {
  
  static getDerivedStateFromProps(props, state) {
    if (props.angle !== state.angle) {
      return { angle: props.angle };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      text: props.text,
      angle: props.angle,
    };
  }
  
  longShadowCalculator(direction, length, color) {
    let shadows = "";
    let i;
    for(i=1; i<length; i++) {
      let xLength = Math.round(Math.sin(direction)*100)/100; 
      let yLength = Math.round(Math.cos(direction)*100)/100;
  
      shadows = (shadows + xLength*i + "px " + yLength*i + "px " + color + ", ");
    }
    shadows = shadows.slice(0,-2);
    return shadows;
  }
  
  render() {
    let styles = {
      textShadow: this.longShadowCalculator(this.state.angle, 300, "#202020"),
    }
    return (
      <div style={styles} id={this.state.id} className="long-shadow">{this.state.text}</div>
      );
    }
  }

  
  class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      xMouse: 0,
      yMouse: 0,
      xTitle: 0,
      yTitle: 0,
      xVector: 0,
      yVector: 0,
      angle: 45,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  // For calculating window dimensions
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ xTitle: (window.innerWidth/2), yTitle: (window.innerHeight/2) });
  }

  shadowShapeCalculator() {
    this.setState({xVector: this.state.xTitle - this.state.xMouse});
    this.setState({yVector: this.state.yTitle - this.state.yMouse});
    let angle = Math.round((Math.atan(this.state.yVector/this.state.xVector) - Math.PI / 2)*50)/50;

    if (this.state.xVector < 0 && this.state.yVector > 0) {
      angle += Math.PI;
    }
    if (this.state.xVector < 0 && this.state.yVector < 0) {
      angle += Math.PI;
    }

    this.setState({angle: -angle});
  }

  handleMouseMove(e) {
    let xPosition = e.clientX;
    let yPosition = e.clientY;
    
    if (e.type === 'touchmove') {
      xPosition = e.touches[0].pageX;
      yPosition = e.touches[0].pageY;
    };

    this.setState( {
      xMouse: xPosition, 
      yMouse: yPosition
    });
    this.shadowShapeCalculator()
  }

  render() {
    return (
      <div className="app" onMouseMove={this.handleMouseMove.bind(this)} onTouchMove={this.handleMouseMove.bind(this)}>
          <header className="app-header">
            {/* <i class="fas fa-ellipsis-h fa-3x menu-icon"></i>
            <img scr={Logo} alt="Logo"/> */}
          </header>
          <div className="app-body">
            <div id="title-container" style={{top: this.state.yVector/50, left: this.state.xVector/50}}>
              <LongShadow id={"headline-title"} text={"Josh Pollard"} angle={this.state.angle} xVector={this.state.xVector} yVector={this.state.yVector}/>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
