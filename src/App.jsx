import React from "react";
import {
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { isMobile } from "react-device-detect";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Home from "./pages/home";
import Projects from "./pages/projects";
import LostPage from "./pages/404";

// Components
import Console from "./components/console";
import HamburgerMenu from "./components/hamburgerMenu";
import SocialBar from "./components/socialBar";

import "./styles/app.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changePage: null,
      easyNav: null,
    };
  }
  
  componentDidMount() {
    setTimeout(() => {
      if (isMobile) {
        this.setState({ easyNav: true });
      } else {
        this.setState({ easyNav: false });
      }
    }, 2500);
    
    // Updated lastTime if it's invalid
    const lastTime = new Date(localStorage.getItem("lastTime"));
    if (Object.prototype.toString.call(lastTime) === "[object Date]") {
      if (isNaN(lastTime.getTime())) {
        localStorage.setItem("lastTime", new Date());
      }
    }
    else {
      localStorage.setItem("lastTime", new Date());
    }
    this.fetchRepos();
  }

  fetchRepos() {
    const diff = Math.abs(new Date() - new Date(localStorage.getItem("lastTime"))) / 60000; // difference in minutes

    if (diff > 1) {
      try {
        fetch("https://api.github.com/users/joshlucpoll/repos")
        .then((res) => res.json())
        .then(
          (result) => {
            if (result instanceof Array) {
              localStorage.setItem("repos", JSON.stringify(result));
              localStorage.setItem("lastTime", new Date());
            }
            else {
              throw Error("Reach API Limit")
            }
          },
          (error) => {
            throw error;
          }
        );
      }
      catch (error) {
        console.error(error)
      }
    }
  }
  
  changeDirectory(path, state={}) {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
    const location = {
      pathname: path,
      state: state,
    };
    this.props.history.push(location);
  }

  changeNav(nav) {
    if (nav === "ham") {
      this.setState({ easyNav: true });
    }
    if (nav === "term") {
      this.setState({ easyNav: false });
    }
  }

  render() {
    return (
      <div className="app">
        <Route
          render={({ location }) => (
            <AnimatePresence>
              <Switch location={location} key={location.pathname}>
                <Route exact path="/">
                  <Home/>
                </Route>
                <Route path="/projects">
                  <Projects
                    changeDirectory={(path, state) => this.changeDirectory(path, state)}
                  />
                </Route>
                <Route>
                  <LostPage />
                </Route>
              </Switch>
            </AnimatePresence>
          )}
          />
        <SocialBar/>
        {this.state.easyNav === null && (
          <motion.div
            className="nav-button-fake"
            initial={{ x: 20, opacity: 0, rotate: 90 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{
              delay: 2,
              duration: 1,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          />
        )}
        {this.state.easyNav === true && (
          <HamburgerMenu
            changeDirectory={(path) => this.changeDirectory(path)}
            changeNav={(nav) => this.changeNav(nav)}
          />
        )}
        {this.state.easyNav === false && (
          <Console
            changeDirectory={(path) => this.changeDirectory(path)}
            changeNav={(nav) => this.changeNav(nav)}
          />
        )}
      </div>
    );
  }
}

export default withRouter(App);