import React from "react";
import { Link } from "react-router-dom";

function projectCard(props) {

  const link = "/projects/" + props.repo.name

  return(
    <Link to={link} onClick={props.onClick}>
      <div className="card">{props.repo.name}</div>
    </Link>
  );
}

export default projectCard;