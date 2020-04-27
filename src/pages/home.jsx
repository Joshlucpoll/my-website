import React from "react";
import {isBrowser} from "react-device-detect";
import styled, {keyframes} from "styled-components";
import {fadeInDownBig} from "react-animations";

// Components
import LongShadow from "../components/longShadow";

import BackgroundVideo from "../assets/Retro_Stripes_Monitor_Overlay.mp4"
import "../styles/home.scss";

const FadeIn = styled.div`animation: 2s ${keyframes`${fadeInDownBig}`}`;
const string = "<software-developer/>";
let i = 0, howManyTimes = 21;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subTitle: "",
      cursor: "",
    }
  }
  
  typeSubTitle() {
    this.setState((state) => ({
      subTitle: state.subTitle + string.split("")[i] 
    }));
    i++;
    if( i < howManyTimes ){
      setTimeout(() => {
        this.typeSubTitle();
      }, 100);

    }
  }

  subTitleCursor() {
    if (this.state.cursor === "") {
      this.setState({
        cursor: "|",
      });
    } else {
      this.setState({
        cursor: "",
      });
    }
    setTimeout(() => {
      this.subTitleCursor();
    }, 530);
  }

  componentDidMount() {
    document.title = "Josh Pollard | Home";

    setTimeout(() => {
      this.subTitleCursor();
    }, 2000);

    setTimeout(() => {
      this.typeSubTitle();
    }, 4000);
  }

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
        <video autoPlay muted loop className="background-video">
          <source src={BackgroundVideo} type="video/mp4"/>
        </video>

        <FadeIn><div
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
          <div className="sub-title">{this.state.subTitle}{this.state.cursor}</div>
        </div></FadeIn>
      </div>
    );
  }
}

export default Home;
