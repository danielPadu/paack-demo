import React from 'react';
import {waitFor} from 'react-native-testing-library';
import renderer, {act, ReactTestRendererJSON} from 'react-test-renderer';
import IntroScreen from '../appFiles/screens/IntroScreen';
import {ComponentWrappers, mockedStore} from '../__mocks__/ComponentWrappers';

test('IntroScreen renders correctly', async () => {
  await act(async () => {
    let store;
    let component: ReactTestRendererJSON | ReactTestRendererJSON[] | null;
    await beforeEach(async () => {
      store = mockedStore;

      component = renderer
        .create(
          <ComponentWrappers redux_store={store}>
            <IntroScreen />
          </ComponentWrappers>,
        )
        .toJSON();
      await waitFor(() => expect(component).toMatchSnapshot());
      // expect(component).toMatchSnapshot();
    });
  });
});
