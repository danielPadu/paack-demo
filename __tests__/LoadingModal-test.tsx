import React from 'react';
import renderer, {act} from 'react-test-renderer';
import LoadingModal from '../appFiles//UI/components/modals/LoadingModal';
import {ComponentWrappers, mockedStore} from '../__mocks__/ComponentWrappers';

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
    });
  });
});
