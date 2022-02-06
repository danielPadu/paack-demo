import Config from 'react-native-config';
import type {Method} from 'axios';
import {log} from '../../UI/utils';

log({'rect-native-config': Config});
export const api = {
  delivery: {
    getDeliveriesList: () => ({
      method: 'get' as Method,
      url: Config.REST_API_BASE_URL + '/deliveries',
      headers: {},
    }),

    getDeliveryDetails: (deliveryId: string) => ({
      method: 'get' as Method,
      url: Config.REST_API_BASE_URL + `/deliveries/${deliveryId}`,
      headers: {},
    }),

    updateDeliveryState: (deliveryId: string) => ({
      method: 'put' as Method,
      url: Config.REST_API_BASE_URL + `/deliveries/${deliveryId}`,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  },
};
