import React from 'react';
import {fireEvent, waitFor} from 'react-native-testing-library';
import renderer, {
  act,
  ReactTestRenderer,
  ReactTestRendererJSON,
} from 'react-test-renderer';
import DeliveryDetailsScreen from '../appFiles/screens/DeliveriesScreen';
import {ComponentWrappers, mockedStore} from '../__mocks__/ComponentWrappers';
let store;
let component:
  | ReactTestRenderer
  | ReactTestRenderer[]
  | ReactTestRendererJSON
  | ReactTestRendererJSON[]
  | null;
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => ({app_allow_geolocation: true, last_location: {}}),
  useDispatch: () => jest.fn(),
}));
describe('checking DeliveryDetailsScreen component', () => {
  test('DeliveryDetailsScreen renders correctly', async () => {
    await act(async () => {
      await beforeEach(() => {
        store = mockedStore;

        component = renderer
          .create(
            <ComponentWrappers redux_store={store}>
              <DeliveryDetailsScreen />
            </ComponentWrappers>,
          )
          .toJSON();
        expect(component).toMatchSnapshot();
      });
    });
  });

  test('DeliveryDetailsScreen inner functionallity tests', async () => {
    await act(async () => {
      await beforeEach(async () => {
        store = mockedStore;

        component = renderer.create(
          <ComponentWrappers redux_store={store}>
            <DeliveryDetailsScreen />
          </ComponentWrappers>,
        );
        const {getByTestId} = component;
        const mockedHandler = jest.fn();
        const button = getByTestId('showLocationButton');
        button.props.onPress = mockedHandler;
        fireEvent.press(button);
        await waitFor(() => expect(mockedHandler).toHaveBeenCalled());
        await waitFor(() => expect(component).toHaveProperty('wrapperStyle'));
      });
      await afterEach(() => {
        // cleanup on exiting
        component?.remove?.();
        component = null;
      });
    });
  });
});
// test('renders correctly', () => {
//   const tree = renderer
//     .create(
//       <DeliveryDetailsScreen
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
