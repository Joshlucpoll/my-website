import MyWebsite from "./my-website";

import React from "react";
import { useParams } from "react-router-dom";

function ProjectSelector() {

  let { projectName } = useParams();

  if (projectName === "my-website") {
    return <MyWebsite/>
  }
  else {
    window.location.replace(`https://github.com/joshlucpoll/${projectName}`)
  }
}

export default ProjectSelector;