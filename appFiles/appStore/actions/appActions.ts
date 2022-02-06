import {
  SET_ALLOW_GEOLOCATION,
  SET_ACTIVE_DELIVERY_ID,
  SET_ACTIVE_SCREEN,
  SET_LAST_LOCATION,
} from './actionTypes';
import {AppDispatch} from '../store';
import {defaultReducer} from '../reducers/default';
export const setAllowGeolocation = (isAllowedGeolocation: boolean) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_ALLOW_GEOLOCATION, payload: isAllowedGeolocation});
  };
};

export const setAppActiveDeliveryID = (activeId: string) => {
  return (dispatch: AppDispatch) => {
    dispatch({type: SET_ACTIVE_DELIVERY_ID, payload: activeId});
  };
};

export const setAppActiveScreen =
  (activeScreen: string) => (dispatch: AppDispatch) =>
    dispatch({type: SET_ACTIVE_SCREEN, payload: activeScreen});

export type LocationPayloadType =
  typeof defaultReducer.appReducer.last_location;

export const setLastLocation =
  (lastLocation: LocationPayloadType) => (dispatch: AppDispatch) =>
    dispatch({type: SET_LAST_LOCATION, payload: lastLocation});
