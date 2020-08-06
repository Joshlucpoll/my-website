import MyWebsite from "./my-website";

import React from "react";
import { useParams } from "react-router-dom";

function ProjectSelector(props) {

  const imageLocation = props.imageLocation;

  let { projectName } = useParams();

  // fetch(`https://api.github.com/repos/joshlucpoll/${projectName}`)
  //   .then(res => res.json())
  //   .then(
  //     (result) => {
  //       const repo = result;
  //     });

  console.log(imageLocation);

  if (projectName === "my-website") {
    return <MyWebsite scroll={props.scroll} imageLocation={props.imageLocation}/>
  }
  else {
    window.location.replace(`https://github.com/joshlucpoll/${projectName}`)
  }
}

export default ProjectSelector;