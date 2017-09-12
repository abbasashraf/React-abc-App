import React, { Component } from 'react';
import './App.css';
import EasyABC from "./easyabc.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Easy abc</h1> 
        </div>
        <EasyABC/>
      </div>
    );
  }
}

export default App;
