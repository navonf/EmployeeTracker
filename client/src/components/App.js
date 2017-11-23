import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showLogin: false,
      showRegister: false,
      startButtons: true
    }
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

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <center>
          <AppBar
            title="Employee Tracker"
            titleStyle={{textAlign: "center"}}
            showMenuIconButton={false}
            />
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

        {this.state.showLogin ? <Login /> : null}
        {this.state.showRegister ? <Register /> : null}
      </div>
    );
  }
}

export default App;
