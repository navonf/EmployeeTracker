import 'react-native';
import React from 'react';
import Home from '../components/Home';
import mockCamera from './__mocks__/Camera';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native-camera', () => mockCamera);

global.navigator = {
  userAgent: 'node.js'
};

it('Home renders correctly', () => {
  const tree = renderer.create(
    <Home />
  );
});
