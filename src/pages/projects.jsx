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

const button = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
  pressed: { scale: 0.95 }
};

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      isLoaded: false,
      error: false,
      isSortOpen: false,
      currentRepo: "pushed",
    }
    this.blackList = ["joshlucpoll"];
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
      );
      this.setState({ currentRepo: sort });
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

    const updated = () => this.state.currentRepo === "pushed" ? "bold" : "normal";
    const full_name = () => this.state.currentRepo === "full_name" ? "bold" : "normal";
    const created = () => this.state.currentRepo === "created" ? "bold" : "normal";

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
                  <motion.div 
                    className="sort-button" 
                    onClick={() => this.sortButtonHandler()}
                    variants={button}
                    initial="rest"
                    whileHover="hover"
                    whileTap="pressed"
                  >
                    <div className="sort-text">Sort</div>
                    <img className="down-arrow" alt="down-arrow" src={DownArrow}></img>
                  </motion.div>
                  <AnimatePresence>
                    {this.state.isSortOpen &&
                      <motion.div 
                        className="sort-menu-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: "circOut", duration: 0.3 }}
                        // layoutTransition={{ type: "tween", duration: 0.3 }}
                      >
                        <ul>
                          <li><div style={{ fontWeight: updated() }} onClick={() => this.getRepos("pushed")}>Updated</div></li>
                          <li><div style={{ fontWeight: full_name() }} onClick={() => this.getRepos("full_name")}>Alphabetical</div></li>
                          <li><div style={{ fontWeight: created() }} onClick={() => this.getRepos("created")}>Created</div></li>
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
                    // Excludes repos in 'blacklist' array
                    !this.blackList.includes(repo.name.toLowerCase()) &&
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