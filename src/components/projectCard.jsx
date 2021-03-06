import React from "react";
import { isMobile } from "react-device-detect";
import { motion } from "framer-motion";
import moment from "moment";
import trianglify from "trianglify";
import "../styles/projectCard.scss";

class projectCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: { transform: "rotateY(0deg) rotateX(0deg)" },
      stylesBrightness: {},
      image: props.image,
      altImage:
        props.image === undefined
          ? trianglify({
              width: 840,
              height: 360,
              seed: this.props.repo.name,
            }).toSVG()
          : null,
      isClicked: false,
      isHovering: false,
      _isMounted: false,
    };

    this.image = React.createRef();
    this.link = "/projects/" + props.repo.name;
  }

  getDate() {
    const now = moment();
    let repoTime;

    if (this.props.sortMethod === "pushed_at") {
      repoTime = moment(this.props.repo.pushed_at);
    } else if (this.props.sortMethod === "created_at") {
      repoTime = moment(this.props.repo.created_at);
    } else {
      return "";
    }

    if (
      now.date() === repoTime.date() &&
      now.month() === repoTime.month() &&
      now.year() === repoTime.year()
    ) {
      return "Today";
    } else if (
      now.date() - repoTime.date() === 1 &&
      now.month() === repoTime.month() &&
      now.year() === repoTime.year()
    ) {
      return "Yesterday";
    } else if (now.diff(repoTime, "days") < 7) {
      return repoTime.format("dddd");
    } else {
      return repoTime.format("D[-]MMM[-]Y [(]N[)]");
    }
  }

  mapAngle(x, in_min, in_max, out_min, out_max) {
    return Math.round(
      ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }

  updatePerspective(e) {
    const maxAngle = 10;

    const card = document.getElementById(this.props.repo.name + "-card");
    const x = Math.round(e.clientX - card.getBoundingClientRect().left);
    const y = Math.round(e.clientY - card.getBoundingClientRect().top);

    const rY = this.mapAngle(
      x,
      0,
      Math.round(card.getBoundingClientRect().width),
      -maxAngle,
      maxAngle
    );
    const rX = this.mapAngle(
      y,
      0,
      Math.round(card.getBoundingClientRect().height),
      -maxAngle,
      maxAngle
    );

    const styles = {
      transform: `rotateY(${rY}deg) rotateX(${-rX}deg)`,
    };
    const stylesBrightness = {
      filter: `brightness(${-rX / 40 + 1})`,
    };
    if (this.state._isMounted) {
      this.setState({
        styles: styles,
        stylesBrightness: stylesBrightness,
        isHovering: true,
      });
    }
  }

  resetPerspective(e) {
    if (window.location.pathname === "/projects") {
      const styles = {
        transform: "rotateY(0deg) rotateX(0deg)",
      };
      const stylesBrightness = {
        filter: `brightness(1)`,
      };

      if (this.state._isMounted) {
        this.setState({
          styles: styles,
          stylesBrightness: stylesBrightness,
          isHovering: isMobile ? true : false,
        });
      }
    }
  }

  onClick() {
    this.props.onClick(this.link, this.image);
    setTimeout(() => {
      if (this.state._isMounted) {
        this.setState({ isClicked: true });
      }

      setTimeout(() => {
        if (this.state._isMounted) {
          this.setState({ isClicked: false });
        }
      }, 1500);
    }, 100);
  }

  componentDidMount() {
    this.setState({ _isMounted: true });
    if (isMobile) {
      this.setState({ isHovering: true });
    }

    const card = document.getElementById(this.props.repo.name + "-card");
    const container = document.getElementById(
      this.props.repo.name + "-container"
    );

    card.addEventListener("mousemove", (e) => this.updatePerspective(e));
    container.addEventListener("mouseleave", (e) => this.resetPerspective(e));
  }

  componentWillUnmount() {
    this.setState({ _isMounted: false });
    const card = document.getElementById(this.props.repo.name + "-card");
    const container = document.getElementById(
      this.props.repo.name + "-container"
    );
    card.removeEventListener("mousemove", (e) => this.updatePerspective(e));
    container.removeEventListener("mouseleave", (e) =>
      this.resetPerspective(e)
    );
  }

  render() {
    return (
      <div className="card-container" id={this.props.repo.name + "-container"}>
        <motion.div
          className="card"
          id={this.props.repo.name + "-card"}
          animate={this.state.styles}
          transition={{ duration: 0.3, ease: "circOut" }}
        >
          <div className="image-container" onClick={() => this.onClick()}>
            {this.state.image === undefined ? (
              <motion.div
                style={
                  this.state.isClicked
                    ? { opacity: 0 }
                    : this.state.stylesBrightness
                }
                id={this.props.repo.name + "-img"}
                className="title-img"
                alt="Project"
                ref={this.image}
                dangerouslySetInnerHTML={{
                  __html: this.state.altImage.outerHTML,
                }}
              ></motion.div>
            ) : (
              <motion.img
                style={
                  this.state.isClicked
                    ? { opacity: 0 }
                    : this.state.stylesBrightness
                }
                id={this.props.repo.name + "-img"}
                className="title-img"
                alt="Project"
                src={this.state.image}
                ref={this.image}
              />
            )}
            <motion.div
              className="info-cover"
              initial={{ opacity: 0 }}
              animate={this.state.isHovering ? { opacity: 1 } : { opacity: 0 }}
            >
              <div
                className="card-title"
                style={
                  this.state.isClicked
                    ? { opacity: 0 }
                    : this.state.stylesBrightness
                }
              >
                {this.props.repo.name}
              </div>

              {this.props.sortMethod !== "name" && (
                <div className="date no-select" title="Date">
                  {this.getDate()}
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default projectCard;
