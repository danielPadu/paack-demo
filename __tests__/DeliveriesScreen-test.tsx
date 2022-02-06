import React from 'react';
import {fireEvent, waitFor} from 'react-native-testing-library';
import renderer, {
  act,
  ReactTestRenderer,
  ReactTestRendererJSON,
} from 'react-test-renderer';
import DeliveriesScreen from '../appFiles/screens/DeliveriesScreen';
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
describe('checking DeliveriesScreen component', () => {
  test('DeliveriesScreen renders correctly', async () => {
    await act(async () => {
      await beforeEach(() => {
        store = mockedStore;
        component = renderer
          .create(
            <ComponentWrappers redux_store={store}>
              <DeliveriesScreen />
            </ComponentWrappers>,
          )
          .toJSON();
        expect(component).toMatchSnapshot();
      });
      await afterEach(() => {
        // cleanup on exiting
        component?.remove?.();
        component = null;
      });
    });
  });
  test('DeliveriesScreen inner functionallity tests', async () => {
    await act(async () => {
      await beforeEach(async () => {
        store = mockedStore;

        component = renderer
          .create(
            <ComponentWrappers redux_store={store}>
              <DeliveriesScreen />
            </ComponentWrappers>,
          )
          .toJSON();
        const {findByProps} = component;
        const text = findByProps('Deliveries List');

        await waitFor(() => expect(text).toBeTruthy());
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
