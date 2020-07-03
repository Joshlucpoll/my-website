import React from "react";
import { Link } from "react-router-dom";
import "../styles/projectCard.scss";

function projectCard(props) {

  const link = "/projects/" + props.repo.name

  return(
    <Link to={link} onClick={props.onClick}>
      <div className="card">
        <div className="card-title">{props.repo.name}</div>
      </div>
    </Link>
  );
}

export default projectCard;