import React from 'react';
import {waitFor} from 'react-native-testing-library';
import renderer, {act, ReactTestRendererJSON} from 'react-test-renderer';
import {RenderField} from '../appFiles/UI/components/RenderField';
import {ComponentWrappers, mockedStore} from '../__mocks__/ComponentWrappers';

test('RenderField renders correctly', async () => {
  await act(async () => {
    let store;
    let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
    await beforeEach(async () => {
      store = mockedStore;

      component = renderer
        .create(
          <ComponentWrappers redux_store={store}>
            <RenderField title={'Field title'} />
          </ComponentWrappers>,
        )
        .toJSON();
      await waitFor(() => expect(component).toMatchSnapshot());
    });
  });
});
