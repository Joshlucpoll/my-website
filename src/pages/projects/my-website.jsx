import React from "react";

import { motion } from "framer-motion";
import { pageStyle, pageTransition, pageVariants } from "../../styles/pageTransition";
import { Link } from "react-router-dom";

import "../../styles/projects/my-website.scss";

class myWebsite extends React.Component {

  render() {
    return (
      <motion.div
        className="my-website-body"

        style={pageStyle}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        My website project
      <Link to="/projects">Projects</Link>  
      </motion.div>
    );
  }
}

export default myWebsite;