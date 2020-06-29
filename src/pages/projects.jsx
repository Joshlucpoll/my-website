import React from "react";

import { motion } from "framer-motion";

import ProjectSelector from "./projects/projectsSelector";
import ProjectCard from "../components/projectCard";
import Emoji from "../components/emoji";
import "../styles/projects.scss";

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
    }
  }

  componentDidMount() {
    document.title = "Josh Pollard | 🚀";

    fetch("https://api.github.com/users/joshlucpoll/repos?sort=pushed")
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
                  <div className="subtitle">From Python to HTML to Dart, this page displays all my past projects with details on how I built them. <Emoji label="builder" emoji="👷🏻‍♂️"/>
                </div>
                </div>
              </div>
              {!this.state.isLoaded &&
                <div>Loading...</div>
              }
              {this.state.isLoaded &&
                <section className="projects-container">
                  {this.state.repos.map(repo => (
                    <ProjectCard repo={repo} onClick={() => this.onClick()}/>
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