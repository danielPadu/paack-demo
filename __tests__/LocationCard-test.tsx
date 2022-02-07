import React from 'react';
import {fireEvent, render, waitFor} from 'react-native-testing-library';
import {useSelector} from 'react-redux';
import renderer, {
  act,
  ReactTestRenderer,
  ReactTestRendererJSON,
} from 'react-test-renderer';
import {LocationCard} from '../appFiles/UI/components/LocationCard';
import {ComponentWrappers, mockedStore} from '../__mocks__/ComponentWrappers';
import {defaultReducer} from '../appFiles/appStore/reducers/default';
let store;
let component:
  | ReactTestRenderer
  | ReactTestRenderer[]
  | ReactTestRendererJSON
  | ReactTestRendererJSON[]
  | null;
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
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => ({app_allow_geolocation: true, last_location: {}}),
  useDispatch: () => mockDispatch,
}));
describe('checking LocationCard component', () => {
  test('LocationCard internal functionallities', async () => {
    await act(async () => {
      await beforeEach(async () => {
        store = mockedStore;
        component = render(
          <ComponentWrappers redux_store={store}>
            <LocationCard />
          </ComponentWrappers>,
        );

        const {getByTestId, queryByTestId, toJSON} = component;
        const mockedHandler = jest.fn();

        const button = getByTestId('refreshLocationButton');
        button.props.onPress = mockedHandler;
        fireEvent.press(button);
        expect(button).toBeTruthy();
        // test('button pressed', () => {
        // await waitFor(() => expect(mockedHandler).toHaveBeenCalled());
        // });

        await waitFor(() =>
          expect(getByTestId('activity-indicator')).toBeTruthy(),
        );

        await waitFor(() =>
          expect(queryByTestId('longitude-value')).toBeTruthy(),
        );

        await waitFor(() =>
          expect(queryByTestId('longitude-value')).toBeTruthy(),
        );
        expect(toJSON()).toMatchSnapshot();
      });
      await afterEach(() => {
        // cleanup on exiting
        component?.remove?.();
        component = null;
      });
    });
  });
  test('LocationCard inner functionallity tests', async () => {
    await act(async () => {
      await beforeEach(async () => {
        store = mockedStore;
        component = renderer
          .create(
            <ComponentWrappers redux_store={store}>
              <LocationCard />
            </ComponentWrappers>,
          )
          .toJSON();
        const {findByProps} = component;
        const text = findByProps('Last location details registered ');

        await waitFor(() => expect(text).toBeTruthy());
        await waitFor(() => expect(component).toHaveProperty('cardContainer'));
      });
      await afterEach(() => {
        // cleanup on exiting
        useSelector?.mockClear?.();
        component?.remove?.();
        component = null;
      });
    });
  });
});
