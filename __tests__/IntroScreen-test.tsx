import React from 'react';
import {fireEvent, waitFor} from 'react-native-testing-library';
import renderer, {
  act,
  ReactTestRenderer,
  ReactTestRendererJSON,
} from 'react-test-renderer';
import IntroScreen from '../appFiles/screens/IntroScreen';
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

describe('checking IntroScreen component', () => {
  it('IntroScreen renders ', async () => {
    await act(async () => {
      await beforeEach(() => {
        store = mockedStore;

        component = renderer.create(
          <ComponentWrappers redux_store={store}>
            <IntroScreen />
          </ComponentWrappers>,
        );
      });
      await afterEach(() => {
        // cleanup on exiting
        component?.remove?.();
        component = null;
      });
      expect(component).toMatchSnapshot();
    });
  });

  test('IntroScreen inner functionallity tests', async () => {
    await act(async () => {
      await beforeEach(async () => {
        store = mockedStore;

        component = renderer.create(
          <ComponentWrappers redux_store={store}>
            <IntroScreen />
          </ComponentWrappers>,
        );
        const {getByTestId} = component;
        const mockedHandler = jest.fn();
        const button = getByTestId('checkPermissionsButton');
        button.props.onPress = mockedHandler;
        fireEvent.press(button);
        await waitFor(() => expect(mockedHandler).toHaveBeenCalled());
        await waitFor(() => expect(component).toHaveProperty('netinfo'));
        await waitFor(() => expect(component.netinfo.exists()).toBe(true));
      });
      await afterEach(() => {
        // cleanup on exiting
        component?.remove?.();
        component = null;
      });
    });
  });
});
