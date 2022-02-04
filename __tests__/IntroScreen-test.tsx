import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import renderer, {act} from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {navigationRef} from '../appFiles/navigation/RootNavigation';
import {RootStackParamList} from '../appFiles/navigation/stackNavigator';
import IntroScreen from '../appFiles/screens/IntroScreen';
import {ComponentWrappers} from '../__mocks__/ComponentWrappers';

const mockStore = configureStore([]);

test('IntroScreen renders correctly', async () => {
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
            <IntroScreen
              navigation={
                navigationRef.current as unknown as NativeStackNavigationProp<
                  RootStackParamList,
                  'IntroScreen'
                >
              }
              route={
                navigationRef.current as unknown as RouteProp<
                  RootStackParamList,
                  'IntroScreen'
                >
              }
            />
          </ComponentWrappers>,
        )
        .toJSON();
      expect(component).toMatchSnapshot();
    });
  });
});
