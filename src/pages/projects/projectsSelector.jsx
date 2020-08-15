import MyWebsite from "./my-website";
import NameThatColour from "./name-that-colour";

import React from "react";
import { withRouter, useParams } from "react-router-dom";

function ProjectSelector(props) {
    let { projectName } = useParams();

    const imageLocation = props.location.state;
    const repos = JSON.parse(localStorage.getItem("repos"));
    const repo = repos.find(repo => repo.name === projectName);
  
    switch (projectName) {
      case "my-website":
        return (
          <MyWebsite 
            scroll={props.scroll}
            imageLocation={imageLocation}
            repo={repo}
          />
        );
      case "name-that-colour":
        return (
          <NameThatColour 
            scroll={props.scroll}
            imageLocation={imageLocation}
            repo={repo}
          />
        );

      default:
        window.location.replace(`https://github.com/joshlucpoll/${projectName}`);
        return(<div/>)
    }
}


export default withRouter(ProjectSelector);