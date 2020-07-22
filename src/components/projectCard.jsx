import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import moment from "moment";
import "../styles/projectCard.scss";
import GithubIcon from "../assets/social_icons/github.svg";

class projectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {},
      stylesBrightness: {},
    };

    this.link = "/projects/" + props.repo.name;
    console.log(this.getDate());
  }

  getDate() {
    const now = moment();
    const pushed = moment(this.props.repo.pushed_at);

    // console.log(now.diff(pushed, "days"));

    if (now.diff(pushed, "days") === 0) {
      return("Today");
    }
    else if (now.diff(pushed, "days") === 1) {
      return("Yesterday");
    }
    else if (now.diff(pushed, "days") < 7) {
      return(pushed.format("ddd"))
    }
    else {
      return(pushed.format("ddd[,] Q[/]MMM[/]YY" ))
    }
  }

  mapAngle(x, in_min, in_max, out_min, out_max) {
    return Math.round((x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
  }

  updatePerspective(e) {
    const maxAngle = 10;

    const card = document.getElementById(this.props.repo.name + "-card")
    const x = Math.round(e.clientX - card.getBoundingClientRect().left);
    const y = Math.round(e.clientY - card.getBoundingClientRect().top);

    const rY = this.mapAngle(x, 0, Math.round(card.getBoundingClientRect().width), -maxAngle, maxAngle);
    const rX = this.mapAngle(y, 0, Math.round(card.getBoundingClientRect().height), -maxAngle, maxAngle);

    const styles = {
      transform: `rotateY(${rY}deg) rotateX(${-rX}deg)`,
    };
    const stylesBrightness = {
      filter: `brightness(${-rX/40 + 1})`,
    };

    this.setState({ styles: styles, stylesBrightness: stylesBrightness });
  }
  
  resetPerspective(e) {
    const styles = {
      transform: "rotateY(0deg) rotateX(0deg)",
      // filter: `brightness(1)`,
    };
    const stylesBrightness = {
      filter: `brightness(1)`,
    };

    this.setState({ styles: styles, stylesBrightness: stylesBrightness });
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
        <motion.div className="card" id={this.props.repo.name + "-card"} animate={this.state.styles} transition={{ duration: 0.3, ease: "circOut" }}>
          <Link to={this.link} onClick={this.props.onClick}>
            <div className="title-container">
              <motion.img style={this.state.stylesBrightness} className="title-img" alt="Project" src={`https://res.cloudinary.com/dy1xy7vkf/image/upload/${this.props.repo.name}.png`}/>
              <div className="card-title">{this.props.repo.name}</div>
            </div>
          </Link>
          <div className="bottom-bar">
            <img src={GithubIcon} alt="Github" className="github-icon" onClick={() => window.location.replace(this.props.repo.html_url)}/>
            <div className="date" title="Date updated">{this.getDate()}</div>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default projectCard;