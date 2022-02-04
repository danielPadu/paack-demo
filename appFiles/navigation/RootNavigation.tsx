// RootNavigation.js
import * as React from 'react';
import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from './stackNavigator';
export const isReadyRef = React.createRef<React.MutableRefObject<boolean>>();

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const navigate = (name: unknown, params?: unknown) => {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    console.log('navigating to : ', name);
    navigationRef.current.navigate(name as never, params as never);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
    console.log('CAN NOT NAVIGATE ');
  }
};
