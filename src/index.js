import React from 'react';
import ReactDOM from 'react-dom';
import './styles//index.css';
import App from './App';
import * as firebase from "firebase/app";
import "firebase/analytics";
import {   BrowserRouter as Router } from 'react-router-dom';


const firebaseConfig = {
  apiKey: "AIzaSyDwMViQImZb2if43NInF2sriqHa-8KLOkc",
  authDomain: "my-website-bc04e.firebaseapp.com",
  databaseURL: "https://my-website-bc04e.firebaseio.com",
  projectId: "my-website-bc04e",
  storageBucket: "my-website-bc04e.appspot.com",
  messagingSenderId: "433226977936",
  appId: "1:433226977936:web:313289fedc628585ae3e15",
  measurementId: "G-W5WR0MZ00B"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <Router>
    <App/>
  </Router>
, document.getElementById('root'));