import React from "react";
import { Redirect } from "react-router-dom"
// import SimpleStorage from "react-simple-storage";
import { CSSTransition } from "react-transition-group";

import ConsoleIcon from "../assets/console_icon.svg"
import "../styles/console.scss";

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outputList: [],
      commandList: [],
      currentDirectory: window.location.pathname,
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
    this.addToConsole("⠀‎");
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
        if (value === "~") {
          this.setState({ currentDirectory: "/" });
        }
        else {
          this.setState({ currentDirectory: value });
        }
        this.closeConsole();
        break;
      
      case "history":
        let history = this.state.commandList;
        let count = 1;
        for (let i = history.length; i > 0; i--) {
          let value = history[i - 1];
          value = count + " " + value;
          this.addToConsole(value);
          count++;
        }
        break;
      
      case "rm":
        this.setState(this.baseState);
        break;
        
      case "clear":
        this.setState({ outputList: [] });
        break;
    
      case "exit":
        this.closeConsole();
        break;
      
      case "help":
        if (value === "commands") {
          this.addToConsole("ls -- Used to list pages in current directory (WIP)")
          this.addToConsole("cd -- Used to change directory")
          this.addToConsole("history -- Used to view command history")
          this.addToConsole("clear -- Used clear the console view")
          this.addToConsole("exit -- Used to close the console view")
        }
        else {
          this.addToConsole("This website uses UNIX commands to navigate through pages. If you need help with commands type 'help commands'");
        }
        break;
        
      default:
        this.addToConsole(commandLine + ": command not found");
    }
  }
  
  openConsole() {
    this.setState({
      consoleOpen: true,
      currentDirectory: window.location.pathname
    });
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
      this.outputItems = this.state.outputList.map(function (item, index) {
        return <div className="item" key={index}> {item} </div>;
      });
    }
    
    return (
      <div className="console-container">
        {/* <SimpleStorage parent={this} blacklist={ ["currentDirectory"] }/> */}
        <div
          className="console-tab"
          onClick={(e) => this.handleClick(e)}
        >
          <img src={ConsoleIcon} alt="Terminal"/>
        </div>
          <CSSTransition
            in={this.state.consoleOpen}
            timeout={300}
            classNames="window"
            unmountOnExit
            appear
          >
            <div className="console">
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
          </CSSTransition>
          
          {this.state.currentDirectory !== window.location.pathname &&
            <Redirect to={this.state.currentDirectory}/>
          }
      </div>
    );
  }
}

export default Console;