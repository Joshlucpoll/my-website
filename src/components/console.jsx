import React from "react";
import SimpleStorage from "react-simple-storage";
import { motion } from "framer-motion";

import ConsoleIcon from "../assets/console_icon.svg"
import "../styles/console.scss";

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outputList: [],
      commandList: [],
      historyLocation: null,
      value: "",
      consoleOpen: false,
      placeHolderText: "",
    };
    this.baseState = this.state;
    this.setState({ consoleOpen: false });
    this.consoleInput = React.createRef();

    this.dir = [
      // {
      //   name: "root",
      //   id: 1,
      //   parentId: null,
      //   children: [2, 3],
      // },
      {
        name: "",
        id: 1,
        parentId: null,
        children: [2]
      },
      {
        name: "projects",
        id: 2,
        parentId: 1,
        children: [3, 4]
      },
      {
        name: "battleships",
        id: 3,
        parentId: 2,
        children: [null]
      },
      {
        name: "my-website",
        id: 4,
        parentId: 2,
        children: [null]
      }
    ];
  }

  addToConsole(string) {
    let newOutputList = this.state.outputList;
    newOutputList.unshift(string);

    this.setState({outputList: newOutputList});
  }

  commandProcessor(commandLineRaw) {
    // Converts command line to lowercase
    const commandLine = commandLineRaw.toLowerCase();

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
          this.props.changeDirectory("");
        }
        else if (value ===  "..") {
          try {
            // finds name of the current directories parent
            const currentDirArray = this.props.currentDirectory.split("/");
            const currentDir = currentDirArray[currentDirArray.length - 1];
            const parentId = this.dir.find(x => x.name === currentDir).parentId;
            const parentName = this.dir.find(x => x.id === parentId).name;

            this.props.changeDirectory(parentName);
          }
          catch(err) {
            this.props.changeDirectory("");
          }
        }
        else {
          this.props.changeDirectory(value);
        }
        this.closeConsole();
        this.setState({ historyLocation: null })
        break;

      case "ls":
        this.addToConsole("");
        this.addToConsole(".");
        if (window.location.pathname !== "/") {
          this.addToConsole("..");
        }
        try {
          
          // gets the last "directory" in the path of the URL
          const currentDirArray = this.props.currentDirectory.split("/");
          const currentDir = currentDirArray[currentDirArray.length - 1];

          const currentId = this.dir.find(x => x.name === currentDir).id;
        
          const childrenIds = this.dir.find(x => x.id === currentId).children;
          let childrenNames = [];
          childrenIds.forEach(childId => {
            childrenNames.push(this.dir.find(x => x.id === childId).name);
          });
        
          childrenNames.forEach(element => {
            this.addToConsole(element);
          });
        }
        catch(err) {
          break;
        }
        break;

      case "pwd":
        this.addToConsole("");
        this.addToConsole(window.location.pathname);
        break;
      
      case "history":
        this.addToConsole("");
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
          this.addToConsole("ls ------- Used to list pages in current directory (WIP)")
          this.addToConsole("cd ------- Used to change directory")
          this.addToConsole("history -- Used to view command history")
          this.addToConsole("clear ---- Used clear the console view")
          this.addToConsole("rm ------- Used to reset console to default")
          this.addToConsole("exit ----- Used to close the console view")
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
    if (this.state.consoleOpen === false) {
      this.props.changeDirectory(window.location.pathname);
      this.setState({
        consoleOpen: true,
      });
      this.forceUpdate(() => {this.consoleInput.current.focus();});
      setTimeout(() => {
          if (this.state.consoleOpen === true) {
            this.setState({ placeHolderText: '🤔 ⌨️"help"' }, this.forceUpdate());
          }
        }
      ,3000)
    }
  }
  
  closeConsole() {
    if (this.state.consoleOpen === true) {
      this.consoleInput.current.blur();
      this.setState({consoleOpen: false});
      this.setState({ placeHolderText: "" }, this.forceUpdate());
    }
  }
  
  // Event listeners for key presses
  componentDidMount() {
    document.addEventListener("keydown", (e) => this.handleKey(e), false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", (e) => this.handleKey(e), false);
  }

  previousCommand(direction) {
    if (this.state.commandList.length !== 0) {
      if (direction === "up") {
        if (this.state.historyLocation === null) {
          this.setState({
            value: this.state.commandList[0],
            historyLocation: 0,
          });
        }
        else {
          if (this.state.historyLocation !== (this.state.commandList.length - 1)) {
            this.setState({
              value: this.state.commandList[(this.state.historyLocation + 1)],
              historyLocation: this.state.historyLocation + 1,
            });
          }
        }
      }
      else if (direction === "down") {
        if (this.state.historyLocation !== null) {
          if (this.state.historyLocation !== 0) {
            this.setState({
              value: this.state.commandList[(this.state.historyLocation - 1)],
              historyLocation: this.state.historyLocation - 1,
            });
          }
        }
      }
    }
    this.consoleInput.current.selectionStart = this.consoleInput.current.value.length;
    this.consoleInput.current.selectionEnd = this.consoleInput.current.value.length;
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
    // up arrow (cycle previous commands)
    if (e.keyCode === 38) {
      this.previousCommand("up");
    }
    // down arrow (cycle previous commands)
    if (e.keyCode === 40) {
      this.previousCommand("down");
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
    this.setState({
      value: e.target.value,
      historyLocation: null,
      placeHolderText: "",
    });
  }

  handleKeyDown(e) {
    // Prevents cursor change with up/down arrows
    if(e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault();
    }
  }

  render() {
    if (this.state.outputList.length === 0) {
      this.outputItems = null;
    } else {
      this.outputItems = this.state.outputList.map(function (item, index) {
        return <div className="item" key={index}> {item} </div>;
      });
    }

    const variants = {
      open: { opacity: 1, scale: 1 },
      closed: { opacity: 0, scale: 0 },
    }
    return (
      <div className="console-container">
        <SimpleStorage parent={this}/>
        <motion.div
          className="console-tab"
          onClick={(e) => this.handleClick(e)}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ 
            delay: 5.5, 
            duration: 1,
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
        >
          <img src={ConsoleIcon} alt="Terminal"/>
        </motion.div>
        <motion.div
          initial="closed"
          animate={this.state.consoleOpen ? "open" : "closed"}
          transition={  { 
            duration: 1,
            delay: 0.1,
            type: "spring",
            stiffness: 200,
            damping: 23
          }}
          style={{ originX: 1, originY: 0 }}
          variants={variants}
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
                    placeholder={this.state.placeHolderText}
                    value={this.state.value}
                    onChange={(e) => this.handleChange(e)}
                    onKeyDown={(e) => this.handleKeyDown(e)}
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
        </motion.div>
      </div>
    );
  }
}

export default Console;