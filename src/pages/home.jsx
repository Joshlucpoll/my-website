import React from "react";
import { motion } from "framer-motion";

import { pageTransition } from "../styles/pageTransition";

// Components
import longShadow from "../components/longShadow";
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
    opacity: 0.99,
    display: "fixed",
  }
}

class Stars {
  constructor(c) {
    this.c = c;
    this.ctx = this.c.getContext("2d");

    this.spaceColour = "rgb(0,10,20)";
    this.numStars = window.innerWidth;
    this.starSpeed = 0.5;
    this.radius = "0." + Math.floor(Math.random() * 9) + 1;
    this.focalLength = this.c.width * 2;
    this.centerX = this.c.width/2;
    this.centerY = this.c.height/2;
    this.stars = [];

    document.addEventListener("mousemove", (e) => this.updateStarSpeed(e), false);

    this.initializeStars();
    this.executeFrame();

  }

  initializeStars() {
    this.centerX = this.c.width / 2;
    this.centerY = this.c.height / 2;
  
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      const star = {
        x: Math.random() * this.c.width,
        y: Math.random() * this.c.height,
        z: Math.random() * this.c.width,
        o: "0." + Math.floor(Math.random() * 99) + 1,
      };
      this.stars.push(star);
    }
  }

  updateStarSpeed(e) {
    const speed = Math.round(Math.sqrt(Math.sqrt(e.movementX**2 + e.movementY**2)));
    
    // Minimum speed is 0.1
    this.starSpeed = speed < 0.1 ?  0.1 : speed;
  }

  moveStars() {
    for (let i = 0; i < this.numStars; i++) {
      const star = this.stars[i];
      star.z -= this.starSpeed;
  
      if (star.z <= 0) {
        star.z = this.c.width;
      }
    }
  }

  drawStars() {
    // Resize to the screen
    if (this.c.width !== window.innerWidth || this.c.height !== window.innerHeight) {
      this.c.width = window.innerWidth;
      this.c.height = window.innerHeight;
      this.initializeStars();
    }
    this.ctx.fillStyle = this.spaceColour;
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
    this.ctx.fillStyle = `rgba(209, 255, 255, ${this.radius})`;
    for (let i = 0; i < this.numStars; i++) {
      const star = this.stars[i];
  
      let pixelX = (star.x - this.centerX) * (this.focalLength / star.z);
      pixelX += this.centerX;
      let pixelY = (star.y - this.centerY) * (this.focalLength / star.z);
      pixelY += this.centerY;
      let pixelRadius = 1 * (this.focalLength / star.z);
  
      this.ctx.beginPath()
      this.ctx.arc(pixelX, pixelY, pixelRadius, 0, Math.PI * 2)
      this.ctx.fillStyle = `rgba(209, 255, 255, ${star.o})`;
      this.ctx.fill();
    }
  }

  executeFrame() {
    this.moveStars();
    this.drawStars();
    setTimeout(() => {
      this.executeFrame();
    }, 17);
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

    this.scrollStyle = { top: this.props.scroll + "px" };
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
      this.scrollStyle = {};
    }, 1500);

    setTimeout(() => {
      this.subTitleCursor();
    }, 2500);

    setTimeout(() => {
      this.typeSubTitle();
    }, 4000);

    new Stars(document.getElementById("space"));
  }
  
  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  render() {
    let xVector = this.state.xMiddle - this.state.xMouse;
    let yVector = this.state.yMiddle - this.state.yMouse;

    const longShadowStyle = longShadow(xVector, yVector, ("#"+((1<<24)*Math.random()|0).toString(16)));

    return (
      <motion.div 
        className="home-body"
        onMouseMove={e => this.handleMouseMove(e)}
        onTouchMove={e => this.handleMouseMove(e)}

        style={this.scrollStyle}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={window}
        variants={pageVariants}
        transition={pageTransition}
        >
        <canvas id="space"></canvas>

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
