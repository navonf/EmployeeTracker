import React, { Component } from 'react';
import fire from './../fire';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



import './Login.css';

class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      name: '',
      groupNum: 0
    }
  }

  render() {
    return (
      <center>
      <div>
        <MuiThemeProvider>
          <h1> yoo </h1>
        </MuiThemeProvider>
      </div>
      </center>
    );
  }
}



export default Employees;