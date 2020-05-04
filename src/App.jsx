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

function App() {
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
                timeout={600}
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
        <Console/>
      </div>
    </Router>
  );
}

export default App;
