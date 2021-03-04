import React from 'react';
import logo from './logo.svg';
import './App.css';
import Visualization from "./components/example/Visualization.js"
import Animation from "./components/logo/Animation.js"

function App() {
  if(true) {
    return (
        <Visualization/>
    );
  }
  else{
    return (
        <Animation />
    )
  }
}

export default App;
