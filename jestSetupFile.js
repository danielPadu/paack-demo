import {jest} from '@jest/globals';
import {vp} from './appFiles/UI/utils';
import 'react-native-gesture-handler/jestSetup';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import mockPermissions from 'react-native-permissions/mock';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import {useSelector, useDispatch} from 'react-redux';
import {defaultReducer} from './appFiles/appStore/reducers/default/index';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-permissions', () => {
  return mockPermissions;
});
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.doMock('react-native-device-info', () => mockRNDeviceInfo);
jest.mock('redux-persist/integration/react', () => ({
  PersistGate: props => props.children,
}));
jest.mock('react-redux', () => {
  const store = {
    ...defaultReducer,
  };
  return {
    useSelector: jest.fn().mockImplementation(func => func(store)),
  };
});
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext).default;

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigationState: mockedNavigate,
  };
});

jest.mock('react-native-blob-util', () => {
  return {
    DocumentDir: () => {},
  };
});
jest.mock('redux-persist-filesystem-storage', () => {
  return {
    dirs: () => {},
  };
});
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});
global.vp = vp;
