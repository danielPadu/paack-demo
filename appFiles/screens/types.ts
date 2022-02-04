import type {RootStackParamList} from '../navigation/stackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
export type ListItem = {
  id: string;
  client: string;
  customer?: {
    name: string;
    address: string;
    city: string;
    zipCode: string;
    latitude: string;
    longitude: string;
  };
  delivery?: {
    status: 'idle' | 'delivered' | 'undelivered';
    latitude: number;
    longitude: number;
  };
};
