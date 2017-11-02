import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div class="wrapper">
          <div class="box sidebar">Sidebar</div>
          <div class="box content">Content</div>
            <div class="box footer">Footer</div>
          </div>
      </div>
    );
  }
}

export default App;
