import {
  LOADING_MODAL_OPEN,
  LOADING_MODAL_CLOSE,
  INFO_MODAL_OPEN,
  INFO_MODAL_CLOSE,
} from './actionTypes';
import {AppDispatch} from '../store';
import {PayloadType} from '../reducers/modalReducer';

export const loadingModalOpen = () => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADING_MODAL_OPEN});
  };
};
export const loadingModalClose = () => {
  return (dispatch: AppDispatch) => {
    dispatch({type: LOADING_MODAL_CLOSE});
  };
};

export const infoModalOpen = (data: PayloadType) => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: INFO_MODAL_OPEN,
      payload: data,
    });
  };
};
export const infoModalClose = () => {
  return (dispatch: AppDispatch) => {
    dispatch({type: INFO_MODAL_CLOSE});
  };
};
