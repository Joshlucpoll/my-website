import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import ProjectSelector from "./projects/projectsSelector";
import ProjectCard from "../components/projectCard";
import Emoji from "../components/emoji";
import "../styles/projects.scss";
import DownArrow from "../assets/down_arrow.svg";

import { pageStyle, pageTransition, pageVariants } from "../styles/pageTransition";
import { 
  Switch, 
  Route,
 } from "react-router-dom";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      isLoaded: false,
      error: false,
      isSortOpen: false,
    }
  }

  getRepos(sort) {
    // sort types: created, updated, pushed, full_name

    fetch(`https://api.github.com/users/joshlucpoll/repos?sort=${sort}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            repos: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: true,
          });
        }
      )
  }

  componentDidMount() {
    document.title = "Josh Pollard | 🚀";

    this.getRepos("pushed")
  }
  
  sortButtonHandler() {
    this.setState((state) => ({
      isSortOpen: !state.isSortOpen,
    }));
  }

  onClick() {

  }

  cardLocation(x, y) {
    this.setState({
      x: x,
      y: y,
    })
  }
  
  render() {
    if (this.state.error) {
      return <div>Error. Please reload page.</div>
    }
    else {
      return (
        <Switch>
          <Route exact path={"/projects"}>
            <motion.div 
              className="projects-body"
              
              style={pageStyle}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <div className="title-container">
                <div className="overlay">
                  <div className="title">Projects</div>
                  <div className="subtitle">From Python to HTML to Dart, this page displays all my past projects with details on how I built them. <Emoji label="builder" emoji="👷🏻‍♂️"/></div>
                </div>
                <div className="sort-container">
                  <div className="sort-button" onClick={() => this.sortButtonHandler()}>
                    <div className="sort-text">Sort</div>
                    <img className="down-arrow" alt="down-arrow" src={DownArrow}></img>
                  </div>
                  <AnimatePresence>
                    {this.state.isSortOpen &&
                      <motion.div 
                        className="sort-menu-container"
                        initial={{ y: "-10%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-10%", opacity: 0 }}
                        transition={{ ease: "circOut", duration: 0.3 }}
                      >
                        <ul>
                          <li><div onClick={() => this.getRepos("pushed")}>Updated</div></li>
                          <li><div onClick={() => this.getRepos("full_name")}>Alphabetical</div></li>
                          <li><div onClick={() => this.getRepos("created")}>Created</div></li>
                        </ul>
                      </motion.div>
                    }
                  </AnimatePresence>
                </div>
              </div>
              {!this.state.isLoaded &&
                <div>Loading...</div>
              }
              {this.state.isLoaded &&
                <section className="projects-container">
                  {this.state.repos.map(repo => (
                    <motion.div key={repo.name} positionTransition={{ duration: 0.5, ease: "backInOut" }}>
                      <ProjectCard repo={repo} onClick={() => this.onClick()}/>
                    </motion.div>
                  ))}
                </section>
              }
            </motion.div>
          </Route>
          <Route path={"/projects/:projectName"}>
            <ProjectSelector/>
          </Route>
        </Switch>
  
      )
    }
  }
}

export default Projects;