import React from "react"

import { motion } from "framer-motion";

import Github from "../assets/social_icons/github.svg";
import Twitter from "../assets/social_icons/twitter.svg";
import StackOverflow from "../assets/social_icons/stackoverflow.svg";
import LinkedIn from "../assets/social_icons/linkedin.svg"
import Email from "../assets/social_icons/gmail.svg";

import "../styles/socialBar.scss";

function SocialBar() {
  return (
    <motion.div 
      className="social-bar-container"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ 
        delay: 2, 
        duration: 1,
        type: "spring",
        stiffness: 300,
        damping: 15
      }}
    > 
      <a href="https://github.com/joshlucpoll" target="_blank" rel="noopener noreferrer">
        <div className="github">
          <img src={Github} alt="Github"/>
        </div>
      </a>
      <a href="https://twitter.com/Joshlucpoll" target="_blank" rel="noopener noreferrer">
        <div className="twitter">
          <img src={Twitter} alt="Twitter"/>
        </div>
      </a>
      <a href="https://stackoverflow.com/users/10472451/joshlucpoll" target="_blank" rel="noopener noreferrer">
        <div className="stackoverflow">
          <img src={StackOverflow} alt="StackOverflow"/>
        </div>
      </a>
      <a href="https://www.linkedin.com/in/joshlucpoll" target="_blank" rel="noopener noreferrer">
        <div className="linkedin">
          <img src={LinkedIn} alt="LinkedIn"/>
        </div>
      </a>
      <a href="mailto:info@joshlucpoll.com" target="_blank" rel="noopener noreferrer">
        <div className="email">
          <img src={Email} alt="Email"/>
        </div>
      </a>
    </motion.div>
  );
}




export default SocialBar;