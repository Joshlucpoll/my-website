import React from "react";

// Components
import LongShadow from "../components/longShadow";

import "../styles/home.scss";

class Home extends React.Component {

  render() {
    let xVector = this.props.xMiddle - this.props.xMouse;
    let yVector = this.props.yMiddle - this.props.yMouse;
    return (
      <div className="home-body">
        <div
          id="title-container"
          style={{
            top: yVector / 50,
            left: xVector / 50
          }}
        >
          <LongShadow
            id={"headline-title"}
            text={"JOSH POLLARD"}
            xVector={xVector}
            yVector={yVector}
          />
        </div>
      </div>
    );
  }
}

export default Home;
