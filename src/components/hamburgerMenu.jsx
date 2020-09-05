import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import "../styles/hamburgerMenu.scss";

const button = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
  pressed: { scale: 0.95 }
};

class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    }
  }

  toggleMenu() {
    this.setState((state) => {
      return {isMenuOpen: !state.isMenuOpen};
    });
  }

  closeMenu() {
    if (this.state.isMenuOpen === true) {
      this.setState({ isMenuOpen: false }, this.forceUpdate())
    }
  }

  openMenu() {
    if (this.state.isMenuOpen === false) {
      this.setState({ isMenuOpen: true }, this.forceUpdate())
    }
  }

  changePage(path) {
    this.closeMenu()
    this.props.changeDirectory(path);
  }
  
  handleKey(e) {
    // esc (close menu)
    if (e.keyCode === 27) {
      this.closeMenu();
    }
    // m (toggle menu)
    if (e.keyCode === 77) {
      this.toggleMenu();
    }
  }
  
  changeNav() {
    this.closeMenu()
    this.setState({ isMenuOpen: false })
    setTimeout(() => {
      this.props.changeNav("term");
    }, 300)
  }

  // Event listeners for key presses
  componentDidMount() {
    document.addEventListener("keydown", (e) => this.handleKey(e), false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", (e) => this.handleKey(e), false);
  }

  render() {
    const linesTransition = {
      type: "spring",
      stiffness: 200,
      damping: 40
    }
    return(
      <div>
        <motion.div 
          className="hamburger-container" 
          onClick={() => this.toggleMenu()}
          variants={button}
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
        >
          <motion.div className="lines-container" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }}>
            <motion.div animate={ this.state.isMenuOpen ? {y: 0, rotate: 45} : {y: "1.3vh", rotate: 180} } transition={linesTransition} className="line"/>
            <motion.div animate={ this.state.isMenuOpen ? {y: 0, rotate: -45} : {y: 0, rotate: 0} } transition={linesTransition} className="line"/>
            <motion.div animate={ this.state.isMenuOpen ? {y: 0, rotate: 45} : {y: "-1.3vh", rotate: 180} } transition={linesTransition} className="line"/> 
          </motion.div>
          <motion.div
            className="easy-mode-button"
            animate={this.state.isMenuOpen ? {y: 0, opacity: 1} : {y: "100%", opacity: 0}}
            transition={{ ease: "easeOut" }}
            style={{ originX: 1 }}
            onClick={() => this.changeNav()}
          >
            Terminal
          </motion.div>
        </motion.div>

        <motion.div
          className="backdrop-filter"
          animate={
            this.state.isMenuOpen ? {height: "100vh", opacity: 0.95} : {height: 0, opacity: 0.95}
          }
          transition={{ duration: 0.3 }}
        >
        </motion.div>
        <AnimatePresence>
          {this.state.isMenuOpen &&
          <motion.div className="nav-container" initial={{height: 0, opacity: 1}} animate={{height: "100vh", opacity: 1}} exit={{height: 0, opacity: -1}} transition={{type: "tween"}}>
            <ul className="nav">
              <li>
                <div className="link" onClick={() => this.changePage("/")}>Home</div>
              </li>
              <li>
                <div className="link" onClick={() => this.changePage("/projects")}>Projects</div>
              </li>
            </ul>
          </motion.div>
          }
        </AnimatePresence>
      </div>
    );
  }
}

export default HamburgerMenu;