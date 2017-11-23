import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
      password2: '',
      passwordInvalid: false,
      success: false,
      emptyForm: false
    }
  }

  handleRegister(e) {
    if(this.state.username === '' || this.state.password === '' || this.state.password2 === '') {
      this.setState({emptyForm : true});
      this.setState({passwordInvalid: false});

    }
    else if(this.state.password != this.state.password2) {
      this.setState({passwordInvalid: true});
      this.setState({emptyForm : false});
    }
    else if(this.state.password === this.state.password2) {
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

      // give the success message and clear empty form message if brought up
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
               onChange = {(event,newValue) => this.setState({password2:newValue})}
               />

             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleRegister(event)}/>
         </div>
            {this.state.success ? <h1> yoyo, you did it. login pls </h1>: null}
            {this.state.passwordInvalid ? <h1> Passwords do not match! </h1>: null}
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
