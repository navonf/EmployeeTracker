import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import EmployeeRegister from './EmployeeRegister';
import Map from './Map';
import fire from './../fire';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      showRegister: false,
      startButtons: true,
      success: false,
      drawerOpened: false,
      showEmployeesMap: false,
      showEmployeesRegister: false,
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
    // turn these off
    this.setState({drawerOpened: false});
    this.setState({showEmployeesMap: false});
    this.setState({needsToSignIn: false});
    this.setState({loggedOut: false});
    this.setState({showEmployeesRegister: false});

    this.setState({startButtons: true});
  }

  goToEmployees() {
    if(this.state.loggedIn === 1) {
      // turn these components off
      this.setState({needsToSignIn: false});
      this.setState({drawerOpened: false});
      this.setState({startButtons: false});
      this.setState({showRegister : false});
      this.setState({showLogin : false});
      this.setState({showEmployeesRegister: false});

      // our destination
      this.setState({showEmployeesMap: true});
    }
    else {
      this.setState({needsToSignIn: true});
    }
  }

  goToEmployeeRegister() {
    if(this.state.loggedIn === 1) {
      this.setState({needsToSignIn: false});
      this.setState({drawerOpened: false});
      this.setState({startButtons: false});
      this.setState({showRegister : false});
      this.setState({showLogin : false});
      this.setState({showEmployeesMap: false});

      // our destination
      this.setState({showEmployeesRegister: true});
    }
    else {
      this.setState({needsToSignIn: true});
    }
  }


  // gets the all information needed from the user
  updateLogIn(key, num, name) {

    this.setState({loggedIn: 1});
    console.log("you passed login!: " + this.state.loggedIn + ", userkey: " + key + ", group num: " + num);
    this.setState({userKey : key});
    this.setState({groupNum : num});
    this.setState({name: name});

    const employeesRef = fire.database().ref('employees');
    var employees = [];
    employeesRef
      .on('child_added', (snapshot) => {
        if(snapshot.val().groupNum === num && snapshot.val().loggedIn === 1) {
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
      <div>
        <MuiThemeProvider>
          <center>
          <AppBar
            title={this.state.loggedIn === 1 ?
              <div>Employee Tracker - Admin View : {this.state.name}</div>
              : <div> Employee Tracker - Admin View </div>}
            titleStyle={{textAlign: "center"}}
            onLeftIconButtonTouchTap={() => this.openDrawer()}
            />
          <Drawer
            docked={false}
            width={180}
            open={this.state.drawerOpened}>
            <MenuItem onClick={() => this.goToHome()}>Home</MenuItem>
            <MenuItem onClick={() => this.goToEmployees()}>Employee View</MenuItem>
            <MenuItem onClick={() => this.goToEmployeeRegister()}>Register Employees</MenuItem>
            <MenuItem onClick={() => this.signOut()}>Sign Out</MenuItem>
          </Drawer>
          {this.state.startButtons ?
            <div> <br /> <br />
            <RaisedButton label="Login" primary={true} onClick={this.toggleLogin.bind(this)}
              Login />
            <div className="divider"></div>
            <RaisedButton label="Register" primary={true} onClick={this.toggleRegister.bind(this)}
              Register />
            </div> : null
          }
          </center>
        </MuiThemeProvider>

        {this.state.showLogin ? <Login triggerLogInUpdate={this.updateLogIn}/> : null}
        {this.state.showRegister ? <Register /> : null}
        {this.state.showEmployeesMap ? <Map num={this.state.groupNum} employees={this.state.employeez}/> : null}
        {this.state.showEmployeesRegister ? <EmployeeRegister groupNum={this.state.groupNum}/> : null}
        {this.state.loggedOut ? <center><h1>User {this.state.name} is now logged out.</h1></center> : null}
        {this.state.needsToSignIn ? <center><h1>Please log in to view this!</h1></center> : null}
      </div>
    );
  }
}

export default App;
