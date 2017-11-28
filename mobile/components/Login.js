import React, { Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import fire from './../fire';
import Camera from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob'

import {
  AppRegistry,
  ToolbarAndroid,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Platform


} from 'react-native';

const { width, height } = Dimensions.get("window");
const lockIcon = require("./login1_lock.png");
const personIcon = require("./login1_person.png");

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class Login extends Component {
    constructor(props) {
    super(props);

    this.state = {
      isLoggingIn: false,
      message: '',
      cameraPath:null,
      userKey: '',
      imageUrl:null,
      username: 0,
	  isError: false,
    }

    this.handleLogin = this.handleLogin.bind(this)
	this.takePicture = this.takePicture.bind(this)
  }

  updateParentState(data){
      this.props.updateParentState(data);
  }


  // This function handles login
  handleLogin = (e) => {
    this.setState({isLoggingIn: true});
    e.preventDefault();
    const user = this.state.username;
    const pass = this.state.password;
    this.updateParentState({username: user});
    const usersRef = fire.database().ref('employees');

    usersRef
      .on('child_added', (snapshot) => {
      if(snapshot.val().empID === user && snapshot.val().password === pass) {
        this.setState({userKey : snapshot.key});
        this.updateParentState({userKey : snapshot.key});
        console.log("this is your password:" + snapshot.val().password);
        console.log("this is your username:" + snapshot.val().empID);


        // set loggon attribute to 1, indicating user is logged on
        snapshot.ref.update({loggedIn: 1});

        // things we need to send to app.js
        const key = snapshot.key;
        const group = snapshot.val().groupNum;
        // the function to trigger in
        //this.props.triggerLogInUpdate(key, group);

        // pull name from db
        this.setState({clientName : snapshot.val().name});

        this.setState({success : true});
        this.setState({failed : false});

		if (this.state.cameraPath) {
			this.uploadImage(this.state.cameraPath, this.state.userKey);
		} else {
			snapshot.ref.update({message: 'Camera Error!'});
		}


		var storage = fire.storage();
        var imageRef = storage.ref('images');
		imageRef.child(this.state.userKey).getDownloadURL().then((url) => snapshot.ref.update({img: url}));


        this.props.onLoginPress();
        this.setState({isLoggingIn: false});

      }
      else { // login fails
        this.setState({failed : true});
        this.setState({success : false});
        this.setState({isLoggingIn: false});
        this.setState({message: "Wrong Username or Password"});
      }
    });


  }


  uploadImage(uri, imageName, mime = 'application/octet-stream') {
      return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
        var tmpimg

        const imageRef = fire.storage().ref('images').child(imageName)

        fs.readFile(uploadUri, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
          })
          .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL();
          })
          .then(() => {

          })
          .catch((error) => {
            reject(error)
        })
      })
  }



  takePicture() {
    const options = {};
    this.camera.capture({metadata: options})
      .then((data) => this.setState({cameraPath: data.path}))
	  .then(this.setState({isError: true}))

      .catch(err => console.error(err));
  }


  render() {
    return (
      <ScrollView style={{padding: 20}}>
                <Text style={{fontSize: 27, justifyContent:'center'}}>
                    Employee Tracker: Login
                </Text>
              <TextInput
                  keyboardType = 'phone-pad'
                placeholder="Employee ID"
                onChangeText = {(username) => this.setState({username})}
                //value={this.state.username}
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText = {(text) => this.setState({password:text})}
              />
              {!!this.state.message && (
                    <Text style={{fontSize: 14, color: 'red', padding: 5}}>
                        {this.state.imageUrl}
                    </Text>
                )}
                        <View style={styles.container}>
                  <Camera ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    type = {Camera.constants.Type.front}>

                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[TAKE PICTURE]</Text>
                </Camera>
              </View>


              {this.state.isLoggingIn && <ActivityIndicator />}
              <Text style={{padding: 4, fontSize: 25,alignItems: 'center', color: 'green'}}>
				  {this.state.cameraPath ? 'Got the photo!' : null}
			  </Text>
			  <Button style={{padding:100,position:'absolute',bottom:0}} onPress= {this.handleLogin} title= "Sign In" disabled= {!this.state.cameraPath ||this.state.isLoggingIn || !this.state.username || !this.state.password}/>


      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 300,
    marginTop: 60
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

//export default Login;
