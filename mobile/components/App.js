import React, { Component } from 'react';
import { Text, StyleSheet, View, Navigator, NativeModules} from 'react-native';

var ToolbarAndroid = require('ToolbarAndroid');
export default class App extends Component {
  render() {
    return (
        <ToolbarAndroid title="Hello"
     style = {styles.toolbar}
     titleColor={'red'}
     />
    );

  }
}

const styles = StyleSheet.create({
  toolbar: {
    width: 600,
    height:50,
    color: 'red',
    backgroundColor: 'green'
    //position: 'center',
  },
  red: {
    color: 'red',
  },
});
