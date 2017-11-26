import React, { Component } from 'react';
import {   AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button, TouchableOpacity} from 'react-native';

import Login from './Login';

export default class App extends Component {

    constructor(props) {
      super(props);

      this.state = {
        showLogin: false,
        showRegister: false,
        startButtons: true,
        success: false,
        drawerOpened: false,
        showEmployees: false,
        loggedIn: 0,
        groupNum: 0,
        needsToSignIn: false,
        loggedOut: false,
        userKey: '',
        employeez: [],
        name: ''
      }

      this.updateLogIn = this.updateLogIn.bind(this);
    }

    toggleLogin() {
      var show = this.state.showLogin ? false : true;
      this.setState({showLogin : show});
      this.setState({showRegister : false});
    }

    toggleRegister() {
      var show = this.state.showRegister ? false : true;
      this.setState({showRegister : show});
      this.setState({showLogin : false});
    }

    openDrawer() {
      this.setState({drawerOpened: true});

    }

    goToHome() {
      this.setState({drawerOpened: false});
      this.setState({showEmployees: false});

      // our destination
      this.setState({needsToSignIn: false});
      this.setState({loggedOut: false});

      this.setState({startButtons: true});
    }

    goToEmployees() {
      if(this.state.loggedIn === 1) {
        this.setState({needsToSignIn: false});
        this.setState({drawerOpened: false});
        this.setState({startButtons: false});
        this.setState({showRegister : false});
        this.setState({showLogin : false});

        // our destination
        this.setState({showEmployees: true});
      }
      else {
        this.setState({needsToSignIn: true});
      }
    }


    // gets the all information needed from the user
    updateLogIn(key, num, name) {

      // store my employees in here?????
      // var employees = {
      //   "name" : '',
      //   "groupNum": 0,
      //   "latitude": 0,
      //   "longitude": 0
      // };

      this.setState({loggedIn: 1});
      console.log("you passed login!: " + this.state.loggedIn + ", userkey: " + key + ", group num: " + num);
      this.setState({userKey : key});
      this.setState({groupNum : num});
      this.setState({name: name});

      const employeesRef = fire.database().ref('employees');
      var employees = [];
      employeesRef
        .on('child_added', (snapshot) => {
          // console.log(snapshot.val());
          if(snapshot.val().groupNum === num) {
            employees.push(snapshot.val());
          }
      });

      this.setState({employeez: employees});
    }

    signOut() {
      this.setState({loggedIn : 0});
      this.setState({loggedOut: true});

      const usersRef = fire.database().ref('users');
      usersRef
        .on('child_added', (snapshot) => {
        snapshot.ref.update({loggedIn: 0});
      });
    }

  render() {
      return (
          <View style={styles.container}>
              <Login />
          </View>
    );
   }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
});
