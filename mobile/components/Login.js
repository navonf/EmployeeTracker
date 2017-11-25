import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import fire from './../fire';

//import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      failed: false,
      clientName: '',
      userKey: ''
    }
  }

  // This function handles login
  handleLogin(e) {
    e.preventDefault();
    const user = this.state.username;
    const pass = this.state.password;
    const usersRef = fire.database().ref('users');
    usersRef
      .on('child_added', (snapshot) => {
      if(snapshot.val().user === user && snapshot.val().password === pass) {
        this.setState({userKey : snapshot.key});
        console.log("this is your password:" + snapshot.val().password);
        console.log("this is your username:" + snapshot.val().user);


        // set loggon attribute to 1, indicating user is logged on
        snapshot.ref.update({loggedIn: 1});

        // things we need to send to app.js
        const key = snapshot.key;
        const group = snapshot.val().groupNum;
        // the function to trigger in
        this.props.triggerLogInUpdate(key, group);

        // pull name from db
        this.setState({clientName : snapshot.val().name});

        this.setState({success : true});
        this.setState({failed : false});
      }
      else { // login fails
        this.setState({failed : true});
        this.setState({success : false});
      }
    });
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
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleLogin(event)}/>
         </div>
         </MuiThemeProvider>
         {this.state.success ? <h1> hello {this.state.clientName}! you are logged in. </h1> : null}
         {this.state.failed ? <h1> wrong username or password </h1> : null}
      </div>
      </center>
    );
  }
}

const style = {

};

export default Login;
