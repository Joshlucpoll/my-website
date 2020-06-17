import React from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { AnimatePresence } from "framer-motion"

// Pages
import Home from "./pages/home";
import Projects from "./pages/projects";
import LostPage from "./pages/404";

// Components
import Console from "./components/console";
import SocialBar from "./components/socialBar"

import "./styles/app.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: window.location.pathname,
      scroll: window.scrollY,
    }
    this.location = this.props.location;
  }
  
  componentDidMount() {
    window.addEventListener("scroll", () => this.setState({ scroll: window.scrollY }))
  }

  changeDirectory(path) {
    this.setState({ currentPath: path, scroll: window.scrollY });
    document.getElementsByTagName("body")[0].classList.add("body-style-transition");
  }

  render() {
    return (
      <Router>
        <div className="app">
          <SocialBar/>
          <Route 
            render={({ location }) => (
              <AnimatePresence onExitComplete={() => document.getElementsByTagName("body")[0].classList.remove("body-style-transition")}>
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
          <Console
            currentDirectory={this.state.currentPath}
            changeDirectory={(path) => this.changeDirectory(path)}
          />

          {this.state.currentPath !== window.location.pathname &&
            <Redirect to={this.state.currentPath} push={true}/>
          }
        </div>
      </Router>
    );
  }
}

export default App;
