import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import ProjectSelector from "./projects/projectsSelector";
import ProjectCard from "../components/projectCard";
import Emoji from "../components/emoji";
import "../styles/projects.scss";
import DownArrow from "../assets/down_arrow.svg";

import { pageTransition, pageVariants } from "../styles/pageTransition";
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

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      isLoaded: false,
      repos: "",
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
    this.scroll = { top: this.props.scroll + "px" };
  }

  getRepos(sort) {
    // sort types: created, updated, pushed, full_name

    fetch(`https://api.github.com/users/joshlucpoll/repos?sort=${sort}`)
      .then((res) => res.json())
      .then(
        (result) => {
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

  onClick(imageLocation, link) {
    // console.log(imageLocation);
    // this.setState({ imageLocation: imageLocation });
    this.imageLocation = imageLocation;
    // this.forceUpdate()
    this.props.changeDirectory(link);
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

    // console.log(this.imageLocation);

    if (this.state.error || !Array.isArray(this.state.repos)) {
      return (
        <motion.div
          animate={{ opacity: 1 }}
          style={{ opacity: 0, color: "white" }}
          transition={{ delay: 2 }}
        >
          Error. Please reload page. {JSON.stringify(this.state.repos)}
        </motion.div>
      );
    } else {
      return (
        <Switch>
          <Route exact path={"/projects"}>
            <motion.div
              className="projects-body"
              style={this.scrollStyle}
              initial="initial"
              animate="in"
              exit="out"
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

              {!this.state.isLoaded && <div>Loading...</div>}
              {this.state.isLoaded && (
                <section className="projects-container">
                  {this.state.repos.map(
                    (repo) =>
                      // Excludes repos in 'blacklist' array
                      !this.blackList.includes(repo.name.toLowerCase()) && (
                        <motion.div
                          key={repo.name}
                          positionTransition={{
                            duration: 0.5,
                            ease: "backInOut",
                          }}
                        >
                          <ProjectCard
                            repo={repo}
                            sortMethod={this.state.sortMethod}
                            onClick={(imageLocation, link) =>
                              this.onClick(imageLocation, link)
                            }
                          />
                        </motion.div>
                      )
                  )}
                </section>
              )}
            </motion.div>
          </Route>
          <Route path={"/projects/:projectName"}>
            <ProjectSelector
              scroll={this.props.scroll}
              imageLocation={this.imageLocation}
            />
          </Route>
        </Switch>
      );
    }
  }
}

export default Projects;
