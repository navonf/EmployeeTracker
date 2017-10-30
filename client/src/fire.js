import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyDUtpsqgdhq4VDcgtiOxfMDDKcoNuoUos8",
  authDomain: "employee-tracker-team-6.firebaseapp.com",
  databaseURL: "https://employee-tracker-team-6.firebaseio.com",
  storageBucket: "employee-tracker-team-6.appspot.com",
  messagingSenderId: "324639943434"
};
var fire = firebase.initializeApp(config);
export default fire;
