import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
      showRegister: false
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
            title="Welcome to your Employee Tracker!"
            titleStyle={{textAlign: "center"}}
            showMenuIconButton={false}
            />
          <br />

            <br />
            <RaisedButton label="Login" primary={true} onClick={this.toggleLogin.bind(this)}
              Login />
            <div class="divider"></div>
            <RaisedButton label="Register" primary={true} onClick={this.toggleRegister.bind(this)}
              Register />
          </center>
        </MuiThemeProvider>

        {this.state.showLogin ? <Login /> : null}
        {this.state.showRegister ? <Register /> : null}
      </div>
    );
  }
}

export default App;
