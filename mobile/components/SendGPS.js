import React, { Component, Navigator } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button
} from 'react-native';
import fire from './../fire';
import TimerMixin from 'react-timer-mixin';


export default class SendGPS extends Component {
    mixins: [TimerMixin];

    constructor(props) {
        super(props);

        this.state = {
          latitude: null,
          longitude: null,
          error: null,
          message: 'hello',
        };
        this.updateGPS = this.updateGPS.bind(this)
    }



async updateGPS() {
        //this.setState({message:snaps});
        const usersRef = fire.database().ref('employees');
        usersRef
          .on('child_changed', (snapshot) => {
          if(snapshot.val().empID === this.props.username) {
            //this.setState({userKey : snapshot.key});
            //console.log("this is your password:" + snapshot.val().password);
            //console.log("this is your username:" + snapshot.val().user);


            // set loggon attribute to 1, indicating user is logged on
            //snapshot.ref.update({loggedIn: 1});

            snapshot.ref.update({lat: this.state.latitude, lng: this.state.longitude});

            // things we need to send to app.js
            //const key = snapshot.key;
            //const group = snapshot.val().groupNum;
            // the function to trigger in
            //this.props.triggerLogInUpdate(key, group);

            // pull name from db
            //this.setState({clientName : snapshot.val().name});

            //this.setState({success : true});
            //this.setState({failed : false});
            //this.setState({isLoggingIn: false});
            //this.props.onLoginPress();
          }
          else { // login fails
            //this.setState({failed : true});
            //this.setState({success : false});
            //this.setState({isLoggingIn: false});
            //this.setState({message: "Wrong Username or Password"});
          }
        });
    }

    componentDidMount() {
        //var TimerMixin = require('react-timer-mixin');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.setState({
              latitude: position.coords.latitude.toFixed(4),
              longitude: position.coords.longitude.toFixed(4),
              error: null,
            });
          },
          (error) => this.setState({ error: error.message }),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

        this.timer = setInterval(()=> this.updateGPS(), 10000);
        //change 1000 to 600000 for every 10 minutes.

      }

      render() {
        return (
          <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Latitude: {this.state.latitude}</Text>
            <Text>Longitude: {this.state.longitude}</Text>
            <Text>Logged in as: {this.props.username}</Text>
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          </View>
        );
      }
}
//export default SendGPS;
