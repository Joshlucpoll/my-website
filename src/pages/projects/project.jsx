import React from "react";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import GithubIcon from "../../assets/social_icons/github.svg";
import ExternalLink from "../../assets/external-link.svg";

import "../../styles/project.scss";


const pageVariants = {
  initial: window => ({
    position: "fixed",
    opacity: 0,
  }),
  animate: window => ({
    position: "absolute",
    opacity: 1
  }),
  exit: {
    opacity: 0,
    display: "fixed",
  }
}


class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repo: props.repo,
      readme: "",
    };

    this.styles = this.props.imageLocation;

    this.initialStylesImage = {
      opacity: 1,
      borderRadius: "10px",
      width: this.styles.width,
      height: this.styles.height,
      y: this.styles.y,
      x: this.styles.x,
      filter: "blur(0px)",
      transform: this.styles.transform,
      rotateX: this.styles.rotateX,
      rotateY: this.styles.rotateY,
    }
    this.finalStylesImage = {
      opacity: 1,
      borderRadius: 0,
      width: "100vw",
      height: `${100/this.styles.width * this.styles.height}vw`,
      y: 0,
      x: 0,
      filter: "blur(2px)",
      rotateX: 0,
      rotateY: 0,
    }

    this.initialStylesTitle = {
      fontSize: "25px",
      fontWeight: 300,
      y: this.styles.titleY,
      x: this.styles.titleX,
      rotateX: this.styles.rotateX,
      rotateY: this.styles.rotateY,
      backgroundColor: "rgba(255, 255, 255, 0)",
      color: "rgb(255, 255, 255)",
    }
    this.finalStylesTitle = {
      fontSize: "40px",
      fontWeight: 500,
      y: `calc(${50/this.styles.width * this.styles.height}vw - ${this.styles.titleHeight}px)`,
      x: `calc(50vw - ${this.styles.titleWidth}px)`,
      rotateX: 0,
      rotateY: 0,
      backgroundColor: "rgba(255, 255, 255, 1)",
      color: "rgb(0, 0, 0)",
    }
  }

  backButton() {
    this.props.changeDirectory("/projects");
  }

  getReadme() {
    fetch(`https://raw.githubusercontent.com/Joshlucpoll/${this.state.repo.name}/master/README.md`)
    .then((res) => res.text())
    .then(
      (result) => {
        this.setState({ readme: result });
      },
      (error) => {
        throw error;
      }
    );
  }

  componentDidMount() {
    this.getReadme();
  }

  render() {
    return (
      <>
        <motion.div
          className="project-body"
          style={{paddingTop: `${100/this.styles.width * this.styles.height}vw`}}
          initial="initial"
          animate="animate"
          exit="exit"
          custom={window}
          variants={pageVariants} 
          transition={{ ease: [0.94, 0.06, 0.88, 0.45], duration: 0.5 }}
        >
          
          <div
            className="back-button"
            onClick={() => this.backButton()}
          >
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left-short" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
            </svg>
          </div>

          <div className="project-wrapper">
            <div className="project-topbar">
              <div
                className="project-icon-container"
                onClick={() => window.open(this.props.repo.html_url)}
              >
                <img src={GithubIcon} alt="Github Icon" className="project-icon"/>
              </div>
              {[null, ""].indexOf(this.props.repo.homepage) === -1 &&
                <div
                  className="project-icon-container"
                  onClick={() => window.open(this.props.repo.homepage)}
                >
                  <img src={ExternalLink} alt="Website" className="project-icon"/>
                </div>
              }
              <div className="project-spacer"></div>
            </div>
            <div className="project-description-title">Description:</div>
            <div className="project-description">
              {this.props.repo.description}
            </div>

            <ReactMarkdown className="readme-markdown" disallowedTypes={["image"]} source={this.state.readme}></ReactMarkdown>
          </div>
        </motion.div>
        <motion.img
          style={{opacity: 1}}
          initial={this.initialStylesImage}
          animate={this.finalStylesImage}
          exit={{opacity: 0}}
          transition={{duration: .5, ease: [0.94, 0.06, 0.88, 0.45]}}
          className="title-img-project" 
          alt="Project" 
          src={this.props.image}
        />
        <motion.div
          style={{opacity: 1}}
          className="project-title"
          initial={this.initialStylesTitle}
          animate={this.finalStylesTitle}
          exit={{opacity: 0}}
          transition={{duration: .5, ease: [0.94, 0.06, 0.88, 0.45]}}
        >{this.state.repo.name}</motion.div>
      </>
    );
  }
}

export default Project;