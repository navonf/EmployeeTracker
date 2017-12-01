import React from 'react';
import shallow from 'enzyme';
import App from '../components/App';


test ('loggedIn changes to 1 when submit button is hit', () => {
	const wrapper = shallow(<App />);
	wrapper.setState({
		loggedIn: 0;
	})
	wrapper.toggleLogin();
	expect(wrapper.state.loggedIn).toEqual(1);
});