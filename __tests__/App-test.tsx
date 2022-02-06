/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';
import {waitFor} from 'react-native-testing-library';
it('App renders correctly', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('App renders ', async () => {
  await act(async () => {
    await waitFor(() => renderer.create(<App />));
  });
});
