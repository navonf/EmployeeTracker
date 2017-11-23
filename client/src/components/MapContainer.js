import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {

  render() {

      const style = {
        width: '100%',
        height: '50%'

      }

      return (

        <Map

          google={this.props.google}
          style ={style}
          initialCenter={{
            lat: 28.602734,
            lng: -81.200049
          }}
          zoom={12}
          
          >

          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />

          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
              </div>
          </InfoWindow>
        </Map>
      );
    }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDFNPWio4wskENclNYvxbluPAu_IBpS9sY'
})(MapContainer)
