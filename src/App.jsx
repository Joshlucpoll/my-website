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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDirectory: window.location.pathname,
    }
  }

  changeDirectory(path) {
    this.setState({ currentDirectory: path })
  }
  
  render() {
    if (window.location.pathname !== this.state.currentDirectory) {

    }
    return (
      <Router>
        <div className="app">
          <SocialBar/>
          <Route 
            render={({ location }) => (
              <AnimatePresence>
                <Switch location={location} key={location.pathname}>
                  <Route exact path="/">
                    <Home/>
                  </Route>
                  <Route exact path="/projects">
                    <Projects/>
                  </Route>
                  <Route>
                    <LostPage/>
                  </Route>
                </Switch>
              </AnimatePresence>
            )}
          />
          <Console
            currentDirectory={this.state.currentDirectory}
            changeDirectory={(path) => this.changeDirectory(path)}
          />

          {this.state.currentDirectory !== window.location.pathname &&
            <Redirect to={this.state.currentDirectory}/>
          }
        </div>
      </Router>
    );
  }
}

export default App;
