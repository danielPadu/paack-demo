import React from 'react';
import renderer, {act} from 'react-test-renderer';
import DeliveryDetailsScreen from '../appFiles/screens/DeliveriesScreen';
import {ComponentWrappers, mockedStore} from '../__mocks__/ComponentWrappers';

test('DeliveryDetailsScreen renders correctly', async () => {
  await act(async () => {
    let store;
    let component;
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
