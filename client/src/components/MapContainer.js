import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {

  render() {

      return (
        <Map google={this.props.google} zoom={14}>

          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />

          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
              <h1>View Employees</h1>
              <br></br>
              </div>
          </InfoWindow>
        </Map>
      );
    }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDFNPWio4wskENclNYvxbluPAu_IBpS9sY'
})(MapContainer)
