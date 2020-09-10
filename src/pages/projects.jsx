import React from "react";

import { motion } from "framer-motion";

import ProjectCard from "../components/projectCard";
import ProjectSelector from "./projects/projectsSelector";
import "../styles/projects.scss";

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

const sort = {
  "pushed_at": "Updated",
  "name": "Alphabetical",
  "created_at": "Created",
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
        this.getRepos(sort)
      }, 100);
    }

  }

  componentDidMount() {
    document.title = window.location.pathname === "/projects" ?
    "Josh Pollard | 🚀" 
    : 
    `Josh Pollard | ${window.location.pathname.split("/").slice(-1)[0]}`;
    this.getRepos("pushed_at");
  }

  sortButtonHandler() {
    const nextSort = {
      "pushed_at": "name",
      "name": "created_at",
      "created_at": "pushed_at",
    }

    this.getRepos(nextSort[this.state.sortMethod]);
  }

  onItemClick(path, el) {

    const width = el.current.clientWidth;
    const height = el.current.clientHeight;
    const x = el.current.getBoundingClientRect().left;
    const y = el.current.getBoundingClientRect().top + window.scrollY;
    const brightness = el.current.style.filter
    const transform = el.current.parentElement.parentElement.style.transform;
    const rotateY = transform.split(" ")[0].split("(")[1].split(")")[0]
    const rotateX = transform.split(" ")[1].split("(")[1].split(")")[0]

    const titleEl = el.current.nextSibling.firstChild;
    const titleWidth = titleEl.clientWidth;
    const titleHeight = titleEl.clientHeight;
    const titleX = titleEl.getBoundingClientRect().left;
    const titleY = titleEl.getBoundingClientRect().top + window.scrollY;

    const state = {
      width: width, 
      height: height,
      x: x,
      y: y,
      brightness: brightness,
      rotateX: rotateX,
      rotateY: rotateY,

      titleWidth: titleWidth,
      titleHeight: titleHeight,
      titleX: titleX,
      titleY: titleY,
    };
    
    this.props.changeDirectory(path, state);
  }

  render() {
    const sortMethod = this.state.sortMethod
    return (
      <Switch>
        <Route exact path="/projects" ignoreScrollBehavior>
          <motion.div
            className="projects-body"
            initial="initial"
            animate="animate"
            exit="exit"
            custom={window}
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="title-container">
              <div className="title">Projects</div>
              <motion.div
                className="sort-container no-select"
                layoutTransition={{ type: "tween", duration: 0.1 }}
              >
                <motion.div
                  className="sort-button"
                  onClick={() => this.sortButtonHandler()}
                >
                  <div className="sort-text">
                    Sorting By {sort[sortMethod]}
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <motion.section
              className="projects-container"
              initial="hidden"
              animate={this.state.isLoaded ? "visible" : "hidden"}
              variants={list}
            >
              {this.state.isLoaded &&
                this.state.repos.map((repo) =>
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
                        sortMethod={sortMethod}
                        onClick={(path, el) =>
                          this.onItemClick(path, el)
                        }
                      />
                    </motion.div>
                )}
              </motion.section>
          </motion.div>
        </Route>
        <Route path={"/projects/:projectName"} ignoreScrollBehavior>
          <ProjectSelector
            images={projectImages}
            imageLocation={this.state.imageLocation}
            getRepos={() => this.getRepos()}
            changeDirectory={this.props.changeDirectory}
          />
        </Route>
      </Switch>
    );
  }
}

export default Projects;