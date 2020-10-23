import React from 'react';
import { motion } from 'framer-motion';
import { matrix, multiply, sin, cos, sqrt, pi } from 'mathjs';

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
    this.state = {
      skills: [
        "Git",
        "HTML 5",
        "CSS",
        "SCSS",
        "Python",
        "JavaScript",
        "TypeScript",
        "ReactJS",
        "Angular",
        "VueJS",
        "npm",
        "pip",
        "Github",
      ],
      // skills: ['.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.','.',],
      points: [],
      calculatedSphere: false,
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

      points.push([
        [x * 200],
        [y * 200],
        [z * 200]
      ])
    }
    this.setState({
      points: points,
      calculatedSphere: true
    });
  }

  rotateSphere(samples=this.state.skills.length) {
    const newPoints = [];

    const rotationMatrix = multiply(
      matrix([
        [1, 0, 0],
        [0, cos(.1), -sin(.1)],
        [0, sin(.1), cos(.1)]
      ]),
      matrix([
        [cos(.1), -sin(.1), 0],
        [sin(.1), cos(.1), 0],
        [0, 0, 1]
      ])
    )
    // const rotationMatrix = matrix([
    //   [0.99875, 0.04997, 0],
    //   [0.04972, 0.99376, 0.09983],
    //   [0.09983, 0.09970, 0.99500]
    // ]);

    for (let i = 0; i < samples; i++) {
      const currentPoint = this.state.points[i];

      const newPoint = multiply(rotationMatrix, currentPoint)._data;
      newPoints.push(newPoint);
    }
    this.setState({points: newPoints})
    setTimeout(() => {
      this.rotateSphere()
    }, 500);
  }

  componentDidMount() {
    this.fibSphere();
    setTimeout(() => {
      console.log(this.state.points)
      this.rotateSphere()
    }, 2000);
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
      >
        <div className="sphere-container">
          {this.state.calculatedSphere &&
            this.state.skills.map((skill, index) =>
              <motion.div
                className="sphere-item"
                key={index}
                animate={{
                  x: this.state.points[index][0][0],
                  y: this.state.points[index][1][0],
                  z: this.state.points[index][2][0],
                  opacity: Math.max(((this.state.points[index][2][0]/100) + 1) / 2, 0.1)
                }}
                transition={{
                  duration: 0.5,
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