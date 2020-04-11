import React from "react";

class Console extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      outputList: [],
      currentDirectory: "~",
      value: "",
      outputView: false,
    };
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

  openOutput() {
    this.consoleOutput.style = "opacity: 1;";
    this.list.style = "opacity: 1;";
  }

  closeOutput() {
    this.consoleOutput.style = "opacity: 0;";
    this.list.style = "opacity: 0;";
  }

  handleKey(e) {
    // esc (close output)
    if (e.keyCode === 27) {
      this.closeOutput();
      this.consoleInput.blur();
    }
    // ctrl (open output)
    if (e.keyCode === 17) {
      this.openOutput();
      this.consoleInput.focus();
    }
  }

  // Event listeners for keys
  componentDidMount() {
    document.addEventListener("keydown", (e) => this.handleKey(e), false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", (e) => this.handleKey(e), false);
  }

  handleClick(e) {
    this.consoleInput.focus();
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    if (this.state.outputList.length === 0) {
      this.outputItems = null;
    } else {
      this.outputItems = this.state.outputList.map(function (item) {
        return <li> {item} </li>;
      });
    }
    if (window.matchMedia("(max-width: 600px)").matches === false) {
      this.consoleText = (
        <div className="console-text-long">
          client@joshlucpoll.com
          <span className="console-white">:</span>
          <span className="current-directory">
            {this.state.currentDirectory}
          </span>
          <span className="console-white">$</span>
        </div>
      );
    } else {
      this.consoleText = <div className="console-text-short">></div>;
    }

    return (
      <div className="console-container">
        <div className="console">
          <div className="console-body" onClick={(e) => this.handleClick(e)}>
            {this.consoleText}
            {/* <div className="console-input-container"> */}
              <form
                className="console-input"
                onSubmit={(e) => this.handleSubmit(e)}
              >
                <input
                  ref={(input) => {
                    this.consoleInput = input;
                  }}
                  type="text"
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                  onFocus={() => this.openOutput()}
                  onBlur={() => this.closeOutput()}
                />
              </form>
            {/* </div> */}
          </div>
          <div
            className="console-output"
            ref={(div) => {
              this.consoleOutput = div;
            }}
          >
            <ol
              ref={(list) => {
                this.list = list;
              }}
            >
              {this.outputItems}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Console;