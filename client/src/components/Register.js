import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import fire from './../fire';



import './Login.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      success: false,
      emptyForm: false
    }
  }

  handleRegister(e) {
    if(this.state.username === '' || this.state.password === '') {
      this.setState({emptyForm : true});
    }
    else {
      e.preventDefault();

      // update the database
      const usersRef = fire.database().ref('users');
      const user = {
        user: this.state.username,
        password: this.state.password
      }
      usersRef.push(user);
      this.setState({
        username: '',
        password: ''
      });
      // give the success message
      this.setState({emptyForm : false});
      this.setState({success : true});
    }
  }

  render() {
    return (
      <center>
      <div>
        <MuiThemeProvider>
          <div>
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
               hintText="Enter your Password"
               floatingLabelText="Re-Enter Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />

             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleRegister(event)}/>
         </div>
            {this.state.success ? <h1> yoyo, you did it. login pls </h1>: null}
            {this.state.emptyForm ? <h1> Please fill out all fields </h1>: null}
         </MuiThemeProvider>
      </div>
      </center>
    );
  }
}

const style = {

};

export default Register;
