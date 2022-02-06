import {NavigationContext} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux/src';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from '../appFiles/appStore/store';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {defaultReducer} from '../appFiles/appStore/reducers/default';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
export const mockedStore = mockStore(defaultReducer);

export const navContext = {
  isFocused: () => true,
  // addListener returns an unscubscribe function.
  addListener: jest.fn(() => jest.fn()),
  navigate: Function.prototype,
  setParams: Function.prototype,
  dispatch: Function.prototype,
  getParam: (param: {deliveryId?: string} & any, defaultValue: any) => {
    return defaultValue;
  },
};

export const ComponentWrappers = (props: {
  children: React.ReactNode;
  redux_store: any;
}) => {
  const {children, redux_store} = props;

  return (
    <>
      <Provider store={redux_store ?? mockedStore}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContext.Provider value={navContext as any}>
            {children}
          </NavigationContext.Provider>
        </PersistGate>
      </Provider>
    </>
  );
};
