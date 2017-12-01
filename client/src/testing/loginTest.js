mport React from 'react';
import shallow from 'enzyme';
import App from './App';


test ('loggedIn changes to 1 when submit button is hit', () => {
	const wrapper = shallow(<App />);
	wrapper.setState({
		loggedIn: 0;
	})
	wrapper.toggleLogin();
	expect(wrapper.state.loggedIn).toEqual(1);
});

test ('user is registered', () => {
	const wrapper = shallow(<App />);
	wrapper.setState({
		isRegistered: 0;
	})
	wrapper.toggleIsRegistered();
	expect(wrapper.state.isRegistered).toEqual(1);
});

test ('users location is updated', () => {
	const wrapper = shallow(<App />);
	wrapper.setState({
		updateLocation: 0;
	})
	wrapper.toggleUpdateLocation();
	expect(wrapper.state.updateLocation).toEqual(1);
});

// running our tests for any button in app
test ('buttons pressed', () => {
	const wrapper = shallow(<App />);
	wrapper.setState({
		buttonPress: 0;
	})
	wrapper.toggleButtonPress();
	expect(wrapper.state.buttonPress).toEqual(1);
});
