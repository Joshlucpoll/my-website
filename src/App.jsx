import React from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { motion, AnimatePresence } from "framer-motion"

// Pages
import Home from "./pages/home";
import Projects from "./pages/projects";
import LostPage from "./pages/404";

// Components
import Console from "./components/console";
import HamburgerMenu from "./components/hamburgerMenu";
import SocialBar from "./components/socialBar"

import "./styles/app.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changePage: null,
      scroll: window.scrollY,
      easyNav: null,
    }
    this.location = this.props.location;
  }
  
  componentDidMount() {
    window.addEventListener("scroll", () => this.setState({ scroll: window.scrollY }));
    setTimeout(() => {
      if (isMobile) {
        this.setState({ easyNav: true });
      }
      else {
        this.setState({ easyNav: false });
      }
    }, 2500);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", () => this.setState({ scroll: window.scrollY }));
  }

  animationEnd() {
    document.getElementsByTagName("body")[0].classList.remove("body-style-transition")
    this.setState({ scroll: 0})
  }

  changeDirectory(path) {
    console.log(path);
    this.setState({ changePage: path }, () => this.setState({ changePage: null }));
    document.getElementsByTagName("body")[0].classList.add("body-style-transition");
  }

  changeNav(nav) {
    if (nav === "ham") {
      this.setState({ easyNav: true })
    }
    if (nav === "term") {
      this.setState({ easyNav: false })
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <SocialBar/>
          <Route 
            render={({ location }) => (
              <AnimatePresence onExitComplete={() => this.animationEnd()}>
                <Switch location={location} key={location.pathname}>
                  <Route exact path="/">
                    <Home scroll={this.state.scroll}/>
                  </Route>
                  <Route path="/projects">
                    <Projects location={location}/>
                  </Route>
                  <Route>
                    <LostPage/>
                  </Route>
                </Switch>
              </AnimatePresence>
            )}
          />
          {this.state.easyNav === null &&
            <motion.div 
              className="nav-button-fake"
              initial={{ x: 20, opacity: 0, rotate: 90 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              transition={{ 
                delay: 2, 
                duration: 1,
                type: "spring",
                stiffness: 300,
                damping: 15
              }}
            />
          }
          {this.state.easyNav === true &&
            <HamburgerMenu changeDirectory={(path) => this.changeDirectory(path)} changeNav={(nav) => this.changeNav(nav)}/>
          }
          {this.state.easyNav === false &&
            <Console changeDirectory={(path) => this.changeDirectory(path)} changeNav={(nav) => this.changeNav(nav)}/>
          }

          {this.state.changePage !== null &&
            <Redirect to={this.state.changePage}  push={true}/>
          }
        </div>
      </Router>
    );
  }
}

export default App;