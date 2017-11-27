import React, { Component } from 'react';
import GoogleMap from 'google-map-react';


const EmployeeMap = ({ img }) => <div>{img}</div>;

export class Map extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employee: []
    }
  }

  render() {



      const style = {
        width: '100%',
        height: '75%'

      }

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

      console.log(this.props.employees);
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

          {this.props.employees
            .map((employee, index) => {
              return ( <EmployeeMap key={index}
                      lat={employee.lat}
                      lng={employee.lng}
                      img={<img className="icon" src={employee.img} alt="Jane Doe" height="42" width="42"></img>}
                      />
            )})
          }


          </GoogleMap>


      );
    }

}

export default Map;
