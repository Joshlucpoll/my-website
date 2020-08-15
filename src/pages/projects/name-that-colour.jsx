import React from "react";

import { motion } from "framer-motion";
import { pageTransition } from "../../styles/pageTransition";

import "../../styles/projects/my-website.scss";


const pageVariants = {
  initial: window => ({
    position: "fixed",
    // clipPath: `circle(0px at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
    opacity: 0,
  }),
  animate: window => ({
    // clipPath: `circle(${Math.max(window.innerWidth, window.innerHeight)}px at ${window.innerWidth / 2}px ${window.innerHeight / 2}px)`,
    position: "absolute",
    opacity: 1
    // transitionEnd: {
    //   clipPath: "none",
    // }
  }),
  exit: {
    opacity: 0,
    display: "fixed",
  }
}


class NameThatColour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.scrollStyle = { top: this.props.scroll + "px" };
    const styles = this.props.imageLocation;
  
    this.initialStyles = {
      opacity: 1,
      borderRadius: "10px",
      width: styles.width,
      height: styles.height,
      y: styles.y,
      x: styles.x,
      filter: styles.brightness,
      transform: styles.transform,
    }
    this.finalStyles = {
      opacity: 1,
      borderRadius: 0,
      width: "100vw",
      height: `${styles.x/styles.y/100}vw`,
      y: 0,
      x: 0,
      filter: "brightness(1)",
      transform: "rotateY(0deg) rotateX(0deg)",
    }
  }

  componentDidMount() {
    document.title = "Josh Pollard | My-Website";
    setTimeout(() => {
      this.scrollStyle = {};
    }, 1500);

  }

  render() {
    return (
      <motion.div
        className="my-website-body"

        style={this.scrollStyle}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={window}
        variants={pageVariants}
        transition={pageTransition}
      >
        <motion.img
          style={{opacity: 1}}
          initial={this.initialStyles}
          animate={this.finalStyles}
          transition={{duration: 0.5, delay: 1 }}
          layout
          className="title-img-my-website" 
          alt="Project" 
          src={`https://res.cloudinary.com/dy1xy7vkf/image/upload/${this.props.repo.name}.png`}
        />
       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat vehicula ligula et feugiat. Donec metus dui, dignissim id mollis nec, suscipit quis sapien. Nam pellentesque bibendum neque vitae ullamcorper. Quisque at elit aliquam, imperdiet nunc et, auctor enim. Fusce elementum accumsan magna, ut aliquam tellus scelerisque vel. Sed fermentum sollicitudin lorem quis rutrum. Maecenas et pellentesque turpis. Praesent vestibulum nunc ut imperdiet tincidunt. Aliquam in purus vitae elit tristique bibendum. Pellentesque mattis ullamcorper urna, non interdum est condimentum id.

Integer scelerisque metus arcu, sit amet interdum tortor sodales ac. Vestibulum sit amet purus erat. Maecenas placerat scelerisque ultrices. Quisque molestie pharetra dolor, ullamcorper fringilla enim ultricies efficitur. Proin sapien sem, luctus et leo non, suscipit elementum lacus. Vestibulum imperdiet risus quis feugiat consequat. Nullam vulputate rutrum cursus. Maecenas aliquet vel odio ut rhoncus. In elementum porttitor lacus, facilisis interdum purus dapibus et. Aliquam nunc diam, ultrices in luctus vitae, consequat in elit.

In elit felis, mattis eu purus at, dictum venenatis massa. Sed in varius ligula, vel convallis nibh. Nullam vel iaculis nisi. Suspendisse scelerisque commodo ipsum vitae ultricies. Nunc id ante eu neque maximus suscipit. Donec nec tempor turpis, nec egestas neque. Nam ultricies, velit eu convallis egestas, tortor odio venenatis tellus, vitae imperdiet nulla quam vel neque. Duis sed consequat elit. Donec convallis sollicitudin mattis. Proin laoreet nulla in nisl ullamcorper, quis scelerisque magna scelerisque. Mauris posuere, nulla ut suscipit efficitur, diam eros semper diam, sit amet interdum libero risus et tortor. Vestibulum eu lorem neque. Aenean in sapien sed felis accumsan pellentesque eu a erat. Mauris at elit non risus scelerisque faucibus.

Maecenas dignissim massa pharetra lorem gravida, ac molestie neque rhoncus. Nulla facilisi. Nam suscipit risus ut elit tempus, vitae tempus nisi feugiat. Proin id varius enim, eu fringilla elit. Praesent fermentum ac velit in lobortis. In rutrum a libero non pellentesque. Nam pretium massa id augue vehicula, non scelerisque eros pretium. Donec ac nisi est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse non maximus nunc. Phasellus vel justo id ante congue iaculis. Nulla ut rutrum sem. Donec dapibus risus a ex imperdiet, nec bibendum urna porta. Quisque ullamcorper euismod mi, ut scelerisque sem dignissim nec. Donec et mauris enim.

Nunc aliquet ipsum tincidunt felis cursus, sit amet auctor metus finibus. Donec vehicula enim molestie nisl pulvinar, luctus rutrum urna tincidunt. Phasellus ante urna, porttitor eu dictum accumsan, molestie vel nisi. Nulla nulla eros, consequat eu scelerisque interdum, placerat vulputate dolor. Nullam venenatis aliquam libero non euismod. Nulla quis ornare ipsum. Nunc malesuada ultrices purus, quis porta enim iaculis ac.</p>
      </motion.div>
    );
  }
}

export default NameThatColour;