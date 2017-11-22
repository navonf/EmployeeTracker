import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import IconMenu from 'material-ui/IconMenu/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import fire from '../../fire';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <center>
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
            title="Employee Tracker"
            titleStyle={{textAlign: "center"}}
            onLeftIconButtonTouchTap={this.handleToggle}
            />
            <LeftNav
                open={this.state.menuOpen}
                onRequestChange={open => this.setState({menuOpen: open})}
                docked={false}>
    
              <MenuItem onTouchTap={this.closeLeftNav} value={'/'} primaryText="Home"/>
            />
          <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         <div>

         </div>
         </MuiThemeProvider>
      </div>
      </center>
    );
  }
}

const style = {

};

export default Login;
