import React, { Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import fire from './../fire';
import {
  AppRegistry,
  ToolbarAndroid,
  StyleSheet,
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
      <View style={styles.container}>

        <ToolbarAndroid title="Employee Tracker" titleColor = 'white' style={styles.toolbar}/>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                placeholder="Username"
                placeholderTextColor="#FFF"
                style={styles.input}
                onChangeText = {(username) => this.setState({username})}
                value={this.state.username}
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                placeholderTextColor="#FFF"
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                onChangeText = {(text) => this.setState({password:text})}
              />
            </View>

            <TouchableOpacity onPress={this.handleLogin} activeOpacity={.5}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  toolbar: {
      //flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      //marginLeft: 'auto',
      //marginRight: 'auto',
      //width: 600,
      height:50,
      backgroundColor: "#FF3365",
      //position: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: "#CCC"
  },
  button: {
    backgroundColor: "#FF3365",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  accountText: {
    color: "#D8D8D8"
  },
});
//export default Login;
