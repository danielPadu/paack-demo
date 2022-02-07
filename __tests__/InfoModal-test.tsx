import React from 'react';
import renderer, {
  act,
  ReactTestRenderer,
  ReactTestRendererJSON,
} from 'react-test-renderer';
import InfoModal from '../appFiles//UI/components/modals/InfoModal';
import {ComponentWrappers, mockedStore} from '../__mocks__/ComponentWrappers';
import {navigate} from '../appFiles/navigation/RootNavigation';
import {waitFor} from 'react-native-testing-library';
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest
    .fn()
    .mockReturnValueOnce({
      infoModal: {
        isOpen: true,
        options: {title: 'Title', description: 'description'},
      },
    })
    .mockReturnValueOnce({
      infoModal: {
        isOpen: false,
        options: {title: 'Title', description: 'description'},
      },
    }),
  useDispatch: () => jest.fn(),
}));
let store;
let component:
  | ReactTestRenderer
  | ReactTestRenderer[]
  | ReactTestRendererJSON
  | ReactTestRendererJSON[]
  | null;
describe('checking LoadingModal component', () => {
  test('InfoModal renders correctly', async () => {
    await act(async () => {
      await beforeEach(() => {
        store = mockedStore;

        component = renderer
          .create(
            <ComponentWrappers redux_store={store}>
              <InfoModal />
            </ComponentWrappers>,
          )
          .toJSON();
        expect(component).toMatchSnapshot();
        expect(navigate('Deliveries')).toBeFalsy();
      });
    });
  });
  test('InfoModal inner functionallity tests', async () => {
    await act(async () => {
      await beforeEach(async () => {
        store = mockedStore;

        component = renderer
          .create(
            <ComponentWrappers redux_store={store}>
              <InfoModal />
            </ComponentWrappers>,
          )
          .toJSON();
        const {findByProps} = component;
        const indicator = findByProps('size');
        expect(component.props.isOpen).toEqual(true);
        expect(component.props.modalClosing()).toEqual(true);
        await waitFor(() => expect(indicator).toBeTruthy());
        await waitFor(() => expect(component).toHaveProperty('containerStyle'));
      });
      await afterEach(() => {
        // cleanup on exiting
        component?.remove?.();
        component = null;
      });
    });
  });
});
