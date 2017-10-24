import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Employee Tracker</h1>
        </header>
        <div className="App-input">
          <ul className="Landing-form">
            <li>
              <label>
                Username:
                <input type="text" name="name" />
              </label>
            </li>
            <li className="List-elem">
              <label>
                Password:
                <input type="text" name="name" />
              </label>
            </li>
            <li className="List-elem">
              <input type="submit" value="Submit" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
