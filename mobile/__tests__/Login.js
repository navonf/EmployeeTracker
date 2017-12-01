import 'react-native';
import React from 'react';
import Login from '../components/Login';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

global.navigator = {
  userAgent: 'node.js'
};

jest.mock('react-native-fetch-blob', () => {
  return {
    DocumentDir: () => {},
    polyfill: () => {},
  }
});

it('Login renders correctly', () => {
  const tree = renderer.create(
    <Login />
  );
});
