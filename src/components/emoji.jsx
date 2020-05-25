import React from "react";

function emoji(props) {
  return (
    <span className={props.class} role="img" aria-label={props.label}>{props.emoji}</span>
  );
}

export default emoji;