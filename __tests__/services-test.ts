import {Method} from 'axios';
import Config from 'react-native-config';
import {api} from '../appFiles/services/rest/api';
import {log} from '../appFiles/UI/utils';

describe('checking api defnition', () => {
  const deliveryService = {
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
  };
  const baseURL = 'https://60e84194673e350017c21844.mockapi.io/api';
  test('expecting end-points definition to match implementation', () => {
    expect(JSON.stringify(api.delivery)).toEqual(
      JSON.stringify(deliveryService),
    );
  });
  test('expecting to be 3 endpoints', () => {
    expect(Object.keys(api.delivery)?.length).toEqual(3);
  });
  test('expecting to be a get method', () => {
    expect(api.delivery.getDeliveriesList().method).toEqual('get' as Method);
  });
  test(`expecting base url to be ${baseURL}`, () => {
    expect(api.delivery.getDeliveryDetails('5').url.includes(baseURL)).toEqual(
      true,
    );
  });
  test('expecting to be a put method', () => {
    expect(api.delivery.updateDeliveryState('3').method).toEqual(
      'put' as Method,
    );
  });
});
