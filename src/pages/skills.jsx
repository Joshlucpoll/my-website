import React from 'react';
import { motion } from 'framer-motion';
import { matrix, multiply, sin, cos, sqrt, pi, unit } from 'mathjs';

import { pageTransition } from "../styles/pageTransition";

import '../styles/skills.scss';

const pageVariants = {
  initial: (window) => ({
    position: "fixed",
    clipPath: `circle(0px at ${window.innerWidth / 2}px ${
      window.innerHeight / 2
    }px)`,
  }),
  animate: (window) => ({
    clipPath: `circle(${
      Math.max(window.innerWidth, window.innerHeight) * 4
    }px at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
    position: "absolute",
  }),
  exit: {
    display: "fixed",
  },
};

class Skills extends React.Component {
  constructor(props) {
    super(props);
    const skills = [
      "HTML",
      "CSS",
      "SCSS",
      "Python",
      "JavaScript",
      "TypeScript",
      "Dart",
      "C++",
      "ReactJS",
      "Angular",
      "VueJS",
      "Flutter",
      "npm",
      "git",
      "pip",
      "Github",
      "Firebase",
      "Google Cloud",
    ];
    this.state = {
      skills: skills.sort(() => .5 - Math.random()),
      isLoaded: false,
      points: new Array(skills.length).fill([[0], [0], [-200]]),
      sphereLimit: 1,
      xRatio: Math.random() / 2,
      yRatio: Math.random() / 2,
      isMounted: true,
    };
  }

  fibSphere(samples=this.state.skills.length) {
    // https://stackoverflow.com/a/26127012/10472451
    const points = [];  
    const phi = pi * (3 - sqrt(5));

    for (let i = 0; i < samples; i++) {
      const y = (i * 2 / samples) - 1;
      const radius = sqrt(1 - y * y);

      const theta = phi * i;

      const x = cos(theta) * radius;
      const z = sin(theta) * radius;

      const itemLimit = this.state.sphereLimit * 0.75;

      points.push([
        [x * itemLimit],
        [y * itemLimit],
        [z * itemLimit]
      ]);
    }
    this.setState({
      points: points,
      isLoaded: true,
    });
  }

  rotateSphere(samples=this.state.skills.length) {
    const newPoints = [];

    const thetaX = unit(-this.state.yRatio * 10, 'deg');
    const thetaY = unit(this.state.xRatio * 10, 'deg');
    const thetaZ = unit(0, 'deg');

    const rotationMatrix = multiply(
      matrix([
        [1, 0, 0],
        [0, cos(thetaX), -sin(thetaX)],
        [0, sin(thetaX), cos(thetaX)]
      ]),
      matrix([
        [cos(thetaY), 0, sin(thetaY)],
        [0, 1, 0],
        [-sin(thetaY), 0, cos(thetaY)]
      ]),
      matrix([
        [cos(thetaZ), -sin(thetaZ), 0],
        [sin(thetaZ), cos(thetaZ), 0],
        [0, 0, 1]
      ]),
    );

    for (let i = 0; i < samples; i++) {
      const currentPoint = this.state.points[i];
      const newPoint = multiply(rotationMatrix, currentPoint)._data;

      newPoints.push(newPoint);
    }

    if (this.state.isMounted) {
    
      this.setState({points: newPoints});
      setTimeout(() => {
        this.rotateSphere();
      }, 100);
      
    }
  }

  handleMouseMove(e) {
    let xPosition = e.clientX;
    let yPosition = e.clientY;

    if (e.type === "touchmove") {
      xPosition = e.touches[0].pageX;
      yPosition = e.touches[0].pageY;
    }

    const spherePosition = document.getElementById("sphere").getBoundingClientRect();

    const xDistance = xPosition - spherePosition.width/2 - spherePosition.x;
    const yDistance = yPosition - spherePosition.height/2 - spherePosition.y;

    const xRatio = xDistance / this.state.sphereLimit;
    const yRatio = yDistance / this.state.sphereLimit;

    this.setState({
      xRatio: xRatio,
      yRatio: yRatio,
    });
  }

  updateWindowDimensions() {
    try {
      const sphere = document.getElementById("sphere");
  
      if (this.state.sphereLimit !== Math.min(sphere.clientHeight, sphere.clientWidth) / 2) {
        this.setState({ sphereLimit: Math.min(sphere.clientHeight, sphere.clientWidth) / 2 });
        this.fibSphere();
      }
    }
    catch(error) {
      console.error(error);
    }
  }

  componentDidMount() {
    document.title = window.location.pathname === "/skills" ?
    "Josh Pollard | ⚙️" : document.title;

    setTimeout(() => {
      this.fibSphere();
      this.updateWindowDimensions();
      this.rotateSphere();
    }, 1500);

    window.addEventListener("resize", () => this.updateWindowDimensions());
  }

  componentWillUnmount() {
    this.setState({isMounted: false});
    window.removeEventListener("resize", () => this.updateWindowDimensions());
  }

  render() {
    let offsets;

    if (this.state.isLoaded) {
      offsets = [...document.getElementsByClassName("sphere-item")].map(element => element.clientWidth/2);
    }
    else {
      offsets = new Array(this.state.skills.length).fill(0);
    }

    return (
      <motion.div
        className="skills-body"
        initial="initial"
        animate="animate"
        exit="exit"
        custom={window}
        variants={pageVariants}
        transition={pageTransition}
        onMouseMove={(e) => this.handleMouseMove(e)}
        onTouchMove={(e) => this.handleMouseMove(e)}
      >
        <div className="skills-info-container">
          <div className="skills-title">Skills</div>
          <div className="skills-description">
          I am a driven and passionate aspiring software engineer. I have invested a significant amount of time and effort in self-teaching, developing my knowledge and supporting others in the field of digital technology. I thrive on the challenge of finding intelligent solutions to complex problems and I am keen to apply and grow my skills in the workplace. 
          </div>
        </div>
        <div className="sphere-container" id="sphere">
          {this.state.isLoaded && this.state.skills.map((skill, index) =>
            <motion.div
              className="sphere-item"
              key={index}
              initial={{ opacity: 0 }}
              animate={{
                x: this.state.points[index][0][0] - offsets[index],
                y: this.state.points[index][1][0] - 20,
                z: this.state.points[index][2][0],
                opacity: Math.max(((this.state.points[index][2][0] / this.state.sphereLimit) + 1) / 2, 0.1)
              }}
              transition={{
                duration: 0.1,
                ease: "linear"
              }}
            >
              {skill}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }
}


export default Skills;