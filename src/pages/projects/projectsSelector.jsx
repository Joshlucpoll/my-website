import Lost from "../404";
import MyWebsite from "./my-website";

import React from "react";
import { useParams } from "react-router-dom";

function ProjectSelector() {

  let { projectName } = useParams();

  if (projectName === "my-website") {
    return <MyWebsite/>
  }
  else {
    return <Lost/>
  }
}

export default ProjectSelector;