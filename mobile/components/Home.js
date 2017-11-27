import React, { Component } from 'react';
import {
  AppRegistry
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

  updateState(data){
	  this.setState(data);
  }


  render() {

    if (this.state.isLoggedIn)
      return <Logout username = {this.state.username} onLogoutPress={() => this.setState({isLoggedIn: 0})} />;
    else
      return <Login updateParentState={this.updateState.bind(this)} onLoginPress={() => this.setState({isLoggedIn: 1})}
        />;
  }

}
