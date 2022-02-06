import React from 'react';
import {Text} from 'react-native';
import {fireEvent, render, mount, waitFor} from 'react-native-testing-library';
import renderer, {act} from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {LocationCard} from '../appFiles/UI/components/LocationCard';
import {ComponentWrappers, mockedStore} from '../__mocks__/ComponentWrappers';

const ms = mockedStore;
// test('renders correctly', async () => {
//   await act(async () => {
//     let store;
//     beforeEach(() => {
//       store = ms;
//       expect(
//         renderer
//           .create(
//             <ComponentWrappers redux_store={store}>
//               <LocationCard />
//             </ComponentWrappers>,
//           )
//           .toJSON(),
//       ).toMatchSnapshot();
//     });
//   });
// });

// it('renders correctly when there are no items', () => {
//   const tree = renderer
//     .create(
//       <ComponentWrappers redux_store={ms}>
//         <LocationCard />
//       </ComponentWrappers>,
//     )
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });
// test('checking props correctly', async () => {
//   await act(async () => {
//     let store;
//     let component;
//     beforeEach(() => {
//       store = mockStore([
//         {
//           appReducer: {
//             app_allow_geolocation: false,
//             active_delivery_id: '',
//             active_scren: '',
//             last_location: {
//               accuracy: 0,
//               altitude: 0,
//               altitudeAccuracy: 0,
//               heading: 0,
//               latitude: 0,
//               longitude: 0,
//               speed: 0,
//             },
//           },
//         },
//       ]);
//       component = render(
//         <ComponentWrappers redux_store={store}>
//           <LocationCard />
//         </ComponentWrappers>,
//       );
//       //expect(component).toMatchSnapshot();
//       expect(component).toHaveProperty('app_allow_geolocation');
//     });
//   });
// });

test('LocationCard button press actions', async () => {
  await act(async () => {
    let store;
    let component;
    await beforeEach(async () => {
      store = mockedStore;
      component = render(
        <ComponentWrappers redux_store={store}>
          <LocationCard />
        </ComponentWrappers>,
      );

      const {getByLabelText, getByTestId, queryByTestId, toJSON} = component;
      const mockedHandler = jest.fn();
      const button = getByLabelText('Refresh location');
      button.props.onPress = mockedHandler;
      fireEvent.press(button);
      // test('button pressed', () => {
      expect(mockedHandler).toHaveBeenCalled();
      // });

      // test('activity indicator appeared ', async () => {
      await waitFor(() =>
        expect(getByTestId('activity-indicator')).toBeTruthy(),
      );
      // });

      // test('latitude value updated ', async () => {
      await waitFor(() =>
        expect(queryByTestId('longitude-value')).toBeTruthy(),
      );
      // });

      // test('longitude value updated  ', async () => {
      await waitFor(() =>
        expect(queryByTestId('longitude-value')).toBeTruthy(),
      );
      // });
      //  test('matches snapshot  ', async () => {
      expect(toJSON()).toMatchSnapshot();
      //  });
    });
  });
});
