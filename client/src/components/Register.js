import React, { Component } from 'react';
import fire from './../fire';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import TextField from 'material-ui/TextField';



import './Login.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      password2: '',
      name: '',
      groupNum: 0,
      passwordInvalid: false,
      success: false,
      emptyForm: false,
      isPrivate: false
    }
  }

  handleRegister(e) {
    if(this.state.username === '' || this.state.password === '' || this.state.password2 === '' || this.state.name === '') {
      this.setState({emptyForm : true});
      this.setState({passwordInvalid: false});

    }
    else if(this.state.password !== this.state.password2) {
      this.setState({passwordInvalid: true});
      this.setState({emptyForm : false});
    }
    else if(this.state.password === this.state.password2) {
      e.preventDefault();

      // update the database
      const usersRef = fire.database().ref('users');
      const user = {
        name: this.state.name,
        user: this.state.username,
        password: this.state.password,
        loggedIn: 0,
        groupNum: this.state.groupNum
      }

      // push current attibutes to firebase
      usersRef.push(user);

      // reset state variables
      this.setState({
        username: '',
        password: ''
      });

      // give the success message and clear empty form message if brought up
      this.setState({emptyForm : false});
      this.setState({success : true});
    }
  }

  handleCheck(e) {
    var check = this.state.isPrivate ? false : true;
    this.setState({isPrivate: check});
  }

  render() {
    return (
      <center>
      <div>
        <MuiThemeProvider>
          <div className="form">
            <TextField
              hintText="Enter your name"
              floatingLabelText="Name"
              onChange = {(event,newValue) => this.setState({name:newValue})}
              />
               <br/>
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
            <TextField
              type="password"
              hintText="Re-Enter your Password"
              floatingLabelText="Re-Enter Password"
              onChange = {(event,newValue) => this.setState({password2:newValue})}
              />
              <br/>
              <br/>
            <Checkbox
              className="toggle"
              checkedIcon={<VisibilityOff />}
              uncheckedIcon={<Visibility />}
              label={this.state.isPrivate ? <div>Private</div> : <div>Public</div>}
              labelPosition="left"
              style={{float: "center", width: "0%"}}
              onCheck={(event) => this.handleCheck(event)}
            />
            <br/>
            {this.state.isPrivate ?
            <div>
              <TextField
                type="groupNumber"
                hintText="Enter your private Group Number"
                floatingLabelText="Group Number"
                onChange = {(event,newValue) => this.setState({groupNum:newValue})}
                />
                <br/> <br/>
            </div> : null
            }
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleRegister(event)}/>
         </div>
            {this.state.success ? <h1>Thank you for registering! Please log in.</h1>: null}
            {this.state.passwordInvalid ? <h1>Passwords do not match!</h1>: null}
            {this.state.emptyForm ? <h1>Please fill out all fields.</h1>: null}
         </MuiThemeProvider>
      </div>
      </center>
    );
  }
}


const style = {
  block: {
      maxWidth: 250,
    },
    toggle: {
      marginBottom: 16,
    },
    thumbOff: {
      backgroundColor: '#ffcccc',
    },
    trackOff: {
      backgroundColor: '#ff9d9d',
    },
    thumbSwitched: {
      backgroundColor: 'red',
    },
    trackSwitched: {
      backgroundColor: '#ff9d9d',
    },
    labelStyle: {
      color: 'red',
    },
};

export default Register;
