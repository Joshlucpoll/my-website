import React from "react";
import { Link } from "react-router-dom";

class Projects extends React.Component {
  render() {
    return (
      <div>
        <div>This will be my projects page</div>
        <Link to="/">
          <div>Click me to go home</div>
        </Link>
      </div>
    )
  }
}

export default Projects;