import React from "react";

import Dots from "../components/dots";
import ProjectCard from "../components/projectCard";
import Emoji from "../components/emoji";
import "../styles/projects.scss";

class Projects extends React.Component {
  
  componentDidMount() {
    document.title = "Josh Pollard | Projects";
  }
  
  render() {
    return (
      <div className="projects-body">
        <div className="title-container">
          <div className="overlay">
            <div className="title">Projects</div>
            <div className="subtitle">From Python to HTML to Dart, this page displays all my past projects with details on how I built them. <Emoji label="builder" emoji="👷🏻‍♂️"/>
          </div>
          </div>
        </div>
        <div className="projects-underlay"/>
        <section className="projects-container">
          <ProjectCard num={"1"}></ProjectCard>
          <ProjectCard num={"2"}></ProjectCard>
          <ProjectCard num={"3"}></ProjectCard>
          <ProjectCard num={"4"}></ProjectCard>
          <ProjectCard num={"5"}></ProjectCard>
          <ProjectCard num={"6"}></ProjectCard>
          <ProjectCard num={"7"}></ProjectCard>
          <ProjectCard num={"8"}></ProjectCard>
          <ProjectCard num={"9"}></ProjectCard>
          <ProjectCard num={"10"}></ProjectCard>
        </section>
        <Dots/>
      </div>
    )
  }
}

export default Projects;