import React from 'react';
import './styles/App.scss';
import Logo from './img/JP-Logo-v1.png';

function LongShadow(props) {
  return (
    <div id={props.id} className="long-shadow">{props.text}</div>
  )
}

function App() {
  return (
    <div className="app">
        <header className="app-header">
          {/* <i class="fas fa-ellipsis-h fa-3x menu-icon"></i>
          <img scr={Logo} alt="Logo"/> */}
        </header>
        <div className="app-body">
          <div id="title-container">
            <LongShadow id={"headline-title"} text={"Josh Pollard"}/>
          </div>
        </div>
    </div>

  );
}

export default App;
