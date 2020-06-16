import React from "react";

import { motion } from "framer-motion";

import Dots from "../components/dots";
import ProjectCard from "../components/projectCard";
import Emoji from "../components/emoji";
import "../styles/projects.scss";

import { pageStyle, pageTransition, pageVariants } from "../styles/pageTransition";

class Projects extends React.Component {
  
  componentDidMount() {
    document.title = "Josh Pollard | 🚀";

    document.getElementsByTagName("body")[0].classList.add("body-style-projects");
  }
  
  componentWillUnmount() {
    document.getElementsByTagName("body")[0].classList.remove("body-style-projects");
  }
  
  render() {
    return (
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
        <div className="test"></div>
        {/* <div className="projects-underlay"/> */}
        <section className="projects-container">
          <ProjectCard id={1}></ProjectCard>
          <ProjectCard id={2}></ProjectCard>
          <ProjectCard id={3}></ProjectCard>
          <ProjectCard id={4}></ProjectCard>
          <ProjectCard id={5}></ProjectCard>
          <ProjectCard id={6}></ProjectCard>
          <ProjectCard id={7}></ProjectCard>
          <ProjectCard id={8}></ProjectCard>
          <ProjectCard id={9}></ProjectCard>
          <ProjectCard id={10}></ProjectCard>
          <ProjectCard id={1}></ProjectCard>
          <ProjectCard id={2}></ProjectCard>
          <ProjectCard id={3}></ProjectCard>
          <ProjectCard id={4}></ProjectCard>
          <ProjectCard id={5}></ProjectCard>
          <ProjectCard id={6}></ProjectCard>
          <ProjectCard id={7}></ProjectCard>
          <ProjectCard id={8}></ProjectCard>
          <ProjectCard id={9}></ProjectCard>
          <ProjectCard id={10}></ProjectCard>
          <ProjectCard id={1}></ProjectCard>
          <ProjectCard id={2}></ProjectCard>
          <ProjectCard id={3}></ProjectCard>
          <ProjectCard id={4}></ProjectCard>
          <ProjectCard id={5}></ProjectCard>
          <ProjectCard id={6}></ProjectCard>
          <ProjectCard id={7}></ProjectCard>
          <ProjectCard id={8}></ProjectCard>
          <ProjectCard id={9}></ProjectCard>
          <ProjectCard id={10}></ProjectCard>
        </section>
        <Dots/>
      </motion.div>
    )
  }
}

export default Projects;