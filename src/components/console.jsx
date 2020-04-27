import React from "react";
import SimpleStorage from "react-simple-storage";
import styled, {keyframes} from "styled-components";
import {bounceInLeft} from "react-animations";

import ConsoleIcon from "../assets/console_icon.svg"
import "../styles/console.scss";

const BounceIn = styled.div`animation: .5s ${keyframes`${bounceInLeft}`}`;

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outputList: [],
      commandList: [],
      currentDirectory: "~",
      value: "",
      consoleOpen: false,
    };
    this.baseState = this.state;
    this.consoleInput = React.createRef();
  }

  addToConsole(string) {
    let newOutputList = this.state.outputList;
    newOutputList.unshift(string);

    this.setState({outputList: newOutputList});
  }

  commandProcessor(commandLine) {
    // Updating output array
    this.addToConsole("> " + commandLine);
    
    let newCommandList = this.state.commandList;
    newCommandList.unshift(commandLine);
    this.setState({commandList: newCommandList})

    // Splitting command line into command + arguments
    const words = commandLine.split(" ");
    const command = words[0];
    const value = words[1];

    switch(command) {
      case "cd":
        this.setState({ currentDirectory: value });
        this.addToConsole("⠀‎");
        break;
      
      case "history":
        // Needs fixing
        let history = this.state.commandList;
        let count = 1;
        for (let i = history.length; i > 0; i--) {
          let value = history[i - 1];
          value = count + " " + value;
          this.addToConsole(value);
          count++;
        }
        this.addToConsole("⠀‎");
        break;
      
      case "rm":
        this.setState(this.baseState);
        break;
        
      case "clear":
        this.setState({ outputList: [] });
        break;
      
        default:
          this.addToConsole(commandLine + ": command not found");
          this.addToConsole("⠀‎");
    }
  }
  
  
  openConsole() {
    this.setState({consoleOpen: true});
    this.forceUpdate(() => {this.consoleInput.current.focus();});
  }
  
  closeConsole() {
    this.consoleInput.current.blur();
    this.setState({consoleOpen: false});
    this.forceUpdate();
  }
  
  // Event listeners for key presses
  componentDidMount() {
    document.addEventListener("keydown", (e) => this.handleKey(e), false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", (e) => this.handleKey(e), false);
  }
  
  handleKey(e) {
    console.log("Key")
    // esc (close output)
    if (e.keyCode === 27) {
      this.closeConsole();
    }
    // shift (open output)
    if (e.keyCode === 16) {
      this.openConsole();
    }
  }

  handleClick(e) {
    if (this.state.consoleOpen === true) {
      this.closeConsole();
    } else {
      this.openConsole();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.commandProcessor(this.state.value);
    this.setState({value: ""});
  }
  
  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    if (this.state.outputList.length === 0) {
      this.outputItems = null;
    } else {
      this.outputItems = this.state.outputList.map(function (item) {
        return <div className="item"> {item} </div>;
      });
    }
    
    return (
      <div className="console-container">
        <SimpleStorage parent={this} />
        <div
          className="console-tab"
          onClick={(e) => this.handleClick(e)}
        >
          <img src={ConsoleIcon} alt="Terminal"/>
        </div>
          {this.state.consoleOpen === true && 
            <BounceIn>
              <div
              className="console">
                <div className="console-body">
                  <div className="console-text-short">></div>
                    <form
                      className="console-input"
                      onSubmit={(e) => this.handleSubmit(e)}
                    >
                      <input
                        ref={this.consoleInput}
                        type="text"
                        value={this.state.value}
                        onChange={(e) => this.handleChange(e)}
                        // onFocus={() => this.openConsole()}
                        // onBlur={() => this.closeConsole()}
                      />
                    </form>
                </div>
                <div
                  className="console-output">
                  <div className="output-list-container">
                    <div className="output-list">
                      {this.outputItems}
                    </div>
                  </div> 
                </div>
              </div>
            </BounceIn>
          }
      </div>
    );
  }
}

export default Console;