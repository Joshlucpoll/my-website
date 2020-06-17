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
    }
  }

  componentDidMount() {
    document.title = "Josh Pollard | 🚀";
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
            {/* <div className="projects-underlay"/> */}
            <section className="projects-container">
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="my-website" onClick={() => this.onClick()}></ProjectCard>
              <ProjectCard name="battleships"></ProjectCard>
            </section>
          </motion.div>
        </Route>
        <Route path={"/projects/:projectName"}>
          <ProjectSelector/>
        </Route>
      </Switch>

    )
  }
}

export default Projects;