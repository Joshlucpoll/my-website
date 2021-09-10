import React from "react"

import { motion, AnimatePresence } from "framer-motion";

import Github from "../assets/social_icons/github.svg";
import Twitter from "../assets/social_icons/twitter.svg";
import StackOverflow from "../assets/social_icons/stackoverflow.svg";
import CodeSandbox from "../assets/social_icons/codesandbox.svg";
import CodePen from "../assets/social_icons/codepen.svg";
import LinkedIn from "../assets/social_icons/linkedin.svg"
import Email from "../assets/social_icons/gmail.svg";

import "../styles/socialBar.scss";

class SocialBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      width: window.innerWidth,
    }
  }

  switchBar() {
    this.setState(prevState => {
      return { isOpen: !prevState.isOpen }
    });
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.setState({ width: window.innerWidth }));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.setState({ width: window.innerWidth }));
  }

  render() {
    if (this.state.width > 600) {
      return(
        <motion.div 
          className="social-bar-container"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            delay: 2, 
            duration: 1,
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
        > 
          <a href="https://github.com/joshlucpoll" target="_blank" rel="noopener noreferrer">
            <div className="github" title="Github">
              <img className="invert" src={Github} alt="Github"/>
            </div>
          </a>
          <a href="https://twitter.com/Joshlucpoll" target="_blank" rel="noopener noreferrer">
            <div className="twitter" title="Twitter">
              <img className="invert" src={Twitter} alt="Twitter"/>
            </div>
          </a>
          <a href="https://stackoverflow.com/users/10472451/joshlucpoll" target="_blank" rel="noopener noreferrer">
            <div className="stackoverflow" title="Stack Overflow">
              <img className="invert" src={StackOverflow} alt="StackOverflow"/>
            </div>
          </a>
          <a href="https://codesandbox.io/u/joshlucpoll" target="_blank" rel="noopener noreferrer">
            <div className="codesandbox" title="Code Sandbox">
              <img src={CodeSandbox} alt="CodeSandbox"/>
            </div>
          </a>
          <a href="https://codepen.io/Joshlucpoll" target="_blank" rel="noopener noreferrer">
            <div className="codepen" title="Code Pen">
              <img src={CodePen} alt="CodePen"/>
            </div>
          </a>
          <a href="https://www.linkedin.com/in/joshlucpoll" target="_blank" rel="noopener noreferrer">
            <div className="linkedin" title="Linked In">
              <img className="invert" src={LinkedIn} alt="LinkedIn"/>
            </div>
          </a>
          <a href="mailto:hello@joshlucpoll.com" target="_blank" rel="noopener noreferrer">
            <div className="email" title="Email">
              <img className="invert" src={Email} alt="Email"/>
            </div>
          </a>
        </motion.div>
      );
    }
    else {
      return (
        <motion.div
          className="social-bar-container"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            delay: 2, 
            duration: 1,
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
        >
          <AnimatePresence>
            {this.state.isOpen &&
              <motion.div 
                className="icons-container"
                initial={{ width: 0, opacity: -1 }}
                animate={{ width: "30vh", opacity: 1 }}
                exit={{ width: 0, opacity: -1 }}
                transition={{ 
                  duration: 0.2,
                  type: "tween",
                }}
              > 
                <a href="https://github.com/joshlucpoll" target="_blank" rel="noopener noreferrer">
                  <div className="github">
                    <img className="invert" src={Github} alt="Github"/>
                  </div>
                </a>
                <a href="https://twitter.com/Joshlucpoll" target="_blank" rel="noopener noreferrer">
                  <div className="twitter">
                    <img className="invert" src={Twitter} alt="Twitter"/>
                  </div>
                </a>
                <a href="https://stackoverflow.com/users/10472451/joshlucpoll" target="_blank" rel="noopener noreferrer">
                  <div className="stackoverflow">
                    <img className="invert" src={StackOverflow} alt="StackOverflow"/>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/joshlucpoll" target="_blank" rel="noopener noreferrer">
                  <div className="linkedin">
                    <img className="invert" src={LinkedIn} alt="LinkedIn"/>
                  </div>
                </a>
                <a href="mailto:hello@joshlucpoll.com" target="_blank" rel="noopener noreferrer">
                  <div className="email">
                    <img className="invert" src={Email} alt="Email"/>
                  </div>
                </a>
              </motion.div>
            }
          </AnimatePresence>
            
          <motion.svg 
            className="share-button"
            onClick={() => this.switchBar()}
            style={{ originX: 0 }}
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="4vh"
            height="4vh"
          >
            <motion.path opacity={this.state.isOpen ? "0" : "1"} d="M18 2A3 3 0 1 0 18 8 3 3 0 1 0 18 2zM18 16A3 3 0 1 0 18 22 3 3 0 1 0 18 16zM6 9A3 3 0 1 0 6 15 3 3 0 1 0 6 9z" />
            <path fill="none" stroke="#fff" strokeMiterlimit="10" strokeWidth="2" d="M18 19L6 12 18 5"/>
          </motion.svg>
        </motion.div>
      );
    }
  }
}

export default SocialBar;