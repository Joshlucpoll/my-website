import React from "react";
import { motion } from "framer-motion";

import { pageTransition } from "../styles/pageTransition";

// Components
import longShadow from "../components/longShadow";
import "../styles/home.scss";

const pageVariants = {
  initial: (window) => ({
    position: "fixed",
    clipPath: `circle(0px at ${window.innerWidth / 2}px ${
      window.innerHeight / 2
    }px)`,
  }),
  animate: (window) => ({
    clipPath: `circle(${
      Math.max(window.innerWidth, window.innerHeight) * 4
    }px at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
    position: "absolute",
  }),
  exit: {
    display: "fixed",
  },
};

class Stars {
  constructor(c) {
    this.c = c;
    this.ctx = this.c.getContext("2d");

    this.spaceColour = "rgb(0,10,20)";
    this.numStars = window.innerWidth * 2;
    this.starSpeed = 1;
    this.radius = "0." + Math.floor(Math.random() * 9) + 1;
    this.focalLength = this.c.width * 2;
    this.centerX = this.c.width / 2;
    this.centerY = this.c.height / 2;
    this.stars = [];
    this.starPositions = [];
    this.zPositionDifference = [];

    this.warp = false;
    this.decelerating = false;
    this.unmounting = false;

    document.addEventListener(
      "mousemove",
      (e) => this.updateStarSpeed(e),
      false
    );

    this.initializeStars();
    this.executeFrame();
  }

  enableWarp() {
    if (!this.unmounting) {
      this.unmounting = true;
      if (!this.warp) {
        this.toggleWarp();
      } else {
        this.toggleWarp();
        this.toggleWarp();
      }
    }
  }

  toggleWarp() {
    if (!this.warp) {
      this.warp = !this.warp;
      this.starPositions = [];

      for (let i = 0; i < this.numStars; i++) {
        const star = this.stars[i];

        const x =
          (star.x - this.centerX) * (this.c.width / star.z) +
          this.centerX;
        const y =
          (star.y - this.centerY) * (this.c.width / star.z) +
          this.centerY;
        const z = star.z;

        this.starPositions.push({
          x: x,
          y: y,
          z: z
        });
      }
      this.increaseStarSpeed();

    } else {
      const zPositions = this.starPositions.map(star => star.z);
      const maxZPosition = zPositions.reduce((a, b) => Math.max(a, b));

      this.minIndex = Math.max.apply(Math, zPositions);
      this.zPositionDifference = zPositions.map(element => element - maxZPosition);

      this.decelerating = true;
      this.starSpeed = -40;
    }
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

  decreaseStarSpeed() {

    let inPlaceStars = 0;

    for (let i = 0; i < this.numStars; i++) {
      const star = this.stars[i];

      if (star.z >= this.starPositions[i].z) {
        star.z = this.starPositions[i].z;
        inPlaceStars++;
      }
      else {

        if (this.zPositionDifference[i] !== null) {
          const diff = this.zPositionDifference[i] - this.starSpeed;
          if (diff >= 0) {
            star.z += diff - this.starSpeed;
            this.zPositionDifference[i] = null;
          }
          else {
            this.zPositionDifference[i] = diff;
          }
        }
        else {
          star.z -= this.starSpeed;
        }
      }
    }

    const zDiff = this.starPositions[this.minIndex].z - this.stars[this.minIndex].z;
    const speed = zDiff > 40 ? -40 : -(zDiff/10 + 5);
    this.starSpeed = speed;

    if (inPlaceStars === this.numStars) {
      this.decelerating = false;
      this.warp = false;
      this.starSpeed = 1;
    }
  }

  increaseStarSpeed() {
    if (this.warp) {
      this.starSpeed = this.starSpeed * 1.4;

      if (this.starSpeed < 100) {
        setTimeout(() => this.increaseStarSpeed(), 100);
      }
    }
  }

  updateStarSpeed(e) {
    if (!this.warp) {
      const speed = Math.round(
        Math.sqrt(Math.sqrt(e.movementX ** 2 + e.movementY ** 2))
      );
      // Minimum speed is 0.1
      this.starSpeed = speed < 1 ? 1 : speed;
    }
  }

  moveStars() {
    for (let i = 0; i < this.numStars; i++) {
      const star = this.stars[i];
      star.z -= this.starSpeed;

      if (star.z <= 0) {
        if (this.warp) {
          star.z = 0.1;
        } else {
          star.z = this.c.width;
        }
      }
    }
  }

  drawStars() {
    // Resize to the screen
    if (
      this.c.width !== window.innerWidth ||
      this.c.height !== window.innerHeight
    ) {
      this.c.width = window.innerWidth;
      this.c.height = window.innerHeight;
      this.initializeStars();
    }

    this.ctx.fillStyle = this.spaceColour;
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);
    this.ctx.fillStyle = `rgba(209, 255, 255, ${this.radius})`;

    for (let i = 0; i < this.numStars; i++) {
      const star = this.stars[i];

      let pixelX = (star.x - this.centerX) * (this.c.width / star.z);
      pixelX += this.centerX;
      let pixelY = (star.y - this.centerY) * (this.c.width / star.z);
      pixelY += this.centerY;
      let pixelRadius = Math.abs(.5 * (this.focalLength / star.z * window.innerWidth / window.innerHeight));

      this.ctx.fillStyle = `rgba(209, 255, 255, ${star.o})`;

      if (this.warp) {
        this.ctx.fillStyle = `rgba(154, 206, 253, ${star.o})`;
        this.ctx.beginPath();
        this.ctx.moveTo(pixelX - pixelRadius, pixelY - pixelRadius);
        this.ctx.lineTo(pixelX + pixelRadius, pixelY + pixelRadius);
        this.ctx.lineTo(this.starPositions[i].x, this.starPositions[i].y);
        this.ctx.fill();
      }

      this.ctx.beginPath();
      this.ctx.arc(pixelX, pixelY, pixelRadius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  executeFrame() {
    if (window.location.pathname !== "/") {
      this.enableWarp()
    }

    if (this.decelerating) {
      this.decreaseStarSpeed()
    }
    else {
      this.moveStars();
    }

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
    };
    this._isMounted = false;
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.string = "<software-developer/>";
    this.i = 0;
    this.howManyTimes = this.string.length;
  }

  typeSubTitle() {
    if (this._isMounted === true) {
      this.setState({
        subTitle: this.state.subTitle + this.string.split("")[this.i],
      });
      this.i++;
      if (this.i < this.howManyTimes) {
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
      yMiddle: window.innerHeight / 2,
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
      yMouse: yPosition,
    });
  }

  warpButtonOnClick() {
    this.stars.toggleWarp();
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


    this.stars = new Stars(document.getElementById("space"));
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.stars = null;
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  render() {
    let xVector = this.state.xMiddle - this.state.xMouse;
    let yVector = this.state.yMiddle - this.state.yMouse;

    const longShadowStyle = longShadow(
      xVector,
      yVector,
      // "#" + (((1 << 24) * Math.random()) | 0).toString(16)
      "#313D53"
    );

    return (
      <motion.div
        className="home-body"
        onMouseMove={(e) => this.handleMouseMove(e)}
        onTouchMove={(e) => this.handleMouseMove(e)}
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
              damping: 25,
            }}
          >
            JOSH
            <span style={longShadowStyle} data-text=" POLLARD">
              {" "}
              POLLARD
            </span>
          </motion.div>
          <div className="sub-title">
            {this.state.subTitle}
            {this.state.cursor}
          </div>
          <motion.div
            className="warp-button"
            id="warp"
            onClick={() => this.warpButtonOnClick()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 2.5,
              duration: 2,
              type: "spring",
              stiffness: 150,
              damping: 15,
            }}
          >
            Warp
          </motion.div>
        </div>
      </motion.div>
    );
  }
}

export default Home;