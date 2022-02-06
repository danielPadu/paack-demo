import {Method} from 'axios';
import Config from 'react-native-config';
import {api} from '../appFiles/services/rest/api';
import {
  axiosInstance,
  requestHandler,
} from '../appFiles/services/rest/axiosInstance';
import {
  getDeliveriesList,
  getDeliveryDetails,
  updateDeliveryState,
} from '../appFiles/services/rest/deliveryService';
describe('checking api definition', () => {
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
describe('checking axiosInstance declaration', () => {
  test('axiosInstance has request and response interceptors', () => {
    expect(axiosInstance.interceptors.request).toHaveProperty('handlers');
    expect(axiosInstance.interceptors.response).toHaveProperty('handlers');
  });
  test('axiosInstance has request interceptor handler fullfiled', () => {
    expect(
      axiosInstance.interceptors.request?.handlers[0].fulfilled,
    ).not.toBeUndefined();
  });
  test('axiosInstance has request interceptor handler rejected undefined', () => {
    expect(
      axiosInstance.interceptors.request?.handlers[0].rejected,
    ).toBeUndefined();
  });

  test('axiosInstance has response succes interceptor handler', () => {
    expect(
      axiosInstance.interceptors.response?.handlers[0].fulfilled,
    ).not.toBeUndefined();
  });
  test('axiosInstance has response error interceptor handler', () => {
    expect(
      axiosInstance.interceptors.response?.handlers[0].rejected,
    ).not.toBeUndefined();
  });

  test('axiosInstance returns error', done => {
    getDeliveryDetails('0').subscribe({
      error: error => {
        expect(requestHandler(error.config)).toEqual(error.config);
        done();
      },
    });
  });
});

describe('checking delivery Service integration', () => {
  test('getDeliveriesList returns array', done => {
    getDeliveriesList().subscribe({
      next: data => {
        expect(data.length).toBeDefined();
        done();
      },
      error: error => {
        expect(error).toBeDefined();
        done();
      },
    });
  });
  test('getDeliveryDetails(1) returns object with id=1', done => {
    getDeliveryDetails('1').subscribe({
      next: data => {
        expect(data.id).toEqual('1');
        done();
      },
      error: error => {
        expect(error).toBeDefined();
        done();
      },
    });
  });
  test('getDeliveryDetails(0) returns error.response.data = Not found', done => {
    getDeliveryDetails('0').subscribe({
      next: data => {
        expect(data.id).toEqual('1');
        done();
      },
      error: error => {
        expect(error.response.data).toEqual('Not found');
        done();
      },
    });
  });
  test('updateDeliveryState(1, payload) sets status idle for id 1', done => {
    const payload = {
      delivery: {
        status: 'idle',
        latitude: null,
        longitude: null,
      },
    };
    updateDeliveryState('1', payload).subscribe({
      next: data => {
        expect(data.delivery.status).toEqual('idle');
        done();
      },
      error: error => {
        expect(error).toBeDefined();
        done();
      },
    });
  });
  test('updateDeliveryState(0,{ }) returns error', done => {
    updateDeliveryState('0', {}).subscribe({
      error: error => {
        expect(requestHandler(error.config)).toEqual(error.config);
        expect(error).toBeDefined();
        done();
      },
    });
  });
});
