import {
  LOADING_MODAL_OPEN,
  LOADING_MODAL_CLOSE,
  INFO_MODAL_OPEN,
  INFO_MODAL_CLOSE,
} from '../actions/actionTypes';
import {defaultReducer} from './default';
export type PayloadType = {title: string; description: string};
export default (
  state = defaultReducer.modalReducer,
  action: {
    type: string;
    payload?: PayloadType;
  },
) => {
  switch (action.type) {
    case LOADING_MODAL_OPEN:
      return {
        ...state,
        loadingModal: {isOpen: true},
      };

    case LOADING_MODAL_CLOSE:
      return {
        ...state,
        loadingModal: {isOpen: false},
      };
    case INFO_MODAL_OPEN:
      return {
        ...state,
        infoModal: {
          isOpen: true,
          options: action?.payload,
        },
      };

    case INFO_MODAL_CLOSE:
      return {
        ...state,
        infoModal: {isOpen: false, options: {}},
      };

    default:
      return state;
  }
};
