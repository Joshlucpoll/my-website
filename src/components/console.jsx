import React from "react";
import SimpleStorage from "react-simple-storage";
// import styled, {keyframes, css} from "styled-components";
// import {bounceInLeft} from "react-animations";

import "../styles/console.scss";

// const bouceInStyle = {
//   animation: 2s ${keyframes${bounceInLeft}}
// }


class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      outputList: [],
      currentDirectory: "~",
      value: "",
      consoleOpen: false,
    };
    this.consoleInput = React.createRef();
  }

  commandProcessor(commandLine) {
    // Updating output array
    let newOutput = this.state.outputList;
    newOutput.unshift(commandLine);
    this.setState({ outputList: newOutput });

    // Splitting command line into command + arguments
    const words = commandLine.split(" ");
    const command = words[0];
    const value = words[1];

    if (command === "cd") {
      this.setState({ currentDirectory: value });
    }
    if (command === "history") {
      // Needs fixing
      const newOutput = this.state.outputList;
      const history = this.state.history;

      for (let i = 1; i < history.length; i++) {
        let value = history[i - 1];
        value = i + " " + value;
        history[i - 1] = value;
      }

      Array.prototype.push.apply(newOutput, history);
      this.setState({ outputList: newOutput });
    }
    if (command === "rm") {
      this.clearStorage();
    }
    if (command === "clear") {
      this.setState({ outputList: [] });
    }
  }

  handleSubmit(e) {
    this.commandProcessor(this.state.value);
    // Updating history array
    let newHistory = this.state.history;
    newHistory.push(this.state.value);
    
    this.setState({
      history: newHistory,
      value: "",
    });
    e.preventDefault();
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

  handleKey(e) {
    // esc (close output)
    if (e.keyCode === 27) {
      this.closeConsole();
    }
    // ctrl (open output)
    if (e.keyCode === 17) {
      this.openConsole();
    }
  }
  
  // Event listeners for key presses
  componentDidMount() {
    document.addEventListener("keydown", (e) => this.handleKey(e), false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", (e) => this.handleKey(e), false);
  }
  
  handleClick(e) {
    if (this.state.consoleOpen === true) {
      this.closeConsole();
    } else {
      this.openConsole();
    }
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
        ></div>
          {this.state.consoleOpen === true && 
            <div
            className="console"
            ref={(div) => {
              this.console = div;
            }}
            >
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
                  <div className="output-list"
                    ref={(list) => {
                      this.list = list;
                    }}
                  >
                    {this.outputItems}
                  </div>
                </div> 
              </div>
            </div>
          }
      </div>
    );
  }
}

export default Console;