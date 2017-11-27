import React, { Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import fire from './../fire';
import Camera from 'react-native-camera';

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
  ActivityIndicator,
  TouchableOpacity

} from 'react-native';

const { width, height } = Dimensions.get("window");
const lockIcon = require("./login1_lock.png");
const personIcon = require("./login1_person.png");

export default class Login extends Component {
    constructor(props) {
    super(props);

    this.state = {
      isLoggingIn: false,
      message: '',
      cameraPath:''
    }

    this.handleLogin = this.handleLogin.bind(this)
  }


  // This function handles login
  handleLogin = (e) => {
    this.setState({isLoggingIn: true});
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
        //this.props.triggerLogInUpdate(key, group);

        // pull name from db
        this.setState({clientName : snapshot.val().name});

        this.setState({success : true});
        this.setState({failed : false});
        this.setState({isLoggingIn: false});
        this.props.onLoginPress();
      }
      else { // login fails
        this.setState({failed : true});
        this.setState({success : false});
        this.setState({isLoggingIn: false});
        this.setState({message: "Wrong Username or Password"});
      }
    });
  }

  takePicture() {
    const options = {};
    this.camera.capture({metadata: options})
      .then((data) => this.setState({cameraPath: data.path}))

      .catch(err => console.error(err));
  }


  render() {
    return (
      <ScrollView style={{padding: 20}}>
                <Text style={{fontSize: 27, justifyContent:'center'}}>
                    Employee Tracker: Login
                </Text>
              <TextInput
                placeholder="Username"
                onChangeText = {(username) => this.setState({username})}
                value={this.state.username}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText = {(text) => this.setState({password:text})}
              />
              {!!this.state.message && (
                    <Text style={{fontSize: 14, color: 'red', padding: 5}}>
                        {this.state.message}
                    </Text>
                )}
              {this.state.isLoggingIn && <ActivityIndicator />}
              <Button onPress= {this.handleLogin} title= "Sign In" disabled= {this.state.isLoggingIn || !this.state.username || !this.state.password}/>
              <View style={styles.container}>
                  <Camera ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    type = {Camera.constants.Type.front}>

                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                </Camera>
              </View>
              <Text style={{padding: 100, fontSize: 12, color: 'red'}}>
-                  {this.state.cameraPath}
-             </Text>

      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 300,
    marginTop: 60
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

//export default Login;
