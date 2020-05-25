import React from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { TransitionGroup, CSSTransition} from "react-transition-group";

// Pages
import Home from "./pages/home";
import Projects from "./pages/projects";
import LostPage from "./pages/404";

// Components
import Console from "./components/console";
import SocialBar from "./components/socialBar"

import "./styles/App.scss";
import "./styles/console.scss";

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
              <TransitionGroup>
                <CSSTransition
                  key={location.pathname}
                  classNames="fade"
                  timeout={2000}
                >
                  <Switch location={location}>
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
                </CSSTransition>
              </TransitionGroup>
            )}
          />
          <Console
            currentDirectory={this.state.currentDirectory}
            changeDirectory={(path) => this.changeDirectory(path)}
          />
        </div>
      </Router>
    );
  }
}

export default App;
