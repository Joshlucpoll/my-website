import React from "react";

import { motion } from "framer-motion";
import { pageTransition, pageVariants } from "../../styles/pageTransition";
// import { Link } from "react-router-dom";

import "../../styles/projects/my-website.scss";

class myWebsite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.scroll = { top: this.props.scroll + "px" };
  }

  componentDidMount() {
    document.title = "Josh Pollard | My-Website";
    setTimeout(() => {
      this.scroll = {};
    }, 1300);
  }

  render() {
    return (
      <motion.div
        className="my-website-body"

        style={this.scroll}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {/* <motion.img className="title-img" alt="Project" src={`https://res.cloudinary.com/dy1xy7vkf/image/upload/${this.props.repo.name}.png`}/> */}
      </motion.div>
    );
  }
}

export default myWebsite;