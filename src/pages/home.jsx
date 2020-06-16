import React from "react";
import {isBrowser} from "react-device-detect";
import { motion } from "framer-motion";

import { pageStyle, pageTransition, pageVariants } from "../styles/pageTransition";

// Components
import longShadow from "../components/longShadow";
import BackgroundVideo from "../assets/Retro_Stripes_Monitor_Overlay.mp4";
import Emoji from "../components/emoji";
import "../styles/home.scss";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subTitle: "",
      cursor: "",
      xMouse: -50,
      yMouse: -50,
      xMiddle: 0,
      yMiddle: 0,
    }
    this._isMounted = false;
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.string = "<software-developer/>";
    this.i = 0
    this.howManyTimes = 21;
  }
  
  typeSubTitle() {
    if (this._isMounted === true) {
      
      this.setState({
        subTitle: this.state.subTitle + this.string.split("")[this.i] 
      })
      this.i++;
      if( this.i < this.howManyTimes ){
        setTimeout(() => {
          this.typeSubTitle();
        }, 100);
      }
    }
  }

  subTitleCursor() {
    if (this._isMounted === true) {
      
      if (this.state.cursor === " ") {
        this.setState({
          cursor: "|",
        });
      } else {
        this.setState({
          cursor: " ",
        });
      }
      setTimeout(() => {
        this.subTitleCursor();
      }, 530);
    }
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

  componentDidMount() {
    document.getElementsByTagName("body")[0].classList.add("body-style-home");

    this._isMounted = true;
    document.title = "Josh Pollard | 🏠";
    
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);

    setTimeout(() => {
      this.subTitleCursor();
    }, 2500);

    setTimeout(() => {
      this.typeSubTitle();
    }, 4000);
  }
  
  componentWillUnmount() {
    document.getElementsByTagName("body")[0].classList.remove("body-style-home");

    this._isMounted = false;
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  render() {
    let xVector = this.state.xMiddle - this.state.xMouse;
    let yVector = this.state.yMiddle - this.state.yMouse;
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

    const longShadowStyle = longShadow(xVector, yVector);

    return (
      <motion.div 
        className="home-body"
        onMouseMove={e => this.handleMouseMove(e)}
        onTouchMove={e => this.handleMouseMove(e)}

        style={pageStyle}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        >
        <video autoPlay muted loop className="background-video">
          <source src={BackgroundVideo} type="video/mp4"/>
        </video>

        <div
          className="title-container"
          style={styles}
        >
          <motion.div 
            className="intro-title"
            initial={{ opacity: 0, y: -100 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1.5, duration: 0.5 }} 
          ><span className="hi-title">Hi,</span><Emoji emoji="👋" class="wave-emoji" label="wave"/> my name is</motion.div>
          <motion.div 
            className="headline-title"
            style={longShadowStyle} 
            data-text="JOSH" 
            initial={{ scale: 0, rotate: 180 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ 
              delay: 2.5, 
              duration: 1,
              type: "spring",
              stiffness: 260,
              damping: 25
            }}
            >JOSH
            <span style={longShadowStyle} data-text=" POLLARD"> POLLARD</span>
          </motion.div>
          <div className="sub-title">{this.state.subTitle}{this.state.cursor}</div>
        </div>
      </motion.div>
    );
  }
}

export default Home;
