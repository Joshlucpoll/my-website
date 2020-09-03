import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import ProjectCard from "../components/projectCard";
import ProjectSelector from "./projects/projectsSelector";
import Emoji from "../components/emoji";
import "../styles/projects.scss";
import DownArrow from "../assets/down_arrow.svg";

import { pageTransition } from "../styles/pageTransition";
import { Switch, Route } from "react-router-dom";

import bsgIMG from "../assets/projects/battleships-game.png";
import ffmcIMG from "../assets/projects/freefall-model-calculator.png";
import hwwIMG from "../assets/projects/homeworks-website.png";
import itsIMG from "../assets/projects/img-to-spreadsheet.png";
import mqIMG from "../assets/projects/multiplayer-quiz.png";
import mwIMG from "../assets/projects/my-website.png";
import ntcIMG from "../assets/projects/name-that-colour.png";
import rdwfIMG from "../assets/projects/rotating-dials-watchface.png";
import ttwIMG from "../assets/projects/tabletime-website.png";
import taIMG from "../assets/projects/text-adventure.png";

const projectImages = {
  "battleships-game": bsgIMG,
  "freefall-model-calculator": ffmcIMG,
  "homeworks-website": hwwIMG,
  "img-to-spreadsheet": itsIMG,
  "multiplayer-quiz": mqIMG,
  "my-website": mwIMG,
  "name-that-colour": ntcIMG,
  "rotating-dials-watchface": rdwfIMG,
  "tabletime-website": ttwIMG,
  "text-adventure": taIMG,
}

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
  hidden: {
    transition: {
      delay: 1,
      when: "beforeChildren",
      staggerChildren: 0.15,
      delayChildren: 1.5,
    },
  },
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
  hidden: {
    opacity: 0,
    y: -100,
  },
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
    display: "fixed",
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
      "alfred-website",
    ];
    this.scrollStyle = { top: this.props.scroll + "px" };
  }

  getRepos(sort="pushed_at") {
    // sort types: created, updated, pushed, full_name

    function compareValues(key, direction="desc") {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }
    
        const varA = (key === "full_name")
          ? a[key].toUpperCase() : new Date(a[key]);
        const varB = (key === "full_name")
          ? b[key].toUpperCase() : new Date(b[key]);
    
        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        
        return (
          (direction === 'desc') ? (comparison * -1) : comparison
        );
      };
    }


    const repos = JSON.parse(localStorage.getItem("repos"));

    if (repos instanceof Array) {
      const sortedRepos = repos.sort(compareValues(sort));
      this.setState({ 
        repos: sortedRepos,
        sortMethod: sort,
        isLoaded: true
      });
    }
    if (repos === null) {
      setTimeout(() => {
        this.getRepos()
      }, 100);
    }

  }

  componentDidMount() {
    document.title = "Josh Pollard | 🚀";
    this.getRepos("pushed_at");

    setTimeout(() => {
      this.scrollStyle = {};
    }, 1500);
  }

  sortButtonHandler() {
    this.setState((state) => ({
      isSortOpen: !state.isSortOpen,
    }));
  }

  onItemClick(path, el) {

    const width = el.current.clientWidth;
    const height = el.current.clientHeight;
    const x = el.current.getBoundingClientRect().left;
    const y = el.current.getBoundingClientRect().top;
    const brightness = el.current.style.filter
    const transform = el.current.parentElement.parentElement.style.transform;
    
    const state = {
      width: width, 
      height: height,
      x: x,
      y: y,
      brightness: brightness,
      transform: transform,
    };
    
    this.props.changeDirectory(path, state);
  }

  cardLocation(x, y) {
    this.setState({
      x: x,
      y: y,
    });
  }

  render() {
    const updated = () =>
      this.state.sortMethod === "pushed_at" ? "bold" : "normal";
    const full_name = () =>
      this.state.sortMethod === "name" ? "bold" : "normal";
    const created = () =>
      this.state.sortMethod === "created_at" ? "bold" : "normal";

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
                            onClick={() => this.getRepos("pushed_at")}
                          >
                            Updated
                          </div>
                        </li>
                        <li>
                          <div
                            style={{ fontWeight: full_name() }}
                            onClick={() => this.getRepos("name")}
                          >
                            Alphabetical
                          </div>
                        </li>
                        <li>
                          <div
                            style={{ fontWeight: created() }}
                            onClick={() => this.getRepos("created_at")}
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

            {this.state.isLoaded &&
              <motion.section
                className="projects-container"
                animate={this.state.isLoaded ? "visible" : "hidden"}
                variants={list}
              >
                {this.state.repos.map((repo) =>
                  // Excludes repos in 'blacklist' array
                  !this.blackList.includes(repo.name.toLowerCase()) &&
                    <motion.div
                      key={repo.name}
                      variants={item}
                      positionTransition={{
                        duration: 0.5,
                        ease: "backInOut",
                      }}
                    >
                      <ProjectCard
                        repo={repo}
                        image={projectImages[repo.name]}
                        sortMethod={this.state.sortMethod}
                        onClick={(path, el) =>
                          this.onItemClick(path, el)
                        }
                      />
                    </motion.div>
                )}
              </motion.section>
            }
          </motion.div>
        </Route>
        <Route path={"/projects/:projectName"}>
          <ProjectSelector
            scroll={this.props.scroll}
            images={projectImages}
            imageLocation={this.state.imageLocation}
            getRepos={() => this.getRepos()}
          />
        </Route>
      </Switch>
    );
  }
}

export default Projects;