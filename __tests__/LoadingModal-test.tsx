import React from 'react';
import renderer, {act} from 'react-test-renderer';
import LoadingModal from '../appFiles//UI/components/modals/LoadingModal';
import {ComponentWrappers, mockedStore} from '../__mocks__/ComponentWrappers';
import {navigate} from '../appFiles/navigation/RootNavigation';
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => ({loadingModal: {isOpen: true}}),
  useDispatch: () => jest.fn(),
}));

describe('checking LoadingModal component', () => {
  test('LoadingModal renders correctly', async () => {
    await act(async () => {
      let store;
      let component;
      await beforeEach(() => {
        store = mockedStore;

        component = renderer
          .create(
            <ComponentWrappers redux_store={store}>
              <LoadingModal />
            </ComponentWrappers>,
          )
          .toJSON();
        expect(component).toMatchSnapshot();
        expect(navigate('Deliveries')).toBeFalsy();
      });
    });
  });
  test('LoadingModal inner functionallity tests', async () => {
    await act(async () => {
      await beforeEach(async () => {
        store = mockedStore;

        component = renderer
          .create(
            <ComponentWrappers redux_store={store}>
              <LoadingModal />
            </ComponentWrappers>,
          )
          .toJSON();
        const {findByProps} = component;
        const indicator = findByProps('size');

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
