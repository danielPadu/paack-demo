// RootNavigation.js
import * as React from 'react';
import {createNavigationContainerRef} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
 
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
export type RootStackParamList = {
  IntroScreen: {itemId?: string};
  DeliveriesScreen: {itemId?: string};
  DeliveryDetailsScreen: {deliveryId?: string; itemId?: string};
};
export type DeliveryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DeliveriesScreen'
>;
export type DeliveryDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DeliveryDetailsScreen'
>;
export type IntroScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'IntroScreen'
>;



export const navigate = (name: keyof RootStackParamList, params?: unknown) => {
  if (navigationRef.isReady()) {
    // Perform navigation if the app has mounted
    console.log('navigationRef navigating to : ', name, );
    navigationRef.navigate(name as never, params as never);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
    console.log('CAN NOT NAVIGATE ');
  }
};
 