import React, { Component } from 'react';
import {
  AppRegistry,
  PermissionsAndroid,
} from 'react-native';

import Login from './Login';
import Logout from './Logout';




export default class Home extends Component {

  state = {
    loggedIn: 0,
    username: '',
    password: '',
    failed: false,
    clientName: '',
    userKey: '',
  }

  async requestPermission() {
  try {
    const grantedCamera = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': 'Employee Tracker: Camera Permission',
        'message': 'Employee Tracker: needs access to your camera ' +
                   'so you can take awesome pictures.'
      }
    )
    const grantedLoc = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Employee Tracker: Location Permission',
        'message': 'Employee Tracker: needs access to your camera ' +
                   'so you can take awesome pictures.'
      }
    )
    const grantedRead = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        'title': 'Employee Tracker: Read Storage',
        'message': 'Employee Tracker: needs access to your camera ' +
                   'so you can take awesome pictures.'
      }
    )
    const grantedWrite = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'Employee Tracker: Write Storage',
        'message': 'Employee Tracker: needs access to your camera ' +
                   'so you can take awesome pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera")
    } else {
      console.log("Camera permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
  }

  updateState(data){
      this.setState(data);
  }

  componentDidMount() {
      this.requestPermission();
  }




  render() {

    if (this.state.isLoggedIn)
      return <Logout username = {this.state.username} userKey={this.state.userKey} onLogoutPress={() => this.setState({isLoggedIn: 0})} />;
    else
      return <Login updateParentState={this.updateState.bind(this)} onLoginPress={() => this.setState({isLoggedIn: 1})}
        />;
  }

}
