import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper, withGoogleMap} from 'google-maps-react';

export class MapContainer extends Component {

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

    console.log('I was triggered from OnReady')

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

      return (

        <Map
          google={this.props.google}
          style ={style}
          initialCenter={{
            lat: 28.602734,
            lng: -81.200049
          }}
          zoom={11}
          onReady={this.addEmployeeLocationMarkers}
          onClick={this.mapClicked}
          >
            <Marker
            onClick={this.onMarkerClick}
            onMouseover={this.onMouseover}
            name={'Current location'} /><Marker/>

          <InfoWindow onClose={this.onInfoWindowClose}>
          </InfoWindow>

        </Map>
      );
    }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDFNPWio4wskENclNYvxbluPAu_IBpS9sY'
})(MapContainer)
