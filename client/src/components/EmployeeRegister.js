import React, { Component } from 'react';
import fire from './../fire';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';



import './Login.css';

class EmployeeRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      empID: 0,
      password: '',
      password2: '',
      name: '',
      groupNum: 0,
      passwordInvalid: false,
      success: false,
      emptyForm: false,
      isPrivate: false
    }
  }

  handleRegister(e) {
    if(this.state.empID === 0 || this.state.password === '' || this.state.password2 === '' || this.state.name === '') {
      this.setState({emptyForm : true});
      this.setState({passwordInvalid: false});

    }
    else if(this.state.password !== this.state.password2) {
      this.setState({passwordInvalid: true});
      this.setState({emptyForm : false});
    }
    else if(this.state.password === this.state.password2) {
      e.preventDefault();

      // update the database
      const empRef = fire.database().ref('employees');
      const emp = {
        name: this.state.name,
        empID: this.state.empID,
        password: this.state.password,
        lat: 0,
        lng: 0,
        img: '',
        loggedIn: 0,
        groupNum: this.props.groupNum,
        message: '',
        timestamp: ''
      }

      // push current attibutes to firebase
      empRef.push(emp);

      // reset state variables
      this.setState({
        empID: 0,
        password: ''
      });

      // give the success message and clear empty form message if brought up
      this.setState({emptyForm : false});
      this.setState({success : true});
    }
  }

  handleCheck(e) {
    var check = this.state.isPrivate ? false : true;
    this.setState({isPrivate: check});
  }

  render() {
    console.log("group num: " + this.props.groupNum);

    return (
      <center>
      <div>
        <MuiThemeProvider>
          <div className="form">
            <TextField
              hintText="Enter Employee Name"
              floatingLabelText="Employee Name"
              onChange = {(event,newValue) => this.setState({name:newValue})}
              />
               <br/>
            <TextField
              hintText="Enter Employee ID"
              floatingLabelText="Employee ID"
              onChange = {(event,newValue) => this.setState({empID:newValue})}
              />
              <br/>
            <TextField
              type="password"
              hintText="Enter Employee Password"
              floatingLabelText="Employee Password"
              onChange = {(event,newValue) => this.setState({password:newValue})}
              />
              <br/>
            <TextField
              type="password"
              hintText="Re-Enter Employee Password"
              floatingLabelText="Re-Enter Employee Password"
              onChange = {(event,newValue) => this.setState({password2:newValue})}
              />
              <br/>
              <br/>
            <br/>
            {this.state.isPrivate ?
            <div>
              <TextField
                type="groupNumber"
                hintText="Enter your private Group Number"
                floatingLabelText="Group Number"
                onChange = {(event,newValue) => this.setState({groupNum:newValue})}
                />
                <br/> <br/>
            </div> : null
            }
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleRegister(event)}/>
         </div>
            {this.state.success ? <h1> Employee Registered. </h1>: null}
            {this.state.passwordInvalid ? <h1> Passwords do not match! </h1>: null}
            {this.state.emptyForm ? <h1> Please fill out all fields </h1>: null}
         </MuiThemeProvider>
      </div>
      </center>
    );
  }
}


const style = {
  block: {
      maxWidth: 250,
    },
    toggle: {
      marginBottom: 16,
    },
    thumbOff: {
      backgroundColor: '#ffcccc',
    },
    trackOff: {
      backgroundColor: '#ff9d9d',
    },
    thumbSwitched: {
      backgroundColor: 'red',
    },
    trackSwitched: {
      backgroundColor: '#ff9d9d',
    },
    labelStyle: {
      color: 'red',
    },
};

export default EmployeeRegister;
