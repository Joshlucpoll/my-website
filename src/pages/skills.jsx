import React from 'react';
import { motion } from 'framer-motion';
import { matrix, multiply, sin, cos, sqrt, pi, unit } from 'mathjs';

import { pageTransition } from "../styles/pageTransition";

import '../styles/skills.scss';

const pageVariants = {
  initial: (window) => ({
    opacity: 0.99,
    position: "fixed",
    clipPath: `circle(0px at ${window.innerWidth / 2}px ${
      window.innerHeight / 2
    }px)`,
  }),
  animate: (window) => ({
    opacity: 1,
    clipPath: `circle(${
      Math.max(window.innerWidth, window.innerHeight) * 4
    }px at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
    position: "absolute",
  }),
  exit: {
    opacity: 0.99,
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
      points: new Array(skills.length).fill([[0], [0], [-200]]),
      windowLimit: Math.min(window.innerHeight, window.innerWidth) / 2,
      xRatio: Math.random() / 2,
      yRatio: Math.random() / 2,
    };
  }

  fibSphere(samples=this.state.skills.length) {
    // https://stackoverflow.com/a/26127012/10472451
    const points = [];  
    const phi = pi * (3 - sqrt(5));

    for (let i = 0; i < samples; i++) {
      const y = (i * 2 / samples) - 1;
      const radius = sqrt(1 - y * y)

      const theta = phi * i;

      const x = cos(theta) * radius;
      const z = sin(theta) * radius;

      const windowLimit = this.state.windowLimit * 0.8

      points.push([
        [x * windowLimit],
        [y * windowLimit],
        [z * windowLimit]
      ])
    }
    this.setState({ points: points });
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
    )

    for (let i = 0; i < samples; i++) {
      const currentPoint = this.state.points[i];

      const newPoint = multiply(rotationMatrix, currentPoint)._data;
      newPoints.push(newPoint);
    }

    this.setState({points: newPoints})
    setTimeout(() => {
      this.rotateSphere()
    }, 100);
  }

  handleMouseMove(e) {
    let xPosition = e.clientX;
    let yPosition = e.clientY;

    if (e.type === "touchmove") {
      xPosition = e.touches[0].pageX;
      yPosition = e.touches[0].pageY;
    }

    const spherePosition = document.getElementById("sphere").getBoundingClientRect();

    const xDistance = xPosition - spherePosition.left;
    const yDistance = yPosition - spherePosition.top;

    const xRatio = xDistance / this.state.windowLimit;
    const yRatio = yDistance / this.state.windowLimit;

    this.setState({
      xRatio: xRatio,
      yRatio: yRatio,
    });
  }

  updateWindowDimensions() {
    if (this.state.windowLimit !== Math.min(window.innerHeight, window.innerWidth) / 2) {
      this.setState({ windowLimit: Math.min(window.innerHeight, window.innerWidth) / 2 });
      this.fibSphere();
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.fibSphere();
      this.rotateSphere()
    }, 1500);

    window.addEventListener("resize", () => this.updateWindowDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => this.updateWindowDimensions());
  }

  render() {
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
        <div className="sphere-container" id="sphere">
          {this.state.skills.map((skill, index) =>
            <motion.div
              className="sphere-item"
              key={index}
              initial={{ opacity: 0 }}
              animate={{
                x: this.state.points[index][0][0] - skill.length * 2,
                y: this.state.points[index][1][0] - 20,
                z: this.state.points[index][2][0],
                opacity: Math.max(((this.state.points[index][2][0] / this.state.windowLimit) + 1) / 2, 0.1)
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