import React from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Pages
import Home from "./pages/home";
import LostPage from "./pages/404";

// Components
import Console from "./components/console";
import SocialBar from "./components/socialBar"

import "./styles/App.scss";
import "./styles/console.scss";

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xMouse: -50,
      yMouse: -50,
      xMiddle: 0,
      yMiddle: 0,
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
      xMiddle: window.innerWidth / 2,
      yMiddle: window.innerHeight / 2
    });
  }

  // For mouse move/touch events
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
  }

  render() {
    return (
      <Router>
        <div
          className="app"
          onMouseMove={e => this.handleMouseMove(e)}
          onTouchMove={e => this.handleMouseMove(e)}
        >
          <Cursor xMouse={this.state.xMouse} yMouse={this.state.yMouse}></Cursor>
          <SocialBar/>
          <Switch>
            <Route exact path="/">
              <Home 
                xMouse={this.state.xMouse} 
                yMouse={this.state.yMouse} 
                xMiddle={this.state.xMiddle} 
                yMiddle={this.state.yMiddle}
              ></Home>
            </Route>
            <Route>
              <LostPage></LostPage>
            </Route>
          </Switch>
          <Console></Console>
        </div>
      </Router>
    );
  }
}

export default App;
