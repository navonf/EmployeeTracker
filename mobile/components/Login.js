import React, { Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import fire from './../fire';
import {
  AppRegistry,
  ToolbarAndroid,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get("window");
const lockIcon = require("./login1_lock.png");
const personIcon = require("./login1_person.png");

export default class Login extends Component {
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
    const usersRef = fire.database().ref('employees');
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
      <ScrollView style={{padding: 20}}>
                <Text
                    style={{fontSize: 27, justifyContent:'center'}}>
                    Employee Tracker: Login
                </Text>
              <TextInput
                placeholder="Username"
                onChangeText = {(username) => this.setState({username})}
                value={this.state.username}
              />
              <Text style={{padding: 10, fontSize: 12, color: 'red'}}>
                  {this.state.username}
              </Text>
              <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText = {(text) => this.setState({password:text})}
              />

              <Button onPress= {this.handleLogin} title= "Sign In" />

      </ScrollView>
    );
  }
}

//export default Login;
