import React from "react";
import { Link } from "react-router-dom";

function projectCard(props) {

  const link = "/projects/" + props.name

  return(
    <Link to={link} onClick={props.onClick}>
      <div className="card">{props.name}</div>
    </Link>
  );
}

export default projectCard;