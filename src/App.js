import React from 'react';
import './styles/App.scss';

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
        <img className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
      {/* The core Firebase JS SDK is always required and must be listed first */}
      <script src="/__/firebase/7.11.0/firebase-app.js"></script>
  
      {/* TODO: Add SDKs for Firebase products that you want to use */}
          {/* {https://firebase.google.com/docs/web/setup#available-libraries */}
      <script src="/__/firebase/7.11.0/firebase-analytics.js"></script>
  
      {/* <!-- Initialize Firebase --> */}
      <script src="/__/firebase/init.js"></script>
    </div>

  );
}

export default App;
