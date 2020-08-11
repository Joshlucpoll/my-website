import React from "react";
import { motion } from "framer-motion";

import { pageTransition } from "../styles/pageTransition";

// Components
import longShadow from "../components/longShadow";
import BackgroundVideo from "../assets/Retro_Stripes_Monitor_Overlay.mp4";
import BackgroundPoster from "../assets/Retro_Stripes_Monitor_Poster.png";
import "../styles/home.scss";

const pageVariants = {
  initial: window => ({
    opacity: 0.99,
    position: "fixed",
    clipPath: `circle(0px at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
  }),
  animate: window => ({
    opacity: 1,
    clipPath: `circle(${Math.max(window.innerWidth, window.innerHeight) * 4}px at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
    position: "absolute",
  }),
  exit: {
    opacity: 0.99
  }
}


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
    this.howManyTimes = this.string.length;
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
    this._isMounted = false;
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  render() {
    let xVector = this.state.xMiddle - this.state.xMouse;
    let yVector = this.state.yMiddle - this.state.yMouse;

    const longShadowStyle = longShadow(xVector, yVector);
    const scrollStyle = { top: this.props.scroll + "px" }

    return (
      <motion.div 
        className="home-body"
        onMouseMove={e => this.handleMouseMove(e)}
        onTouchMove={e => this.handleMouseMove(e)}

        style={scrollStyle}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={window}
        variants={pageVariants}
        transition={pageTransition}
        >
        <video autoPlay muted loop poster={BackgroundPoster} className="background-video">
          <source src={BackgroundVideo} type="video/mp4"/>
        </video>

        <div className="title-container">
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
