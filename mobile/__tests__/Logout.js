import 'react-native';
import React from 'react';
import Logout from '../components/Logout';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

global.navigator = {
  userAgent: 'node.js'
};

it('Logout renders correctly', () => {
  const tree = renderer.create(
    <Logout />
  );
});
