import {Observable} from 'rxjs';
import {axiosInstance} from './axiosInstance';
import {api} from './api';

export const getDeliveriesList = () => {
  const config = {
    ...api.delivery.getDeliveriesList(),
    handlerEnabled: true,
  };
console.log('request to: ',config.url)
  return new Observable(subscriber => {
    axiosInstance(config)
      .then(response => {
        if (response?.status === 200 && response?.data) {
          subscriber.next(response?.data);
          subscriber.complete();
        }
      })
      .catch(error => subscriber.error(error));
  });
};

export const getDeliveryDetails = (deliveryId: string) => {
  const config = {
    ...api.delivery.getDeliveryDetails(deliveryId),
    handlerEnabled: true,
  };

  return new Observable(subscriber => {
    axiosInstance(config)
      .then(response => {
        if (response?.status === 200 && response?.data) {
          subscriber.next(response?.data);
          subscriber.complete();
        }
      })
      .catch(error => subscriber.error(error));
  });
};

export const updateDeliveryState = (
  deliveryId: string,
  payload: {
    delivery: {
      status: 'delivered' | 'undelivered';
      latitude: number;
      longitude: number;
    };
  },
) => {
  var data = JSON.stringify(payload);
  const config = {
    ...api.delivery.updateDeliveryState(deliveryId),
    handlerEnabled: true,
    data: data,
  };

  return new Observable(subscriber => {
    axiosInstance(config)
      .then(response => {
        if (response?.status === 200 && response?.data) {
          subscriber.next(response?.data);
          subscriber.complete();
        }
      })
      .catch(error => subscriber.error(error));
  });
};
