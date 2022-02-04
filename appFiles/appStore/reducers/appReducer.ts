import {
  SET_ALLOW_GEOLOCATION,
  SET_ACTIVE_DELIVERY_ID,
  SET_ACTIVE_SCREEN,
  SET_LAST_LOCATION,
} from '../actions/actionTypes';
import {defaultReducer} from './default';

export default (
  state = defaultReducer.appReducer,
  action: {
    type: string;
    payload: boolean | string | typeof defaultReducer.appReducer.last_location;
  },
) => {
  switch (action.type) {
    case SET_ALLOW_GEOLOCATION: {
      return {...state, app_allow_geolocation: action.payload};
    }
    case SET_ACTIVE_DELIVERY_ID: {
      return {...state, active_delivery_id: action.payload};
    }
    case SET_ACTIVE_SCREEN: {
      return {...state, active_scren: action.payload};
    }
    case SET_LAST_LOCATION: {
      return {...state, last_location: action.payload};
    }
    default:
      return state;
  }
};
