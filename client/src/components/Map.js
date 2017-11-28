import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import Mui from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import fire from './../fire.js'

import './Map.css';


const EmployeeMap = ({ img }) => <div>{img}</div>;
const K_MARGIN_TOP = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;

export class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employee: [],
	  employees: [],
      employeeID: '',
      employeeName: '',
      defaultLat: 28.602734,
      defaultLng: -81.200049,
    }


  }


  handleEmployeeSearch(id, name) {
    const empRef = fire.database().ref('employees');
    var lat;
    var lng;
    var name;

	var employees = [];
	empRef
	  .on('child_added', (snapshot) => {
		if(snapshot.val().groupNum === this.props.num && snapshot.val().loggedIn === 1) {
		  employees.push(snapshot.val());
		}
	});

	this.setState({employees: employees});

    empRef
      .on("child_added", (snapshot) => {
        // console.log(snapshot.val().empID);
        if(snapshot.val().empID === id && snapshot.val().loggedIn === 1 ) {
          lat = snapshot.val().lat;
          lng = snapshot.val().lng;
          name = snapshot.val().name;

	  } else if (snapshot.val().empID === id && snapshot.val().loggedIn !== 1 ) {
		  name = id + ' is not logged in!';
	  } else {
		  //name = 'Does not exist!';
	  }

    });

    // trying to get coordinates to snap to this position
    // when an employee ID is entered.
    this.setState({employeeName: name});
    this.setState({defaultLat: parseFloat(lat)});
    this.setState({defaultLng: parseFloat(lng)});
    console.log(lat);
    console.log(lng);


  }

  componentDidMount(){
	  const employeesRef = fire.database().ref('employees');
	  var employees = [];
      employeesRef
        .on('child_added', (snapshot) => {
          if(snapshot.val().groupNum === this.props.num && snapshot.val().loggedIn === 1) {
            employees.push(snapshot.val());
          }
      });

      this.setState({employees: employees});
  }


  render() {
      /*

        Need array of Employees with props from Firebase - lat, lng, image, name

        --Something similar will go in return below to show all employees on the map from firebase
        --Replaces hardcoded placeholder locations
        --Code is untested
        {this.state.employee.map((employee, index) => (
            <EmployeeImage key={index} lat={employee.lat} lng={employee.lng} img={<img src={employee.image} alt={employee.name} height="42" width="42"></img>}
        ))}

        <EmployeeMap
          lat={28.602734}
          lng={-81.200049}
          img={<img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678130-profile-alt-4-128.png" alt="Jane Doe" height="42" width="42"></img>}
        />

        <EmployeeMap
          lat={28.604734}
          lng={-81.290129}
          img={<img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678130-profile-alt-4-128.png" alt="Jane Doe" height="42" width="42"></img>}
        />

        {this.props.employeesArray
          .map((employeesArray) => {
            return <EmployeeMap
                    lat={employeesArray.latitude}
                    lng={employeesArray.longitude}
                    img={<img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678130-profile-alt-4-128.png" alt="Jane Doe" height="42" width="42"></img>}
              />
          })
        }

      */

      // thise blew up the console
      // this.setState({employee : this.props.employees});

      // getNames(this.props.employes);
      const style = {
        width: "640px",
        height: "480px"
      }

      const buttonStyle = {
        backgroundColor: 'transparent',
        color: 'white'
      };

      const LeftButtons = (
        <div>
          <FlatButton
            label="Track Employee!"
            style={buttonStyle}
            onClick={(event) => this.handleEmployeeSearch(this.state.employeeID)}
            />
            <TextField
               hintText="Employee ID"
               floatingLabelText="Employee ID"
               onChange={(event,newValue) => this.setState({employeeID:newValue})}
               style={{width:100}}
               />
        </div>
      );

      const Markers = this.state.employees
        .map((employee, index) => {
          return ( <EmployeeMap
                  key={employee.empID}
                  lat={employee.lat}
                  lng={employee.lng}
                  img={<img className="icon" src={employee.img} alt="Jane Doe" height="60" width="60 "></img>}
                  />
        )});

      var appInfo = (
        <div>
          Employee Information -
          Name: {this.state.employeeName},
          Latitude: {this.state.defaultLat},
          Longitude: {this.state.defaultLng},
          User ID: {this.state.employeeID}
        </div>
      );

      return (
        <div>
          <Mui>
            <AppBar
              title={appInfo}
              iconElementLeft={LeftButtons}
              />
          </Mui>
          <GoogleMap
            bootstrapURLKeys={{
            key: 'AIzaSyDFNPWio4wskENclNYvxbluPAu_IBpS9sY',
            language: 'en',
            }}
            style ={style}
            defaultCenter={{
              lat: 28.602734,
              lng: -81.200049
            }}
            center={{
              lat: this.state.defaultLat,
              lng: this.state.defaultLng
            }}
            zoom={11}
            size={{width: 640, height: 480}}
            margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
            >
            {Markers}
            </GoogleMap>
        </div>

      );
    }

}

export default Map;
