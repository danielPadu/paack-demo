import React from 'react';
import renderer, {act} from 'react-test-renderer';
import DeliveriesScreen from '../appFiles/screens/DeliveriesScreen';
import {navigationRef} from '../appFiles/navigation/RootNavigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../appFiles/navigation/stackNavigator';
import {RouteProp} from '@react-navigation/native';
import {ComponentWrappers} from '../__mocks__/ComponentWrappers';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

test('DeliveriesScreen renders correctly', async () => {
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
            <DeliveriesScreen
              navigation={
                navigationRef.current as unknown as NativeStackNavigationProp<
                  RootStackParamList,
                  'DeliveriesScreen'
                >
              }
              route={
                navigationRef.current as unknown as RouteProp<
                  RootStackParamList,
                  'DeliveriesScreen'
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
// test('renders correctly',   () => {
//   const tree = renderer
//     .create(
//       <DeliveriesScreen
//         navigation={
//           navigationRef.current as unknown as NativeStackNavigationProp<
//             RootStackParamList,
//             'DeliveriesScreen'
//           >
//         }
//         route={
//           navigationRef.current as unknown as RouteProp<
//             RootStackParamList,
//             'DeliveriesScreen'
//           >
//         }
//       />,
//     )
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });
