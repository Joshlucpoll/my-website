import React from "react";
import { withRouter, useParams } from "react-router-dom";
import Project from "./project";
import LostPage from "../404";

function ProjectSelector(props) {
    let { projectName } = useParams();
    
    try {
      let imageLocation;
      if (props.location.state === undefined) {
        imageLocation = {
          width: 210,
          height: 90,
          x: "50vw",
          y: "100vh",
          brightness: "none",
          rotateX: "none",
          rotateY: "none",
          titleX: "50vw",
          titleY: "50vh",
          titleWidth: (projectName.length + 1) * 10,
          titleHeight: 30,
        }
      }
      else {
        imageLocation = props.location.state;
      }
      
      const repos = JSON.parse(localStorage.getItem("repos"));
      const repo = repos.find(repo => repo.name === projectName);
      const image = props.images[repo.name];

      if (repo === undefined) {
        return <LostPage/>
      }
      else {
        return (
          <Project
            repo={repo}
            imageLocation={imageLocation}
            image={image}
            changeDirectory={props.changeDirectory}
          />
        )
      }
    }
    catch {
      return null;
    }
  
}


export default withRouter(ProjectSelector);