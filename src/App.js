import React from 'react';
import './styles/App.scss';
import Logo from './img/JP-Logo-v1.png';

function LongShadow(props) {
  return (
    <div className="long-shadow">{props.text}</div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <LongShadow text={"Hello"}/>
        <img className="App-logo" src={Logo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. Hosted on Firebase.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>

  );
}

export default App;
