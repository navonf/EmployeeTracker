import React, { Component } from 'react';
import GoogleMap from 'google-map-react';


const EmployeeImage = ({ img }) => <div>{img}</div>;
const EmployeeText = ({ text }) => <div>{text}</div>;

export class Map extends Component {

  /*
  Add markers needs to accept latitude and longitude
  --possibly passed in a double array from another react component

  ex:
  var employeeLocations = [
    [28.602734, -81.200049],
    [27.500000, 70.000000],
    [50.111111, 67.000888]
  ];

  */

  addEmployeeLocationMarkers() {

    console.log('addEmployeeLocationMarkers was triggered from OnReady')

  }

  mapClicked() {

    console.log('Map was clicked')

  }

  markerClicked() {

    console.log('Marker clicked')

  }

  onMouseover() {

    console.log('Marker was moused over')

  }

  render() {

      const style = {
        width: '100%',
        height: '75%'

      }

      /*
      Still need to grab the employee coords to show on
      map load
      const coords =

      */

      return (

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
          zoom={11}
          size={{width: 640, height: 480}}
          >
          <EmployeeImage
            lat={28.602734}
            lng={-81.200049}
            img={<img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678130-profile-alt-4-128.png" alt="Jane Doe" height="42" width="42"></img>}
          />

          <EmployeeImage
            lat={28.604734}
            lng={-81.290129}
            img={<img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678130-profile-alt-4-128.png" alt="Jane Doe" height="42" width="42"></img>}
          />

          </GoogleMap>


      );
    }

}

export default Map;
