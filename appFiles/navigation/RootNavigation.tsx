// RootNavigation.js
import {NavigationContainerRef} from '@react-navigation/native';
import * as React from 'react';

export const isReadyRef = React.createRef<React.MutableRefObject<boolean>>();

export const navigationRef = React.createRef<
  NavigationContainerRef<ReactNavigation.RootParamList> | undefined
>();

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
