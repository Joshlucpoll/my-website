import React from "react"

import Github from "../assets/social_icons/github.svg";
import Twitter from "../assets/social_icons/twitter.svg";
import StackOverflow from "../assets/social_icons/stackoverflow.svg";
import LinkedIn from "../assets/social_icons/linkedin.svg"
import Email from "../assets/social_icons/gmail.svg";

import "../styles/socialBar.scss";

class SocialBar extends React.Component {
  render() {
    return (
      <div className="social-bar-container"> 
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
              <img src={LinkedIn} alt="CodeSandbox"/>
            </div>
          </a>
          <a href="mailto:info@joshlucpoll.com" target="_blank" rel="noopener noreferrer">
            <div className="email">
              <img src={Email} alt="Email"/>
            </div>
          </a>
      </div>
    );
  }
}



export default SocialBar;