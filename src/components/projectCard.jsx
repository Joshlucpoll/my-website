import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/projectCard.scss";

class projectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {}
    }

    this.link = "/projects/" + props.repo.name
  }

  mapVector(x, in_min, in_max, out_min, out_max) {
    return Math.round((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
  }

  updatePerspective(e) {
    const card = document.getElementById(this.props.repo.name + "-card")
    const x = Math.round(e.clientX - card.getBoundingClientRect().left);
    const y = Math.round(e.clientY - card.getBoundingClientRect().top);

    const rY = this.mapVector(x, 0, Math.round(card.getBoundingClientRect().width), -10, 10);
    const rX = this.mapVector(y, 0, Math.round(card.getBoundingClientRect().height), -10, 10);

    const styles = {
      transform: `rotateY(${rY}deg) rotateX(${-rX}deg)`,
    };

    this.setState({ styles: styles });
  }
  
  resetPerspective(e) {
    const styles = {
      transform: "rotateY(0deg) rotateX(0deg)",
    };

    this.setState({ styles: styles });
  }

  componentDidMount() {
    const card = document.getElementById(this.props.repo.name + "-card");
    const container = document.getElementById(this.props.repo.name + "-container");
    card.addEventListener("mousemove", (e) => this.updatePerspective(e));
    container.addEventListener("mouseleave", (e) => this.resetPerspective(e));
  }

  componentWillUnmount() {
    const card = document.getElementById(this.props.repo.name + "-card");
    const container = document.getElementById(this.props.repo.name + "-container");
    card.removeEventListener("mousemove", (e) => this.updatePerspective(e));
    container.removeEventListener("mouseleave", (e) => this.resetPerspective(e));

  }

  render() {
    return(
      <div className="card-container" id={this.props.repo.name + "-container"}>
        <Link 
          to={this.link}
          onClick={this.props.onClick}
        >
          <motion.div className="card" id={this.props.repo.name + "-card"} animate={this.state.styles} transition={{ duration: 0.3, ease: "circOut" }}>
            <div className="card-title">{this.props.repo.name}</div>
            <img alt="Project" src={`https://res.cloudinary.com/dy1xy7vkf/image/upload/${this.props.repo.name}.png`}/>
          </motion.div>
        </Link>
      </div>
    );
  }
}

export default projectCard;