import 'react-native';
import React from 'react';
import SendGPS from '../components/SendGPS';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

global.navigator = {
  userAgent: 'node.js'
};

it('SendGPS renders correctly', () => {
  const tree = renderer.create(
    <SendGPS />
  );
});
