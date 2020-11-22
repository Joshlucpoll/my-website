import React from "react";
import {
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Pages
import Home from "./pages/home";
import Projects from "./pages/projects";
import Skills from "./pages/skills";
import LostPage from "./pages/404";

// Components
import Console from "./components/console";
import HamburgerMenu from "./components/hamburgerMenu";
import SocialBar from "./components/socialBar";

import cv from "./assets/Joshua Pollard CV.pdf"
import "./styles/app.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changePage: null,
      easyNav: null,
      isSocialBarVisible: this.socialBarVisible(),
    };
  }
  
  componentDidMount() {
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

    setTimeout(() => {
      this.setState({ easyNav: true });
    }, 2500);
    
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
              throw Error("Reached API Limit")
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

  socialBarVisible() {
    const paths = [
      "/",
    ]

    if (paths.includes(window.location.pathname)) {
      return true;
    }
    else {
      return false;
    }
  }
  
  changeDirectory(path, state={}) {
    if (path === "/cv") {
      window.open(cv)
    }
    else {
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
      this.setState({ isSocialBarVisible: this.socialBarVisible() })
    }
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
          ignoreScrollBehavior
          render={({ location }) => (
            <AnimatePresence>
              <Switch location={location} key={location.pathname}>
                <Route exact path="/" ignoreScrollBehavior>
                  <Home/>
                </Route>
                <Route path="/projects" ignoreScrollBehavior>
                  <Projects
                    changeDirectory={(path, state) => this.changeDirectory(path, state)}
                  />
                </Route>
                <Route path="/skills" ignoreScrollBehavior>
                  <Skills/>
                </Route>
                <Route ignoreScrollBehavior>
                  <LostPage />
                </Route>
              </Switch>
            </AnimatePresence>
          )}
          />
        {this.state.isSocialBarVisible &&
          <SocialBar/>
        }
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