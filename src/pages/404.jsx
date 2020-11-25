import React from "react";
import {Link} from "react-router-dom";

import "../styles/404.scss";
import { motion } from "framer-motion";
import { pageStyle, pageTransition } from "../styles/pageTransition";


const pageVariants = {
  initial: window => ({
    position: "fixed",
    clipPath: `circle(0px at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
  }),
  animate: window => ({
    clipPath: `circle(${Math.max(window.innerWidth, window.innerHeight)}px at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
    position: "absolute",
    transitionEnd: {
      clipPath: "none",
    }
  }),
  exit: {
    display: "fixed"
  }
}


class LostPage extends React.Component {

  componentDidMount() {
    document.title = "Josh Pollard | 🆘";
  }

  render() {
    return (
      <motion.div
        style={pageStyle}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={window}
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="lost-body">
          <p className="text-top">"I find your lack of navigation disturbing."</p>
          <p className="text-bottom">"Click me, and I'll show you the power of this website!"</p>
          <Link to="/">
            <div className="vader">
              <div className="shadow"></div>
              <div className="head">
                  <div className="helmet"><span className="left"></span><span className="right"></span></div>
                  <div className="eyes"><span className="left"></span><span className="right"></span></div><span className="grill"><span className="left"></span><span className="center"></span><span className="right"></span></span><span className="mask"><span className="top"></span><span className="left"></span><span className="center"></span><span className="right"></span></span><span className="line"></span>
              </div>
              <div className="torso"><span className="neck"><span className="left"></span><span className="center"></span><span className="right"></span><span className="bottom"></span></span><span className="belt"><span className="center"></span></span>
                  <div className="plate"><span className="red_top"></span><span className="red_center"></span><span className="red_bottom"></span><span className="blue"></span><span className="gray"></span></div>
              </div>
              <div className="hand left"><span className="hand"></span></div>
              <div className="hand right animation-right"><span className="hand"></span></div>
              <div className="legs"><span className="left"></span><span className="right"></span></div>
              <div className="boots"><span className="left"></span><span className="right"></span></div>
              <div className="sword animation-left"><span className="handle"></span><span className="light"></span></div>
            </div>
          </Link>
      </div>
      </motion.div>
    );
  }
}

export default LostPage;