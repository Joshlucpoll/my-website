import React from "react";
import {isBrowser} from "react-device-detect";

// Components
import LongShadow from "../components/longShadow";

import "../styles/home.scss";

class Home extends React.Component {

  render() {
    let xVector = this.props.xMiddle - this.props.xMouse;
    let yVector = this.props.yMiddle - this.props.yMouse;
    let styles

    if (isBrowser) {
      styles = {
        top: yVector / 50,
        left: xVector / 50
      }
    }
    else {
      styles = {}
    }
    return (
      <div className="home-body">
        <div
          id="title-container"
          style={styles}
        >
          <LongShadow
            id={"headline-title"}
            textOne={"JOSH"}
            textTwo={"POLLARD"}
            xVector={xVector}
            yVector={yVector}
          />
        </div>
      </div>
    );
  }
}

export default Home;
