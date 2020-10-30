import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import "../styles/hamburgerMenu.scss";

const list = {
  hidden: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
  visible: {
    transition: {
      delay: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const linesTransition = {
  type: "spring",
  stiffness: 200,
  damping: 40,
};

class HamburgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  toggleMenu() {
    if (this.state.isMenuOpen === false) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }
  
  closeMenu() {
    if (this.state.isMenuOpen === true) {
      document.body.classList.remove("body-noscroll");
      this.setState({ isMenuOpen: false }, this.forceUpdate());
    }
  }
  
  openMenu() {
    if (this.state.isMenuOpen === false) {
      document.body.classList.add("body-noscroll");
      this.setState({ isMenuOpen: true }, this.forceUpdate());
    }
  }

  changePage(path) {
    this.closeMenu();
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
    this.closeMenu();
    this.setState({ isMenuOpen: false });
    setTimeout(() => {
      this.props.changeNav("term");
    }, 300);
  }
  
  // Event listeners for key presses
  componentDidMount() {
    document.addEventListener("keydown", (e) => this.handleKey(e), false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", (e) => this.handleKey(e), false);
  }

  render() {
    return (
      <div>
        <motion.div
          className="hamburger-container"
          onClick={() => this.toggleMenu()}
          style={
            window.innerWidth > document.documentElement.clientWidth
            ? { marginRight: "calc(2vh - 10px)"}
            : {marginRight: "2vh"}
          }
        >
          <motion.div
            className="lines-container"
          >
            <motion.div
              animate={
                this.state.isMenuOpen
                  ? { y: 0, rotate: -135 }
                  : { y: `${window.innerHeight * 0.012}px`, rotate: 0 }
              }
              transition={linesTransition}
              className="line"
            />
            <motion.div
              animate={
                this.state.isMenuOpen
                  ? { y: 0, rotate: 135 }
                  : { y: 0, rotate: 0 }
              }
              transition={linesTransition}
              className="line"
            />
            <motion.div
              animate={
                this.state.isMenuOpen
                  ? { y: 0, rotate: -135 }
                  : { y: `-${window.innerHeight * 0.012}px`, rotate: 0 }
              }
              transition={linesTransition}
              className="line"
            />
          </motion.div>
          <motion.div
            className="easy-mode-button no-select"
            animate={
              this.state.isMenuOpen
                ? { y: 0, opacity: 1 }
                : { y: "100%", opacity: 0 }
            }
            transition={{ ease: "easeOut" }}
            style={{ originX: 1 }}
            onClick={() => this.changeNav()}
          >
            Terminal
          </motion.div>
        </motion.div>

        <motion.div
          className="backdrop-filter"
          onClick={() => this.closeMenu()}
          animate={
            this.state.isMenuOpen
              ? { opacity: 0.95, pointerEvents: "all" }
              : { opacity: 0, pointerEvents: "none" }
          }
          transition={{ duration: 0.3, delay: 0.2 }}
        ></motion.div>
        <AnimatePresence>
          {this.state.isMenuOpen && (
            <motion.div
              className="nav-container"
              initial={{ height: 0, opacity: 1 }}
              animate={{ height: "100vh", opacity: 1 }}
              exit={{ height: 0, opacity: -1 }}
              transition={{ type: "tween" }}
            >
              <motion.ul
                className="nav"
                initial="hidden"
                animate={this.state.isMenuOpen ? "visible" : "hidden"}
                variants={list}
              >
                <motion.li variants={item}>
                  <div
                    className="link no-select"
                    style={window.location.pathname === "/" ? {opacity: 1} : {opacity: 0.6}}
                    onClick={() => this.changePage("/")}
                  >
                    Home
                  </div>
                </motion.li>
                <motion.li variants={item}>
                  <div
                    className="link no-select"
                    style={window.location.pathname === "/projects" ? {opacity: 1} : {opacity: 0.6}}
                    onClick={() => this.changePage("/projects")}
                  >
                    Projects
                  </div>
                </motion.li>
                <motion.li variants={item}>
                  <div
                    className="link no-select"
                    style={window.location.pathname === "/skills" ? {opacity: 1} : {opacity: 0.6}}
                    onClick={() => this.changePage("/skills")}
                  >
                    Skills
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
}

export default HamburgerMenu;
