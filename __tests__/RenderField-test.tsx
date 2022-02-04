import React from 'react';
import renderer, {act} from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {RenderField} from '../appFiles/UI/components/RenderField';
import {ComponentWrappers} from '../__mocks__/ComponentWrappers';

const mockStore = configureStore([]);

test('RenderField renders correctly', async () => {
  await act(async () => {
    let store;
    let component;
    beforeEach(() => {
      store = mockStore({
        appReducer: {
          app_allow_geolocation: false,
          active_delivery_id: '',
          active_scren: '',
          last_location: {
            accuracy: 0,
            altitude: 0,
            altitudeAccuracy: 0,
            heading: 0,
            latitude: 0,
            longitude: 0,
            speed: 0,
          },
        },
      });

      component = renderer
        .create(
          <ComponentWrappers redux_store={store}>
            <RenderField />
          </ComponentWrappers>,
        )
        .toJSON();
      expect(component).toMatchSnapshot();
    });
  });
});
