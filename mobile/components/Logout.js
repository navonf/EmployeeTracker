import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button
} from 'react-native';
import fire from './../fire';
import SendGPS from './SendGPS'

export default class Secured extends Component {
    constructor(props) {
    super(props);
}

    onLogout = () => {

        const usersRef = fire.database().ref('employees');
        usersRef.on('child_added', (snapshot) => {
            snapshot.ref.update({loggedIn: 0});
        });
        this.props.onLogoutPress();
        this.setState({loggedIn : 0});
    }

    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <SendGPS username={this.props.username}/>
                <View style={{margin:20}} />
                    <Button onPress={this.onLogout} title="Log Out" />
            </ScrollView>
                )
    }
}
