import React from "react";
import "./styles/App.scss";
import Logo from "./img/JP-Logo-v1.png";

class Cursor extends React.Component {
  render() {
    const styles = {
      top: this.props.yMouse - 15,
      left: this.props.xMouse - 15
    };
    return (
      <div style={styles} className="cursor">
        <div className="cursor-light"></div>
        <div className="cursor-ring"></div>
      </div>
    );
  }
}

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      outputList: [],
      currentDirectory: "~",
      value: "",
      outputView: false
    };
    // this.closeOutput = this.closeOutput.bind(this);
  }

  commandProcessor(commandLine) {
    // Updating output array
    let newOutput = this.state.outputList;
    newOutput.unshift(commandLine);
    this.setState({outputList: newOutput});

    // Splitting command line into command + arguments
    const words = commandLine.split(" ");
    const command = words[0];
    const value = words[1];

    if (command === "cd") {
      this.setState({ currentDirectory: value });
    }
    if (command === "history") {
      
      // Needs fixing
      const newOutput = this.state.outputList;
      const history = this.state.history;

      for (let i=1; i<history.length;i++) {
        let value = history[i-1];
        value = i + " " + value;
        history[i-1] = value;
      }

      Array.prototype.push.apply(newOutput, history);
      this.setState({outputList: newOutput});
      // console.log(this.state.history);
    }
    if (command === "clear") {
      this.setState({outputList: []});
    }
  }

  handleSubmit(e) {
    this.commandProcessor(this.state.value);
    // Updating history array
    let newHistory = this.state.history;
    newHistory.push(this.state.value);

    this.setState({
      history: newHistory,
      value: ""
    });
    e.preventDefault();
  }

  openOutput() {
    this.consoleOutput.style = "opacity: 1; height: 82hv;";
    this.list.style = "opacity: 1; height: 82hv;";
  }

  closeOutput() {
    this.consoleOutput.style = "opacity: 0; height: 0;";
    this.list.style = "opacity: 0; height: 0;";
  }

  handleKey(e) {
    // esc (close output)
    if (e.keyCode === 27) {
      this.closeOutput();
      this.consoleInput.blur();
    }
    // ctrl (open output)
    if (e.keyCode === 17) {
      this.openOutput();
      this.consoleInput.focus();
    }
  }
  
  // Event listeners for keys
  componentDidMount(){
    document.addEventListener("keydown", (e) => this.handleKey(e), false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", (e) => this.handleKey(e), false);
  }

  handleClick(e) {
    this.consoleInput.focus();
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    if (this.state.outputList.length === 0) {
      this.outputItems = null;
    }
    else {
      this.outputItems = this.state.outputList.map(function(item){
        return(<li> {item} </li>);
      });
    }
    if (window.matchMedia('(max-width: 600px)').matches === false) {
      this.consoleText =
          <div className="console-text-long">
            client@joshlucpoll.com
            <span className="console-white">:</span>
            <span className="current-directory">
              {this.state.currentDirectory}
            </span>
            <span className="console-white">$</span>
          </div>
    }
    else {
      this.consoleText =
          <div className="console-text-short">></div>
    }

    return (
      <div className="console">
        <div className="console-body" onClick={e => this.handleClick(e)}>
          {this.consoleText}
          <form className="console-input" onSubmit={e => this.handleSubmit(e)}>
            <input
              ref={input => {this.consoleInput = input;}}
              type="text"
              value={this.state.value}
              onChange={e => this.handleChange(e)}
              onFocus={() => this.openOutput()}
              onBlur={() => this.closeOutput()}
            />
          </form>
        </div>
        <div
          className="console-output"
          ref={div => {this.consoleOutput = div;}}
        >
          <ol ref={list => {this.list = list;}}>
            {this.outputItems}
          </ol>
        </div>
      </div>
    );
  }
}

class LongShadow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      text: props.text
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

  render() {
    let styles = {
      textShadow: this.longShadowCalculator(this.props.angle, 300, "#202020")
    };
    return (
      <div style={styles} id={this.state.id} className="long-shadow">
        {this.state.text}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xMouse: -50,
      yMouse: -50,
      xTitle: 0,
      yTitle: 0,
      xVector: 0,
      yVector: 0,
      angle: 45
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  // For calculating window dimensions
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({
      xTitle: window.innerWidth / 2,
      yTitle: window.innerHeight / 2
    });
  }

  shadowAngleCalculator(xMouse, yMouse) {
    const xVector = this.state.xTitle - xMouse;
    const yVector = this.state.yTitle - yMouse;
    this.setState({ xVector: xVector });
    this.setState({ yVector: yVector });
    let angle = -(
      Math.round((Math.atan(yVector / xVector) - Math.PI / 2) * 50) / 50
    );

    if (xVector < 0 && yVector > 0) {
      angle += Math.PI;
    }
    if (xVector < 0 && yVector < 0) {
      angle += Math.PI;
    }

    this.setState({ angle: angle });
  }

  handleMouseMove(e) {
    let xPosition = e.clientX;
    let yPosition = e.clientY;

    if (e.type === "touchmove") {
      xPosition = e.touches[0].pageX;
      yPosition = e.touches[0].pageY;
    }

    this.setState({
      xMouse: xPosition,
      yMouse: yPosition
    });
    this.shadowAngleCalculator(xPosition, yPosition);
  }

  render() {
    return (
      <div
        className="app"
        onMouseMove={e => this.handleMouseMove(e)}
        onTouchMove={e => this.handleMouseMove(e)}
      >
        <Cursor xMouse={this.state.xMouse} yMouse={this.state.yMouse}></Cursor>
        <div className="app-body">
          <div
            id="title-container"
            style={{
              top: this.state.yVector / 50,
              left: this.state.xVector / 50
            }}
          >
            <LongShadow
              id={"headline-title"}
              text={"Josh Pollard"}
              angle={this.state.angle}
              xVector={this.state.xVector}
              yVector={this.state.yVector}
            />
          </div>
          <Console></Console>
        </div>
      </div>
    );
  }
}

export default App;