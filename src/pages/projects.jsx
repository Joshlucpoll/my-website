import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import ProjectCard from "../components/projectCard";
import ProjectSelector from "./projects/projectsSelector";
import Emoji from "../components/emoji";
import "../styles/projects.scss";
import DownArrow from "../assets/down_arrow.svg";

import { pageTransition } from "../styles/pageTransition";
import { Switch, Route } from "react-router-dom";

const button = {
  rest: { scale: 1 },
  hover: { scale: 1.1 },
  pressed: { scale: 0.95 },
};

const sort = {
  pushed: "Updated",
  full_name: "Alphabetical",
  created: "Created",
};

const list = {
  visible: {
    transition: {
      delay: 1,
      when: "beforeChildren",
      staggerChildren: 0.15,
      delayChildren: 1.5,
    },
  },
};

const item = {
  visible: {
    opacity: 1,
    y: 0,
  },
};

const pageVariants = {
  initial: (window) => ({
    position: "fixed",
    clipPath: `circle(0px at ${window.innerWidth / 2}px ${
      window.innerHeight / 2
    }px)`,
  }),
  animate: (window) => ({
    clipPath: `circle(${Math.max(window.innerWidth, window.innerHeight)}px at ${
      window.innerWidth / 2
    }px ${window.innerHeight / 2}px)`,
    position: "absolute",
    transitionEnd: {
      clipPath: "none",
    },
  }),
  exit: {
    opacity: 0.99,
  },
};

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      isLoaded: false,
      repos: null,
      error: false,
      isSortOpen: false,
      sortMethod: "pushed",
      imageLocation: null,
    };
    this.blackList = [
      "joshlucpoll",
      "rotating-dials-watchface",
      "joshlucpoll.github.io",
    ];
    this.scrollStyle = { top: this.props.scroll + "px" };
  }

  getRepos(sort) {
    // sort types: created, updated, pushed, full_name

    fetch(`https://api.github.com/users/joshlucpoll/repos?sort=${sort}`)
      .then((res) => res.json())
      .then(
        (result) => {
          if (!Array.isArray(result)) {
            this.setState({
              isLoaded: true,
              repos: result,
              error: true
            });
          }
          this.setState({
            isLoaded: true,
            repos: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: true,
          });
        }
      );
    this.setState({ sortMethod: sort });
  }

  componentDidMount() {
    document.title = "Josh Pollard | 🚀";
    this.getRepos("pushed");

    setTimeout(() => {
      this.scroll = {};
    }, 1300);
  }

  sortButtonHandler() {
    this.setState((state) => ({
      isSortOpen: !state.isSortOpen,
    }));
  }

  onItemClick(path, el) {

    // const width = event.width;
    // const height = event.height;
    // const x = event.left;
    // const y = event.top - window.scrollY;
    const style = el.style;
    console.log(el.style);

    this.props.changeDirectory(path, [style])
  }

  cardLocation(x, y) {
    this.setState({
      x: x,
      y: y,
    });
  }

  render() {
    const updated = () =>
      this.state.sortMethod === "pushed" ? "bold" : "normal";
    const full_name = () =>
      this.state.sortMethod === "full_name" ? "bold" : "normal";
    const created = () =>
      this.state.sortMethod === "created" ? "bold" : "normal";

    return (
      <Switch>
        <Route exact path="/projects">
          <motion.div
            className="projects-body"
            style={this.scrollStyle}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={window}
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="title-container">
              <div className="overlay">
                <div className="title">Projects</div>
                <div className="subtitle">
                  From Python to HTML to Dart, this page displays all my past
                  projects with details on how I built them.{" "}
                  <Emoji label="builder" emoji="👷🏻‍♂️" />
                </div>
              </div>
              <motion.div
                className="sort-container"
                layoutTransition={{ type: "tween", duration: 0.1 }}
              >
                <motion.div
                  className="sort-button"
                  onClick={() => this.sortButtonHandler()}
                  variants={button}
                  initial="rest"
                  whileHover="hover"
                  whileTap="pressed"
                >
                  <div className="sort-text">
                    Sort: {sort[this.state.sortMethod]}
                  </div>
                  <img
                    className="down-arrow"
                    alt="down-arrow"
                    src={DownArrow}
                  ></img>
                </motion.div>
                <AnimatePresence>
                  {this.state.isSortOpen && (
                    <motion.div
                      className="sort-menu-container"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ ease: "circOut", duration: 0.3 }}
                    >
                      <ul>
                        <li>
                          <div
                            style={{ fontWeight: updated() }}
                            onClick={() => this.getRepos("pushed")}
                          >
                            Updated
                          </div>
                        </li>
                        <li>
                          <div
                            style={{ fontWeight: full_name() }}
                            onClick={() => this.getRepos("full_name")}
                          >
                            Alphabetical
                          </div>
                        </li>
                        <li>
                          <div
                            style={{ fontWeight: created() }}
                            onClick={() => this.getRepos("created")}
                          >
                            Created
                          </div>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {!this.state.isLoaded && (
              <motion.div
                className="loading-title"
                animate={{ opacity: 1 }}
                style={{
                  opacity: 0,
                  color: "white",
                  textAlign: "center",
                  width: "100vw",
                }}
              >
                Loading...
              </motion.div>
            )}

            {!Array.isArray(this.state.repos) ? (
              this.state.error && 
                <motion.div
                  animate={{ opacity: 1 }}
                  style={{
                    opacity: 0,
                    color: "white",
                    textAlign: "center",
                    width: "100vw",
                  }}
                >
                  Error. Please reload page. <br/>
                  {JSON.stringify(this.state.repos)}
                </motion.div>
              ) : (
              this.state.isLoaded &&
                <motion.section
                  className="projects-container"
                  initial="hidden"
                  animate="visible"
                  variants={list}
                >
                  {this.state.repos.map((repo) =>
                    // Excludes repos in 'blacklist' array
                    !this.blackList.includes(repo.name.toLowerCase()) &&
                      <motion.div
                        key={repo.name}
                        initial={{ opacity: 0, y: -100 }}
                        variants={item}
                        positionTransition={{
                          duration: 0.5,
                          ease: "backInOut",
                        }}
                      >
                        <ProjectCard
                          repo={repo}
                          sortMethod={this.state.sortMethod}
                          onClick={(path, el) =>
                            this.onItemClick(path, el)
                          }
                        />
                      </motion.div>
                  )}
                </motion.section>
              )
            }
          </motion.div>
        </Route>
        <Route path={"/projects/:projectName"}>
          <ProjectSelector
            scroll={this.props.scroll}
            imageLocation={this.state.imageLocation}
            location={this.props.location}
          />
        </Route>
      </Switch>
    );
  }
}

export default Projects;
